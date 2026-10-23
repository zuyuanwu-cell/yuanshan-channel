/**
 * Minimal GitHub OAuth bridge for Decap CMS, plus the collab-form proxy.
 * Exposes /auth and /callback (also under /oauth/* when reverse-proxied).
 * POST /api/contact (public path /oauth/api/contact) forwards to WeCom.
 *
 * Env:
 *   OAUTH_CLIENT_ID       GitHub OAuth App client id
 *   OAUTH_CLIENT_SECRET   GitHub OAuth App client secret
 *   OAUTH_HOST            bind host (default 127.0.0.1)
 *   OAUTH_PORT            bind port (default 4181)
 *   TRUSTED_ORIGINS       comma-separated origins allowed to receive the token
 *                         e.g. https://ys.tongzhoukuajing.com
 *                         (localhost origins always allowed for local smoke tests)
 *   WECOM_WEBHOOK_URL     企业微信群机器人 webhook。留空则联系表单返回 503。
 *                         不要写入仓库。
 */
import express from "express";
import { URLSearchParams } from "node:url";
import { createContactHandler, resolveWebhook } from "./contact.js";

const CLIENT_ID = process.env.OAUTH_CLIENT_ID || "";
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || "";
const HOST = process.env.OAUTH_HOST || "127.0.0.1";
const PORT = Number(process.env.OAUTH_PORT || 4181);
const TRUSTED = new Set(
  (process.env.TRUSTED_ORIGINS || "https://ys.tongzhoukuajing.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
);

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "[oauth] Missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET. Refusing to start.",
  );
  process.exit(1);
}

const app = express();

function scriptOriginOk(origin) {
  if (!origin) return false;
  if (TRUSTED.has(origin)) return true;
  try {
    const u = new URL(origin);
    return u.hostname === "localhost" || u.hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function authHandler(req, res) {
  const provider = "github";
  const scope = "repo,user";
  const redirectUri = absoluteCallback(req);
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    scope,
    state: provider,
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}

function absoluteCallback(req) {
  // Prefer reverse-proxy headers so GitHub sees the public URL.
  const proto = (req.headers["x-forwarded-proto"] || req.protocol || "https")
    .toString()
    .split(",")[0]
    .trim();
  const host = (
    req.headers["x-forwarded-host"] ||
    req.headers.host ||
    "localhost"
  )
    .toString()
    .split(",")[0]
    .trim();
  // When nginx mounts us at /oauth/, external path is /oauth/callback.
  const prefix = req.baseUrl || "";
  return `${proto}://${host}${prefix}/callback`;
}

async function callbackHandler(req, res) {
  const code = req.query.code;
  if (!code || typeof code !== "string") {
    res.status(400).send("Missing code");
    return;
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }),
  });
  const data = await tokenRes.json();
  if (!data.access_token) {
    res
      .status(400)
      .send(
        `GitHub token exchange failed: ${data.error || "unknown"} ${data.error_description || ""}`,
      );
    return;
  }

  const content = {
    token: data.access_token,
    provider: "github",
  };
  const msg = `authorization:github:success:${JSON.stringify(content)}`;

  // Decap listens for postMessage from the popup. We only reply to trusted origins.
  const originsJson = JSON.stringify([...TRUSTED, "http://localhost:4477", "http://127.0.0.1:4477"]);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!doctype html>
<html><body>
<script>
(function () {
  var msg = ${JSON.stringify(msg)};
  var trusted = ${originsJson};
  function receiveMessage(e) {
    if (trusted.indexOf(e.origin) === -1) return;
    window.opener.postMessage(msg, e.origin);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
<p>正在完成 GitHub 登录…可关闭此窗口。</p>
</body></html>`);
}

function health(_req, res) {
  const contact = resolveWebhook(process.env.WECOM_WEBHOOK_URL || "");
  res.json({
    ok: true,
    service: "yuanshan-decap-oauth",
    contact: contact.state === "ok" ? "configured" : "unconfigured",
  });
}

function jsonBody(req, res, next) {
  express.json({ limit: "16kb" })(req, res, (err) => {
    if (!err) return next();
    const tooLarge = err.status === 413 || err.type === "entity.too.large";
    res.status(tooLarge ? 413 : 400).json({ ok: false, error: "invalid" });
  });
}

// Mount both at root and under /oauth so either nginx style works.
const router = express.Router();
router.get("/auth", authHandler);
router.get("/callback", callbackHandler);
router.get("/health", health);
router.post("/api/contact", jsonBody, createContactHandler());

app.use("/", router);
app.use("/oauth", router);

app.listen(PORT, HOST, () => {
  console.log(`[oauth] listening on http://${HOST}:${PORT}`);
  console.log(`[oauth] trusted origins: ${[...TRUSTED].join(", ")}`);
});
