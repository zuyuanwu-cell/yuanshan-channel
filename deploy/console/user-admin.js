#!/usr/bin/env node
/**
 * 在服务器上改角色或删除用户。密码不经过命令行参数。
 *   node user-admin.js list
 *   node user-admin.js promote person@example.com
 *   node user-admin.js delete person@example.com
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvFile, readConfig } from "./config.js";
import { openDatabase } from "./db.js";
import { createStore } from "./store.js";
import { formatShanghai } from "./time.js";

const here = path.dirname(fileURLToPath(import.meta.url));
loadEnvFile(path.join(here, ".env"));

const [cmd, email] = process.argv.slice(2);
const usage = "用法: node user-admin.js list | promote 邮箱 | delete 邮箱";

if (!cmd || !["list", "promote", "delete"].includes(cmd) || (cmd !== "list" && !email)) {
  console.error(usage);
  process.exit(1);
}

const config = readConfig(process.env);
if (!config.sessionSecret) config.sessionSecret = "user-admin-does-not-read-sessions";

const database = await openDatabase(config.dataFile);
const store = await createStore(database, { sessionSecret: config.sessionSecret });

try {
  if (cmd === "list") {
    const users = await store.listUsers();
    if (users.length === 0) {
      console.log("还没有用户。");
    } else {
      for (const user of users) {
        console.log(`${user.role}\t${user.email}\t${formatShanghai(new Date(user.createdAt))}`);
      }
    }
  } else if (cmd === "promote") {
    const result = await store.promote(email);
    if (!result.ok) {
      console.error("没有这个用户。");
      process.exitCode = 1;
    } else {
      console.log(`已设为工作人员：${result.user.email}`);
    }
  } else {
    const result = await store.deleteUser(email);
    if (!result.ok) {
      console.error("没有这个用户。");
      process.exitCode = 1;
    } else {
      console.log(`已删除：${email.trim().toLowerCase()}`);
    }
  }
} finally {
  await store.close();
}
