import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let sqlPromise;

function loadSql() {
  if (!sqlPromise) {
    const initSqlJs = require("sql.js");
    const wasmPath = require.resolve("sql.js/dist/sql-wasm.wasm");
    sqlPromise = initSqlJs({ wasmBinary: fs.readFileSync(wasmPath) });
  }
  return sqlPromise;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
INSERT OR IGNORE INTO meta (key, value) VALUES ('schema', '1');

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
  display_name TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  csrf_secret TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions (user_id);

CREATE TABLE IF NOT EXISTS presence (
  sid_hash TEXT PRIMARY KEY,
  last_seen INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS presence_last_seen ON presence (last_seen);
`;

function persistFile(db, filePath) {
  const bytes = Buffer.from(db.export());
  const tmp = `${filePath}.${process.pid}.tmp`;
  const fd = fs.openSync(tmp, "w", 0o600);
  try {
    fs.writeSync(fd, bytes);
    fs.fsyncSync(fd);
  } finally {
    fs.closeSync(fd);
  }
  fs.renameSync(tmp, filePath);
  try {
    fs.chmodSync(filePath, 0o600);
  } catch {
    // Windows or a read-only mount: the bytes are already in place.
  }
}

export async function openDatabase(filePath) {
  const SQL = await loadSql();
  fs.mkdirSync(path.dirname(filePath), { recursive: true, mode: 0o700 });
  const db = fs.existsSync(filePath)
    ? new SQL.Database(fs.readFileSync(filePath))
    : new SQL.Database();
  db.exec(SCHEMA);

  function run(sql, params = []) {
    if (params.length) db.run(sql, params);
    else db.run(sql);
  }

  function get(sql, params = []) {
    const stmt = db.prepare(sql);
    try {
      if (params.length) stmt.bind(params);
      if (!stmt.step()) return null;
      return stmt.getAsObject();
    } finally {
      stmt.free();
    }
  }

  function all(sql, params = []) {
    const stmt = db.prepare(sql);
    try {
      if (params.length) stmt.bind(params);
      const rows = [];
      while (stmt.step()) rows.push(stmt.getAsObject());
      return rows;
    } finally {
      stmt.free();
    }
  }

  function transaction(fn) {
    db.run("BEGIN");
    try {
      const result = fn();
      db.run("COMMIT");
      persistFile(db, filePath);
      return result;
    } catch (error) {
      try {
        db.run("ROLLBACK");
      } catch {
        // Already rolled back.
      }
      throw error;
    }
  }

  function close() {
    persistFile(db, filePath);
    db.close();
  }

  persistFile(db, filePath);
  return { run, get, all, transaction, close };
}
