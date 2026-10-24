import assert from "node:assert/strict";
import { createServer } from "node:http";
import test from "node:test";
import { requestJson } from "./http-json.js";
import { createUmamiClient } from "./umami.js";
import { shanghaiStartOfDay } from "./time.js";

test("requestJson posts JSON over node:http", async () => {
  const server = createServer((req, res) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ echo: body.a, method: req.method }));
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const { port } = server.address();
    const res = await requestJson(`http://127.0.0.1:${port}/v`, { method: "POST", body: { a: 1 } });
    assert.equal(res.status, 200);
    assert.equal(res.json.echo, 1);
    assert.equal(res.json.method, "POST");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("stats client reads flat and wrapped counts and caches them", async () => {
  const at = Date.parse("2026-10-24T02:30:00Z");
  const calls = [];
  const client = createUmamiClient({
    apiUrl: "http://127.0.0.1:3001",
    websiteId: "site 1",
    apiToken: "token-1",
    now: () => at,
    cacheMs: 60_000,
    request: async (url, options) => {
      calls.push({ url, options });
      return {
        status: 200,
        json: { pageviews: { value: 10 }, visitors: 4, visits: 6, bounces: 1, totaltime: 20 },
      };
    },
  });
  const overview = await client.overview();
  assert.equal(overview.ok, true);
  assert.equal(overview.ranges.today.pageviews, 10);
  assert.equal(overview.ranges.d7.visitors, 4);
  assert.equal(calls.length, 3);
  assert.equal(calls[0].options.headers.Authorization, "Bearer token-1");
  assert.match(calls[0].url, /\/api\/websites\/site%201\/stats\?/);
  const today = new URL(calls[0].url);
  assert.equal(Number(today.searchParams.get("startAt")), shanghaiStartOfDay(at));
  assert.equal(Number(today.searchParams.get("endAt")), at);
  assert.equal((await client.overview()).ranges.d30.visits, 6);
  assert.equal(calls.length, 3);
});

test("username login is used when no API token is set, and 401 retries once", async () => {
  const calls = [];
  let stats = 0;
  const client = createUmamiClient({
    apiUrl: "http://stats.internal",
    websiteId: "site-1",
    username: "admin",
    password: "secret-pass",
    now: () => Date.parse("2026-10-24T02:30:00Z"),
    cacheMs: 0,
    request: async (url, options) => {
      calls.push(url);
      if (url.endsWith("/api/auth/login")) {
        assert.equal(options.body.password, "secret-pass");
        return { status: 200, json: { token: "jwt.eyJleHAiOjk5OTk5OTk5OTl9.sig" } };
      }
      stats += 1;
      if (stats === 1) return { status: 401, json: {} };
      return { status: 200, json: { pageviews: 2, visitors: 1, visits: 1, bounces: 0 } };
    },
  });
  const overview = await client.overview();
  assert.equal(overview.ranges.today.pageviews, 2);
  assert.equal(calls.filter((url) => url.endsWith("/api/auth/login")).length >= 1, true);
});

test("missing Umami config is a placeholder, not a thrown error", async () => {
  let called = false;
  const client = createUmamiClient({
    request: async () => {
      called = true;
      throw new Error("should not run");
    },
  });
  const overview = await client.overview();
  assert.equal(overview.configured, false);
  assert.equal(overview.ok, false);
  assert.match(overview.message, /未配置/);
  assert.equal(called, false);

  const bad = createUmamiClient({
    apiUrl: "file:///tmp/umami",
    websiteId: "site-1",
    apiToken: "token",
    request: async () => {
      throw new Error("should not run");
    },
  });
  const broken = await bad.overview();
  assert.equal(broken.reason, "bad-url");
});
