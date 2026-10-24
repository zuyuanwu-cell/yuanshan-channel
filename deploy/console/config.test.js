import assert from "node:assert/strict";
import test from "node:test";
import { assertRuntimeConfig, joinBase, normalizeBase, readConfig } from "./config.js";
import { clientIp, originAllowed } from "./http-util.js";
import { formatShanghai, shanghaiStartOfDay } from "./time.js";

test("paths and online window stay inside the documented bounds", () => {
  assert.equal(joinBase("/console", "/login"), "/console/login");
  assert.equal(joinBase("/console", "/"), "/console/");
  assert.equal(joinBase("/", "/login"), "/login");
  assert.equal(normalizeBase("console/"), "/console");
  assert.throws(() => normalizeBase("/console/../x"));

  const config = readConfig({
    CONSOLE_ONLINE_WINDOW_MS: "1000",
    TRUSTED_ORIGINS: "https://ys.tongzhoukuajing.com",
    CONSOLE_ADMIN_EMAIL: "Staff@Example.com",
    CONSOLE_ADMIN_PASSWORD: "seed-password-1",
  });
  assert.equal(config.onlineWindowMs, 120_000);
  assert.equal(config.adminEmail, "staff@example.com");
  assert.equal(config.trustedOrigins.includes("http://127.0.0.1:4477"), true);
  assert.equal(readConfig({ CONSOLE_ONLINE_WINDOW_MS: "999999" }).onlineWindowMs, 300_000);
  assert.equal(readConfig({}).onlineWindowMs, 180_000);
  assert.equal(readConfig({ TRUSTED_ORIGINS: "" }).trustedOrigins.includes("https://ys.tongzhoukuajing.com"), true);
});

test("production refuses a short session secret and a half-set admin", () => {
  const base = readConfig({});
  assert.equal(assertRuntimeConfig({ ...base, nodeEnv: "production", sessionSecret: "short" }).length > 0, true);
  assert.equal(assertRuntimeConfig({ ...base, nodeEnv: "production", sessionSecret: "x".repeat(32) }), "");
  assert.match(assertRuntimeConfig({ ...base, adminEmail: "a@b.co", adminPassword: "" }), /together/);
  assert.match(
    assertRuntimeConfig({ ...base, adminEmail: "not-an-email", adminPassword: "seed-password-1" }),
    /CONSOLE_ADMIN_EMAIL/,
  );
});

test("Shanghai day boundary does not use a DST offset", () => {
  assert.equal(formatShanghai(new Date("2026-10-24T02:30:00Z")), "2026-10-24 10:30:00");
  assert.equal(shanghaiStartOfDay(Date.parse("2026-10-24T02:30:00Z")), Date.parse("2026-10-24T00:00:00+08:00"));
  assert.equal(shanghaiStartOfDay(Date.parse("2026-10-24T16:30:00Z")), Date.parse("2026-10-25T00:00:00+08:00"));
});

test("forwarded client ip is trusted only from loopback", () => {
  assert.equal(
    clientIp({ headers: { "x-real-ip": "203.0.113.8" }, socket: { remoteAddress: "127.0.0.1" } }),
    "203.0.113.8",
  );
  assert.equal(
    clientIp({ headers: { "x-real-ip": "203.0.113.8" }, socket: { remoteAddress: "198.51.100.4" } }),
    "198.51.100.4",
  );
});

test("cross-site origin is rejected and the dev site is allowed", () => {
  const trusted = ["https://ys.tongzhoukuajing.com", "http://127.0.0.1:4477"];
  const local = {
    headers: { host: "127.0.0.1:4182", origin: "http://127.0.0.1:4182" },
    socket: { remoteAddress: "127.0.0.1" },
  };
  assert.equal(originAllowed(local, { trustedOrigins: trusted }), true);
  assert.equal(
    originAllowed(
      {
        headers: { host: "127.0.0.1:4182", origin: "https://evil.example" },
        socket: { remoteAddress: "127.0.0.1" },
      },
      { trustedOrigins: trusted },
    ),
    false,
  );
  assert.equal(
    originAllowed(
      {
        headers: { host: "127.0.0.1:4182", origin: "http://127.0.0.1:4477" },
        socket: { remoteAddress: "127.0.0.1" },
      },
      { trustedOrigins: trusted, allowLocalhost: true },
    ),
    true,
  );
});
