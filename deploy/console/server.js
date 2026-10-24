/**
 * 远山频道访客控制台。
 * 和 deploy/admin-oauth 分开：那个进程只管 Decap 的 GitHub 登录和企业微信转发，
 * 缺了 OAuth 密钥会直接退出。控制台要能在没有 GitHub 密钥时单独跑注册、会话和 Umami 代理。
 *
 * 公网路径默认 /console/ ，反代到 127.0.0.1:4182。Decap 仍在 /admin/。
 */
import { randomBytes, timingSafeEqual } from "node:crypto";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import { DEFAULT_LIMITS, assertRuntimeConfig, joinBase, loadEnvFile, readConfig } from "./config.js";
import { openDatabase } from "./db.js";
import { renderAccount, renderDashboard, renderLogin, renderMessage, renderRegister } from "./html.js";
import { requestJson } from "./http-json.js";
import {
  clientIp,
  isApi,
  originAllowed,
  readCookies,
  requestIsHttps,
  writeCookie,
} from "./http-util.js";
import { createRateLimiter } from "./rate-limit.js";
import { SESSION_TTL_MS, createStore } from "./store.js";
import { createUmamiClient } from "./umami.js";

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");

function asyncRoute(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function tokensEqual(leftValue, rightValue) {
  const left = Buffer.from(String(leftValue || ""));
  const right = Buffer.from(String(rightValue || ""));
  if (left.length === 0 || left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function randomToken() {
  return randomBytes(32).toString("hex");
}

export async function createApp(config) {
  const now = config.now || (() => Date.now());
  const database = await openDatabase(config.dataFile);
  const store = await createStore(database, {
    scryptN: config.scryptN || 16384,
    now,
    sessionSecret: config.sessionSecret,
  });
  let seedResult;
  try {
    seedResult = await store.seedAdmin({
      email: config.adminEmail,
      password: config.adminPassword,
      reset: Boolean(config.adminReset),
    });
  } catch (error) {
    await store.close();
    throw error;
  }

  const umami = createUmamiClient({
    apiUrl: config.umamiApiUrl,
    websiteId: config.umamiWebsiteId,
    apiToken: config.umamiApiToken,
    username: config.umamiUsername,
    password: config.umamiPassword,
    request: config.request || requestJson,
    now,
    cacheMs: config.umamiCacheMs ?? 60_000,
  });
  const limiter = createRateLimiter({ now });
  const base = config.basePath || "/console";
  const limits = config.limits || DEFAULT_LIMITS;
  const app = express();
  app.disable("x-powered-by");
  app.set("query parser", "simple");

  const cookiePath = base === "/" ? "/" : base;

  function secureCookie(req) {
    if (config.cookieSecure === "1") return true;
    if (config.cookieSecure === "0") return false;
    return requestIsHttps(req);
  }

  function setCookie(res, req, name, value, maxAge) {
    writeCookie(res, {
      name,
      value,
      path: cookiePath,
      maxAge,
      secure: secureCookie(req),
      httpOnly: true,
    });
  }

  function sendHtml(res, status, html) {
    res.status(status);
    res.setHeader("Cache-Control", "no-store");
    res.type("html").send(html);
  }

  function sendFail(req, res, status, error, message, session) {
    res.status(status);
    res.setHeader("Cache-Control", "no-store");
    if (isApi(req)) {
      res.json({ ok: false, error, message });
      return;
    }
    const titles = { 429: "请稍后再试", 403: "无法继续", 404: "没有这一页", 401: "需要登录" };
    sendHtml(
      res,
      status,
      renderMessage({
        base,
        user: session ? session.user : null,
        csrf: session ? session.csrf : "",
        title: titles[status] || "出错了",
        detail: message,
      }),
    );
  }

  function limited(req, res, bucket, suffix) {
    const spec = limits[bucket];
    const key = `${bucket}:${suffix || clientIp(req)}`;
    const result = limiter.hit(key, spec.limit, spec.windowMs);
    if (result.ok) return false;
    res.setHeader("Retry-After", String(Math.max(1, Math.ceil(result.retryAfterMs / 1000))));
    sendFail(req, res, 429, "rate", "尝试次数过多，请稍后再试。");
    return true;
  }

  function sameOrigin(req, { presence = false } = {}) {
    return originAllowed(req, {
      trustedOrigins: config.trustedOrigins || [],
      allowLocalhost: presence,
    });
  }

  function parseBody(req, res) {
    return new Promise((resolve, reject) => {
      const type = String(req.headers["content-type"] || "");
      const done = (error) => (error ? reject(error) : resolve());
      if (type.includes("application/json") || type.includes("text/plain")) {
        express.json({ limit: "4kb", type: () => true })(req, res, done);
        return;
      }
      if (type.includes("application/x-www-form-urlencoded")) {
        express.urlencoded({ extended: false, limit: "16kb" })(req, res, done);
        return;
      }
      resolve();
    });
  }

  function bodyFail(req, res, error) {
    const tooLarge = error && (error.status === 413 || error.type === "entity.too.large");
    sendFail(req, res, tooLarge ? 413 : 400, "invalid", "请求格式不正确。");
  }

  async function currentSession(req) {
    const cookies = readCookies(req);
    if (!cookies.ys_session) return null;
    return store.readSession(cookies.ys_session);
  }

  function issueFormCsrf(req, res) {
    const cookies = readCookies(req);
    let token = cookies.ys_csrf || "";
    if (!/^[a-f0-9]{64}$/.test(token)) token = randomToken();
    setCookie(res, req, "ys_csrf", token, 2 * 60 * 60);
    return token;
  }

  function homeFor(user) {
    return joinBase(base, user.role === "admin" ? "/dashboard" : "/account");
  }

  async function requireSession(req, res) {
    const session = await currentSession(req);
    if (session) return session;
    if (isApi(req)) {
      sendFail(req, res, 401, "unauthorized", "请先登录。");
      return null;
    }
    res.redirect(303, joinBase(base, "/login"));
    return null;
  }

  async function requireAdmin(req, res) {
    const session = await requireSession(req, res);
    if (!session) return null;
    if (session.user.role !== "admin") {
      sendFail(req, res, 403, "forbidden", "只有工作人员可以看这块。", session);
      return null;
    }
    return session;
  }

  function guardPost(req, res, { presence = false } = {}) {
    if (sameOrigin(req, { presence })) return true;
    sendFail(req, res, 403, "csrf", "请求未通过安全校验，请刷新页面后重试。");
    return false;
  }

  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "same-origin");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
    );
    res.setHeader("Cache-Control", "no-store");
    next();
  });

  if (base !== "/") {
    app.get("/", (_req, res) => {
      res.redirect(302, `${base}/`);
    });
  }

  const router = express.Router();

  router.get("/console.css", (_req, res, next) => {
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300");
    res.sendFile(path.join(publicDir, "console.css"), (error) => {
      if (error) next(error);
    });
  });

  router.get("/console.js", (_req, res, next) => {
    res.setHeader("Content-Type", "text/javascript; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=300");
    res.sendFile(path.join(publicDir, "console.js"), (error) => {
      if (error) next(error);
    });
  });

  router.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "yuanshan-console",
      umami: umami.configured() ? "configured" : "unconfigured",
    });
  });

  router.post(
    "/api/presence",
    asyncRoute(async (req, res) => {
      if (limited(req, res, "presenceIp")) return;
      if (!guardPost(req, res, { presence: true })) return;
      try {
        await parseBody(req, res);
      } catch (error) {
        bodyFail(req, res, error);
        return;
      }
      const sid = req.body && typeof req.body.sid === "string" ? req.body.sid : "";
      if (!/^[A-Za-z0-9_-]{16,80}$/.test(sid)) {
        sendFail(req, res, 400, "invalid", "心跳无效。");
        return;
      }
      await store.touchPresence(sid, config.onlineWindowMs);
      res.json({ ok: true });
    }),
  );

  router.get(
    "/api/me",
    asyncRoute(async (req, res) => {
      const session = await requireSession(req, res);
      if (!session) return;
      const user = session.user;
      res.json({
        ok: true,
        user: {
          email: user.email,
          role: user.role,
          displayName: user.displayName,
          createdAt: user.createdAt,
        },
      });
    }),
  );

  router.get(
    "/api/stats",
    asyncRoute(async (req, res) => {
      const session = await requireAdmin(req, res);
      if (!session) return;
      const online = await store.countPresence(config.onlineWindowMs);
      const snapshot = await umami.overview();
      res.json({
        ok: true,
        online: { count: online, windowMs: config.onlineWindowMs },
        umami: snapshot,
      });
    }),
  );

  router.get(
    "/",
    asyncRoute(async (req, res) => {
      const session = await currentSession(req);
      if (!session) {
        res.redirect(303, joinBase(base, "/login"));
        return;
      }
      res.redirect(303, homeFor(session.user));
    }),
  );

  router.get(
    "/login",
    asyncRoute(async (req, res) => {
      const session = await currentSession(req);
      if (session) {
        res.redirect(303, homeFor(session.user));
        return;
      }
      const csrf = issueFormCsrf(req, res);
      sendHtml(res, 200, renderLogin({ base, csrf, error: "", email: "" }));
    }),
  );

  router.post(
    "/login",
    asyncRoute(async (req, res) => {
      if (!guardPost(req, res)) return;
      try {
        await parseBody(req, res);
      } catch (error) {
        bodyFail(req, res, error);
        return;
      }
      if (limited(req, res, "loginIp")) return;
      const email = String((req.body && req.body.email) || "");
      const emailKey = email.trim().toLowerCase().slice(0, 254) || clientIp(req);
      if (limited(req, res, "loginEmail", emailKey)) return;
      const cookies = readCookies(req);
      if (!tokensEqual(cookies.ys_csrf, req.body && req.body._csrf)) {
        sendFail(req, res, 403, "csrf", "请求未通过安全校验，请刷新页面后重试。");
        return;
      }
      const user = await store.verifyLogin({
        email,
        password: String((req.body && req.body.password) || ""),
      });
      if (!user) {
        const csrf = issueFormCsrf(req, res);
        sendHtml(res, 401, renderLogin({ base, csrf, error: "邮箱或密码不正确。", email }));
        return;
      }
      const created = await store.createSession(user.id);
      setCookie(res, req, "ys_session", created.token, SESSION_TTL_MS / 1000);
      setCookie(res, req, "ys_csrf", "", 0);
      res.redirect(303, homeFor(user));
    }),
  );

  router.get(
    "/register",
    asyncRoute(async (req, res) => {
      const session = await currentSession(req);
      if (session) {
        res.redirect(303, homeFor(session.user));
        return;
      }
      const csrf = issueFormCsrf(req, res);
      sendHtml(res, 200, renderRegister({ base, csrf, error: "", email: "", displayName: "" }));
    }),
  );

  router.post(
    "/register",
    asyncRoute(async (req, res) => {
      if (!guardPost(req, res)) return;
      try {
        await parseBody(req, res);
      } catch (error) {
        bodyFail(req, res, error);
        return;
      }
      if (limited(req, res, "register")) return;
      const body = req.body || {};
      if (typeof body.company_website === "string" && body.company_website.trim()) {
        sendFail(req, res, 400, "invalid", "无法提交。");
        return;
      }
      const cookies = readCookies(req);
      if (!tokensEqual(cookies.ys_csrf, body._csrf)) {
        sendFail(req, res, 403, "csrf", "请求未通过安全校验，请刷新页面后重试。");
        return;
      }
      const email = String(body.email || "");
      const displayName = String(body.displayName || "");
      const result = await store.registerUser({
        email,
        password: String(body.password || ""),
        displayName,
      });
      if (!result.ok) {
        const csrf = issueFormCsrf(req, res);
        const error =
          result.error === "exists"
            ? "这个邮箱已经注册，请直接登录。"
            : "请检查邮箱、密码（至少 10 位）和显示名。";
        sendHtml(
          res,
          result.error === "exists" ? 409 : 400,
          renderRegister({ base, csrf, error, email, displayName }),
        );
        return;
      }
      const created = await store.createSession(result.user.id);
      setCookie(res, req, "ys_session", created.token, SESSION_TTL_MS / 1000);
      setCookie(res, req, "ys_csrf", "", 0);
      res.redirect(303, homeFor(result.user));
    }),
  );

  router.post(
    "/logout",
    asyncRoute(async (req, res) => {
      if (!guardPost(req, res)) return;
      try {
        await parseBody(req, res);
      } catch (error) {
        bodyFail(req, res, error);
        return;
      }
      const session = await currentSession(req);
      if (!session || !tokensEqual(session.csrf, req.body && req.body._csrf)) {
        sendFail(req, res, 403, "csrf", "请求未通过安全校验，请刷新页面后重试。", session);
        return;
      }
      await store.destroySession(readCookies(req).ys_session);
      setCookie(res, req, "ys_session", "", 0);
      res.redirect(303, joinBase(base, "/login"));
    }),
  );

  router.get(
    "/account",
    asyncRoute(async (req, res) => {
      const session = await requireSession(req, res);
      if (!session) return;
      const notice = req.query.notice === "profile" || req.query.notice === "password" ? req.query.notice : "";
      sendHtml(
        res,
        200,
        renderAccount({ base, user: session.user, csrf: session.csrf, error: "", notice }),
      );
    }),
  );

  router.post(
    "/account",
    asyncRoute(async (req, res) => {
      if (!guardPost(req, res)) return;
      try {
        await parseBody(req, res);
      } catch (error) {
        bodyFail(req, res, error);
        return;
      }
      const session = await requireSession(req, res);
      if (!session) return;
      if (!tokensEqual(session.csrf, req.body && req.body._csrf)) {
        sendFail(req, res, 403, "csrf", "请求未通过安全校验，请刷新页面后重试。", session);
        return;
      }
      await store.updateDisplayName({
        userId: session.user.id,
        displayName: String((req.body && req.body.displayName) || ""),
      });
      res.redirect(303, `${joinBase(base, "/account")}?notice=profile`);
    }),
  );

  router.post(
    "/account/password",
    asyncRoute(async (req, res) => {
      if (!guardPost(req, res)) return;
      try {
        await parseBody(req, res);
      } catch (error) {
        bodyFail(req, res, error);
        return;
      }
      const session = await requireSession(req, res);
      if (!session) return;
      if (!tokensEqual(session.csrf, req.body && req.body._csrf)) {
        sendFail(req, res, 403, "csrf", "请求未通过安全校验，请刷新页面后重试。", session);
        return;
      }
      const result = await store.changePassword({
        userId: session.user.id,
        currentPassword: String((req.body && req.body.currentPassword) || ""),
        newPassword: String((req.body && req.body.newPassword) || ""),
        keepToken: readCookies(req).ys_session,
      });
      if (!result.ok) {
        const error = result.error === "bad-password" ? "当前密码不正确。" : "新密码至少 10 位。";
        sendHtml(res, 400, renderAccount({ base, user: session.user, csrf: session.csrf, error, notice: "" }));
        return;
      }
      res.redirect(303, `${joinBase(base, "/account")}?notice=password`);
    }),
  );

  router.get(
    "/dashboard",
    asyncRoute(async (req, res) => {
      const session = await requireAdmin(req, res);
      if (!session) return;
      const online = await store.countPresence(config.onlineWindowMs);
      const snapshot = await umami.overview();
      sendHtml(
        res,
        200,
        renderDashboard({
          base,
          user: session.user,
          csrf: session.csrf,
          online,
          umami: snapshot,
          windowMs: config.onlineWindowMs,
        }),
      );
    }),
  );

  app.use(base, router);

  app.use((req, res) => {
    sendFail(req, res, 404, "not-found", "这个地址不在控制台里。");
  });

  app.use((error, req, res, _next) => {
    console.error("[console]", error && error.message ? error.message : "request failed");
    if (res.headersSent) return;
    sendFail(req, res, 500, "server", "服务器出错，请稍后再试。");
  });

  return {
    app,
    store,
    seedResult,
    close: () => store.close(),
  };
}

function isDirectRun() {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

async function main() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  loadEnvFile(path.join(here, ".env"));
  const config = readConfig(process.env);
  const problem = assertRuntimeConfig(config);
  if (problem) {
    console.error(`[console] ${problem}`);
    process.exit(1);
  }
  if (!config.sessionSecret) {
    config.sessionSecret = randomBytes(32).toString("hex");
    console.warn("[console] CONSOLE_SESSION_SECRET is empty. Sessions end when this process exits.");
  }
  const started = await createApp(config);
  const server = started.app.listen(config.port, config.host, () => {
    const root = config.basePath === "/" ? "/" : `${config.basePath}/`;
    console.log(`[console] http://${config.host}:${config.port}${root}`);
    if (started.seedResult && started.seedResult.action !== "skipped") {
      console.log(`[console] admin seed: ${started.seedResult.action}`);
    }
  });
  server.on("error", (error) => {
    console.error("[console]", error.message);
    process.exit(1);
  });
  const shutdown = () => {
    server.close();
    started.close();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

if (isDirectRun()) {
  main().catch((error) => {
    console.error("[console]", error && error.message ? error.message : error);
    process.exit(1);
  });
}
