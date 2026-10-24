import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { openDatabase } from "./db.js";
import { hashPassword, verifyPassword } from "./passwords.js";
import { createStore } from "./store.js";

const secret = "test-session-secret-0123456789abcdef";

async function tempStore() {
  const dir = mkdtempSync(path.join(tmpdir(), "ys-store-"));
  const file = path.join(dir, "console.sqlite");
  const db = await openDatabase(file);
  const store = await createStore(db, { scryptN: 1024, sessionSecret: secret });
  return {
    file,
    store,
    async close() {
      await store.close();
      rmSync(dir, { recursive: true, force: true });
    },
  };
}

test("password hash verifies and hides the password", async () => {
  const encoded = await hashPassword("correct-horse", { N: 1024 });
  assert.equal(encoded.includes("correct-horse"), false);
  assert.equal(await verifyPassword("correct-horse", encoded), true);
  assert.equal(await verifyPassword("wrong-horse!!", encoded), false);
  assert.equal(await verifyPassword("correct-horse", "nope"), false);
});

test("first account is admin, the next is a member, file survives reopen", async () => {
  const ctx = await tempStore();
  try {
    const first = await ctx.store.registerUser({
      email: "Staff@Example.com",
      password: "correct-horse",
      displayName: "<b>甲</b>",
    });
    assert.equal(first.ok, true);
    assert.equal(first.user.role, "admin");
    assert.equal(first.user.email, "staff@example.com");
    assert.equal(first.user.displayName.includes("<"), false);

    const again = await ctx.store.registerUser({
      email: "staff@example.com",
      password: "correct-horse",
      displayName: "甲",
    });
    assert.equal(again.ok, false);
    assert.equal(again.error, "exists");

    const second = await ctx.store.registerUser({
      email: "visitor@example.com",
      password: "visitor-pass1",
      displayName: "",
    });
    assert.equal(second.user.role, "member");
    assert.equal(second.user.displayName, "visitor");
    assert.equal(await ctx.store.verifyLogin({ email: "missing@example.com", password: "visitor-pass1" }), null);
    assert.equal(await ctx.store.verifyLogin({ email: "visitor@example.com", password: "not-the-pass" }), null);

    const kept = await ctx.store.createSession(second.user.id);
    const other = await ctx.store.createSession(second.user.id);
    const changed = await ctx.store.changePassword({
      userId: second.user.id,
      currentPassword: "visitor-pass1",
      newPassword: "visitor-pass2",
      keepToken: kept.token,
    });
    assert.equal(changed.ok, true);
    assert.ok(await ctx.store.readSession(kept.token));
    assert.equal(await ctx.store.readSession(other.token), null);
    assert.equal(await ctx.store.changePassword({
      userId: second.user.id,
      currentPassword: "visitor-pass1",
      newPassword: "visitor-pass3",
      keepToken: kept.token,
    }).then((result) => result.error), "bad-password");
    await ctx.store.close();

    const reopened = await createStore(await openDatabase(ctx.file), { scryptN: 1024, sessionSecret: secret });
    const admin = await reopened.verifyLogin({ email: "staff@example.com", password: "correct-horse" });
    assert.equal(admin.role, "admin");
    const member = await reopened.verifyLogin({ email: "visitor@example.com", password: "visitor-pass2" });
    assert.equal(member.role, "member");
    await reopened.close();
  } finally {
    rmSync(path.dirname(ctx.file), { recursive: true, force: true });
  }
});

test("env seed stays admin and reset is explicit", async () => {
  const ctx = await tempStore();
  try {
    const created = await ctx.store.seedAdmin({
      email: "Admin@Example.com",
      password: "seed-password-1",
      reset: false,
    });
    assert.equal(created.action, "created");
    const visitor = await ctx.store.registerUser({
      email: "visitor@example.com",
      password: "visitor-pass1",
      displayName: "客",
    });
    assert.equal(visitor.user.role, "member");
    assert.equal((await ctx.store.seedAdmin({
      email: "admin@example.com",
      password: "different-password-2",
      reset: false,
    })).action, "exists");
    assert.ok(await ctx.store.verifyLogin({ email: "admin@example.com", password: "seed-password-1" }));
    assert.equal((await ctx.store.seedAdmin({
      email: "admin@example.com",
      password: "different-password-2",
      reset: true,
    })).action, "reset");
    assert.equal(await ctx.store.verifyLogin({ email: "admin@example.com", password: "seed-password-1" }), null);
    assert.equal((await ctx.store.verifyLogin({ email: "admin@example.com", password: "different-password-2" })).role, "admin");

    const promoted = await ctx.store.promote("visitor@example.com");
    assert.equal(promoted.user.role, "admin");
    assert.equal((await ctx.store.deleteUser("visitor@example.com")).ok, true);
    assert.equal((await ctx.store.deleteUser("visitor@example.com")).error, "missing");
  } finally {
    await ctx.close();
  }
});

test("presence count is distinct sessions inside the window", async () => {
  const clock = { t: 1_700_000_000_000 };
  const dir = mkdtempSync(path.join(tmpdir(), "ys-presence-"));
  const db = await openDatabase(path.join(dir, "console.sqlite"));
  const store = await createStore(db, { scryptN: 1024, sessionSecret: secret, now: () => clock.t });
  try {
    await store.touchPresence("sid-aaaaaaaaaaaa", 180_000);
    await store.touchPresence("sid-aaaaaaaaaaaa", 180_000);
    await store.touchPresence("sid-bbbbbbbbbbbb", 180_000);
    assert.equal(await store.countPresence(180_000), 2);
    clock.t += 181_000;
    assert.equal(await store.countPresence(180_000), 0);
  } finally {
    await store.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

test("user-admin promotes without printing password hashes", async () => {
  const ctx = await tempStore();
  const cwd = path.dirname(fileURLToPath(import.meta.url));
  try {
    await ctx.store.registerUser({
      email: "visitor@example.com",
      password: "visitor-pass1",
      displayName: "客",
    });
    await ctx.store.close();
    const result = spawnSync(process.execPath, ["user-admin.js", "promote", "visitor@example.com"], {
      cwd,
      env: {
        ...process.env,
        CONSOLE_DATA_FILE: ctx.file,
        CONSOLE_SESSION_SECRET: secret,
      },
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /工作人员/);
    assert.equal(result.stdout.includes("scrypt$"), false);
    assert.equal(result.stdout.includes("visitor-pass1"), false);

    const listed = spawnSync(process.execPath, ["user-admin.js", "list"], {
      cwd,
      env: { ...process.env, CONSOLE_DATA_FILE: ctx.file, CONSOLE_SESSION_SECRET: secret },
      encoding: "utf8",
    });
    assert.equal(listed.status, 0, listed.stderr);
    assert.match(listed.stdout, /^admin\tvisitor@example.com\t/m);
    assert.equal(listed.stdout.includes("scrypt$"), false);
  } finally {
    rmSync(path.dirname(ctx.file), { recursive: true, force: true });
  }
});
