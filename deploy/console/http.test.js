import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_LIMITS } from "./config.js";
import { csrfFrom, form, launch, request, updateJar } from "./helpers.js";

const password = "correct-horse";

async function register(ctx, { email, displayName = "甲", jar = {} } = {}) {
  const page = await request(ctx.base, { path: "/console/register", jar });
  updateJar(jar, page.headers["set-cookie"]);
  const posted = await request(ctx.base, {
    method: "POST",
    path: "/console/register",
    jar,
    body: form({
      _csrf: csrfFrom(page.body),
      email,
      password,
      displayName,
    }),
  });
  updateJar(jar, posted.headers["set-cookie"]);
  return posted;
}

test("first visitor becomes admin, the next is a member, Decap stays linked for staff", async () => {
  const ctx = await launch();
  try {
    const adminJar = {};
    const created = await register(ctx, { email: "staff@example.com", displayName: "<img src=x>", jar: adminJar });
    assert.equal(created.status, 303);
    assert.equal(created.headers.location, "/console/dashboard");
    const session = adminJar.ys_session;
    assert.ok(session);
    const setCookie = [].concat(created.headers["set-cookie"] || []).join("\n");
    assert.match(setCookie, /ys_session=/);
    assert.match(setCookie, /HttpOnly/i);
    assert.match(setCookie, /SameSite=Lax/i);
    assert.doesNotMatch(setCookie, /Secure/i);

    const me = await request(ctx.base, { path: "/console/api/me", jar: adminJar });
    const profile = JSON.parse(me.body);
    assert.equal(profile.user.role, "admin");
    assert.equal(profile.user.email, "staff@example.com");
    assert.equal(JSON.stringify(profile).includes("password"), false);

    const css = await request(ctx.base, { path: "/console/console.css" });
    assert.equal(css.status, 200);
    assert.match(css.headers["content-type"], /text\/css/);
    assert.match(css.body, /--lime/);
    const script = await request(ctx.base, { path: "/console/console.js" });
    assert.equal(script.status, 200);
    assert.match(script.body, /data-stats/);

    const dashboard = await request(ctx.base, { path: "/console/dashboard", jar: adminJar });
    assert.equal(dashboard.status, 200);
    assert.match(dashboard.body, /href="\/admin\/"/);
    assert.match(dashboard.body, /href="\/umami\/"/);
    assert.match(dashboard.body, /2026-10-24|近 3 分钟/);
    assert.match(dashboard.body, /未配置 Umami/);

    const account = await request(ctx.base, { path: "/console/account", jar: adminJar });
    assert.equal(account.body.includes("<img"), false);
    assert.match(account.body, /2026-10-24 10:30:00/);

    const memberJar = {};
    const member = await register(ctx, { email: "visitor@example.com", displayName: "客", jar: memberJar });
    assert.equal(member.headers.location, "/console/account");
    const memberMe = JSON.parse((await request(ctx.base, { path: "/console/api/me", jar: memberJar })).body);
    assert.equal(memberMe.user.role, "member");
    const memberPage = await request(ctx.base, { path: "/console/account", jar: memberJar });
    assert.equal(memberPage.body.includes('href="/admin/"'), false);
    const forbidden = await request(ctx.base, { path: "/console/dashboard", jar: memberJar });
    assert.equal(forbidden.status, 403);
    const stats = await request(ctx.base, { path: "/console/api/stats", jar: memberJar });
    assert.equal(stats.status, 403);

    const anonymous = await request(ctx.base, { path: "/console/api/me" });
    assert.equal(anonymous.status, 401);
  } finally {
    await ctx.close();
  }
});

test("login failure reads the same for an unknown mailbox and a bad password", async () => {
  const ctx = await launch();
  try {
    const jar = {};
    await register(ctx, { email: "staff@example.com", jar });
    async function attempt(email, secret) {
      const page = await request(ctx.base, { path: "/console/login" });
      const posted = await request(ctx.base, {
        method: "POST",
        path: "/console/login",
        jar: {},
        body: form({ _csrf: csrfFrom(page.body), email, password: secret }),
        headers: { Cookie: page.headers["set-cookie"].map((line) => line.split(";")[0]).join("; ") },
      });
      return posted;
    }
    const unknown = await attempt("missing@example.com", password);
    const wrong = await attempt("staff@example.com", "not-the-right-secret");
    assert.equal(unknown.status, 401);
    assert.equal(wrong.status, 401);
    assert.match(unknown.body, /邮箱或密码不正确/);
    assert.match(wrong.body, /邮箱或密码不正确/);
  } finally {
    await ctx.close();
  }
});

test("state-changing posts require the csrf cookie and a same-site origin", async () => {
  const ctx = await launch();
  try {
    const jar = {};
    await register(ctx, { email: "staff@example.com", jar });
    const bare = await request(ctx.base, {
      method: "POST",
      path: "/console/login",
      body: form({ email: "staff@example.com", password }),
    });
    assert.equal(bare.status, 403);
    assert.match(bare.body, /安全校验/);

    const page = await request(ctx.base, { path: "/console/account", jar });
    const token = csrfFrom(page.body);
    const loggedOut = await request(ctx.base, {
      method: "POST",
      path: "/console/logout",
      jar,
      headers: { Origin: "https://evil.example" },
      body: form({ _csrf: token }),
    });
    assert.equal(loggedOut.status, 403);
    const still = await request(ctx.base, { path: "/console/api/me", jar });
    assert.equal(still.status, 200);

    const bye = await request(ctx.base, {
      method: "POST",
      path: "/console/logout",
      jar,
      body: form({ _csrf: token }),
    });
    assert.equal(bye.status, 303);
    updateJar(jar, bye.headers["set-cookie"]);
    const gone = await request(ctx.base, { path: "/console/api/me", jar });
    assert.equal(gone.status, 401);
  } finally {
    await ctx.close();
  }
});

test("profile updates escape the notice query and keep the current session", async () => {
  const ctx = await launch();
  try {
    const jar = {};
    await register(ctx, { email: "staff@example.com", displayName: "甲", jar });
    const page = await request(ctx.base, { path: "/console/account?notice=%3Cscript%3E", jar });
    assert.equal(page.body.includes("<script>"), false);
    assert.equal(page.body.includes("alert"), false);
    const saved = await request(ctx.base, {
      method: "POST",
      path: "/console/account",
      jar,
      body: form({ _csrf: csrfFrom(page.body), displayName: "乙" }),
    });
    assert.equal(saved.status, 303);
    const next = await request(ctx.base, { path: saved.headers.location, jar });
    assert.match(next.body, /显示名已更新/);
    assert.match(next.body, /乙/);
    const changed = await request(ctx.base, {
      method: "POST",
      path: "/console/account/password",
      jar,
      body: form({
        _csrf: csrfFrom(next.body),
        currentPassword: password,
        newPassword: "correct-horse-2",
      }),
    });
    assert.equal(changed.status, 303);
    const me = await request(ctx.base, { path: "/console/api/me", jar });
    assert.equal(me.status, 200);
    const reloginPage = await request(ctx.base, { path: "/console/login" });
    const reloginJar = {};
    updateJar(reloginJar, reloginPage.headers["set-cookie"]);
    const relogin = await request(ctx.base, {
      method: "POST",
      path: "/console/login",
      jar: reloginJar,
      body: form({ _csrf: csrfFrom(reloginPage.body), email: "staff@example.com", password: "correct-horse-2" }),
    });
    assert.equal(relogin.status, 303);
  } finally {
    await ctx.close();
  }
});

test("online count follows heartbeats and ignores other sites", async () => {
  const ctx = await launch();
  try {
    const jar = {};
    await register(ctx, { email: "staff@example.com", jar });
    const beat = await request(ctx.base, {
      method: "POST",
      path: "/console/api/presence",
      headers: { "Content-Type": "application/json", Origin: "http://127.0.0.1:4477" },
      body: JSON.stringify({ sid: "sid-aaaaaaaaaaaa", path: "/news" }),
    });
    assert.equal(beat.status, 200);
    await request(ctx.base, {
      method: "POST",
      path: "/console/api/presence",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sid: "sid-bbbbbbbbbbbb", path: "/rankings" }),
    });
    const evil = await request(ctx.base, {
      method: "POST",
      path: "/console/api/presence",
      headers: { "Content-Type": "application/json", Origin: "https://evil.example" },
      body: JSON.stringify({ sid: "sid-cccccccccccc" }),
    });
    assert.equal(evil.status, 403);
    const stats = JSON.parse((await request(ctx.base, { path: "/console/api/stats", jar })).body);
    assert.equal(stats.online.count, 2);
    assert.equal(stats.umami.configured, false);
    ctx.clock.t += 181_000;
    const later = JSON.parse((await request(ctx.base, { path: "/console/api/stats", jar })).body);
    assert.equal(later.online.count, 0);
  } finally {
    await ctx.close();
  }
});

test("register is rate limited and Umami numbers stay free of the API token", async () => {
  const calls = [];
  const ctx = await launch({
    limits: { ...DEFAULT_LIMITS, register: { limit: 2, windowMs: 60 * 60 * 1000 } },
    umamiApiUrl: "http://127.0.0.1:3001",
    umamiWebsiteId: "site-1",
    umamiApiToken: "super-secret-umami-token",
    request: async () => {
      calls.push("stats");
      return { status: 200, json: { pageviews: 1200, visitors: 80, visits: 90, bounces: 10 } };
    },
  });
  try {
    const health = await request(ctx.base, { path: "/console/api/health" });
    const healthBody = JSON.parse(health.body);
    assert.equal(healthBody.ok, true);
    assert.equal(healthBody.service, "yuanshan-console");
    assert.equal(healthBody.umami, "configured");
    assert.equal(health.body.includes("super-secret-umami-token"), false);
    assert.equal(health.body.includes("3001"), false);

    assert.equal((await register(ctx, { email: "a@example.com", jar: {} })).status, 303);
    assert.equal((await register(ctx, { email: "b@example.com", jar: {} })).status, 303);
    const blocked = await register(ctx, { email: "c@example.com", jar: {} });
    assert.equal(blocked.status, 429);
    assert.match(blocked.body, /稍后再试/);
    assert.ok(blocked.headers["retry-after"]);

    const jar = {};
    const page = await request(ctx.base, { path: "/console/login" });
    updateJar(jar, page.headers["set-cookie"]);
    const logged = await request(ctx.base, {
      method: "POST",
      path: "/console/login",
      jar,
      body: form({ _csrf: csrfFrom(page.body), email: "a@example.com", password }),
    });
    updateJar(jar, logged.headers["set-cookie"]);
    const dashboard = await request(ctx.base, { path: "/console/dashboard", jar });
    assert.match(dashboard.body, /1,200/);
    assert.match(dashboard.body, /80/);
    assert.equal(dashboard.body.includes("super-secret-umami-token"), false);
    assert.equal(calls.length, 3);
  } finally {
    await ctx.close();
  }
});

test("https behind the proxy marks the session cookie Secure", async () => {
  const ctx = await launch({ cookieSecure: "auto" });
  try {
    const page = await request(ctx.base, {
      path: "/console/register",
      headers: { "X-Forwarded-Proto": "https" },
    });
    const posted = await request(ctx.base, {
      method: "POST",
      path: "/console/register",
      headers: {
        "X-Forwarded-Proto": "https",
        Cookie: [].concat(page.headers["set-cookie"]).map((line) => line.split(";")[0]).join("; "),
      },
      body: form({
        _csrf: csrfFrom(page.body),
        email: "staff@example.com",
        password,
        displayName: "甲",
      }),
    });
    const setCookie = [].concat(posted.headers["set-cookie"]).join("\n");
    assert.match(setCookie, /Secure/);
    assert.match(setCookie, /HttpOnly/);
  } finally {
    await ctx.close();
  }
});
