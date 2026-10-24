import { createHash, createHmac, randomBytes } from "node:crypto";
import {
  cleanDisplayName,
  hashPassword,
  normalizeEmail,
  validatePassword,
  verifyPassword,
} from "./passwords.js";

export const SESSION_TTL_MS = 14 * 24 * 60 * 60 * 1000;

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function newId() {
  return randomBytes(16).toString("hex");
}

function newToken() {
  return randomBytes(32).toString("hex");
}

function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    role: row.role,
    displayName: row.display_name,
    createdAt: Number(row.created_at),
  };
}

export async function createStore(db, { scryptN = 16384, now = () => Date.now(), sessionSecret = "" } = {}) {
  if (!sessionSecret) throw new Error("session-secret-required");
  let dummyHash = "";
  async function dummy() {
    if (!dummyHash) dummyHash = await hashPassword(`dummy-${newId()}`, { N: scryptN });
    return dummyHash;
  }

  function tokenHash(token) {
    return createHmac("sha256", sessionSecret).update(String(token)).digest("hex");
  }
  let tail = Promise.resolve();

  function withLock(fn) {
    const run = tail.then(fn, fn);
    tail = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  function getUserByEmail(email) {
    return db.get("SELECT * FROM users WHERE email = ?", [email]);
  }

  function getUserById(id) {
    return db.get("SELECT * FROM users WHERE id = ?", [id]);
  }

  return {
    seedAdmin({ email, password, reset }) {
      return withLock(async () => {
        const normalized = normalizeEmail(email);
        if (!normalized && !password) return { action: "skipped" };
        if (!normalized || !validatePassword(password)) {
          throw new Error("admin-seed-invalid");
        }
        const existing = getUserByEmail(normalized);
        if (!existing) {
          const passwordHash = await hashPassword(password, { N: scryptN });
          const user = {
            id: newId(),
            email: normalized,
            displayName: cleanDisplayName("", normalized),
            createdAt: now(),
          };
          db.transaction(() => {
            db.run(
              `INSERT INTO users (id, email, password_hash, role, display_name, created_at)
               VALUES (?, ?, ?, 'admin', ?, ?)`,
              [user.id, user.email, passwordHash, user.displayName, user.createdAt],
            );
          });
          return { action: "created" };
        }
        if (reset) {
          const passwordHash = await hashPassword(password, { N: scryptN });
          db.transaction(() => {
            db.run(
              "UPDATE users SET password_hash = ?, role = 'admin' WHERE id = ?",
              [passwordHash, existing.id],
            );
            db.run("DELETE FROM sessions WHERE user_id = ?", [existing.id]);
          });
          return { action: "reset" };
        }
        if (existing.role !== "admin") {
          db.transaction(() => {
            db.run("UPDATE users SET role = 'admin' WHERE id = ?", [existing.id]);
          });
          return { action: "promoted" };
        }
        return { action: "exists" };
      });
    },

    registerUser({ email, password, displayName }) {
      return withLock(async () => {
        const normalized = normalizeEmail(email);
        if (!normalized || !validatePassword(password)) return { ok: false, error: "invalid" };
        if (getUserByEmail(normalized)) return { ok: false, error: "exists" };
        const passwordHash = await hashPassword(password, { N: scryptN });
        const countRow = db.get("SELECT COUNT(*) AS n FROM users");
        const role = Number(countRow?.n || 0) === 0 ? "admin" : "member";
        const user = {
          id: newId(),
          email: normalized,
          role,
          displayName: cleanDisplayName(displayName, normalized),
          createdAt: now(),
        };
        try {
          db.transaction(() => {
            db.run(
              `INSERT INTO users (id, email, password_hash, role, display_name, created_at)
               VALUES (?, ?, ?, ?, ?, ?)`,
              [user.id, user.email, passwordHash, user.role, user.displayName, user.createdAt],
            );
          });
        } catch (error) {
          if (String(error && error.message).includes("UNIQUE")) return { ok: false, error: "exists" };
          throw error;
        }
        return { ok: true, user: publicUser(getUserById(user.id)) };
      });
    },

    verifyLogin({ email, password }) {
      return withLock(async () => {
        const normalized = normalizeEmail(email);
        const row = normalized ? getUserByEmail(normalized) : null;
        const hash = row ? row.password_hash : await dummy();
        const match = await verifyPassword(String(password ?? ""), hash);
        if (!row || !match) return null;
        return publicUser(row);
      });
    },

    createSession(userId) {
      return withLock(async () => {
        const token = newToken();
        const csrf = newToken();
        const createdAt = now();
        const expiresAt = createdAt + SESSION_TTL_MS;
        db.transaction(() => {
          db.run("DELETE FROM sessions WHERE expires_at <= ?", [createdAt]);
          db.run(
            `INSERT INTO sessions (token_hash, user_id, csrf_secret, created_at, expires_at)
             VALUES (?, ?, ?, ?, ?)`,
            [tokenHash(token), userId, csrf, createdAt, expiresAt],
          );
        });
        return { token, csrf, expiresAt };
      });
    },

    readSession(token) {
      return withLock(async () => {
        if (!token || typeof token !== "string") return null;
        const row = db.get(
          `SELECT sessions.csrf_secret AS csrf_secret,
                  sessions.expires_at AS expires_at,
                  users.id AS id,
                  users.email AS email,
                  users.role AS role,
                  users.display_name AS display_name,
                  users.created_at AS created_at
           FROM sessions JOIN users ON users.id = sessions.user_id
           WHERE sessions.token_hash = ?`,
          [tokenHash(token)],
        );
        if (!row) return null;
        if (Number(row.expires_at) <= now()) {
          db.transaction(() => {
            db.run("DELETE FROM sessions WHERE token_hash = ?", [tokenHash(token)]);
          });
          return null;
        }
        return {
          csrf: row.csrf_secret,
          expiresAt: Number(row.expires_at),
          user: publicUser(row),
        };
      });
    },

    destroySession(token) {
      return withLock(async () => {
        if (!token) return;
        db.transaction(() => {
          db.run("DELETE FROM sessions WHERE token_hash = ?", [tokenHash(token)]);
        });
      });
    },

    updateDisplayName({ userId, displayName }) {
      return withLock(async () => {
        const row = getUserById(userId);
        if (!row) return { ok: false, error: "missing" };
        const name = cleanDisplayName(displayName, row.email);
        db.transaction(() => {
          db.run("UPDATE users SET display_name = ? WHERE id = ?", [name, userId]);
        });
        return { ok: true, user: publicUser(getUserById(userId)) };
      });
    },

    changePassword({ userId, currentPassword, newPassword, keepToken }) {
      return withLock(async () => {
        const row = getUserById(userId);
        if (!row) return { ok: false, error: "missing" };
        if (!validatePassword(newPassword)) return { ok: false, error: "invalid" };
        const match = await verifyPassword(String(currentPassword ?? ""), row.password_hash);
        if (!match) return { ok: false, error: "bad-password" };
        const passwordHash = await hashPassword(newPassword, { N: scryptN });
        const keepHash = keepToken ? tokenHash(keepToken) : "";
        db.transaction(() => {
          db.run("UPDATE users SET password_hash = ? WHERE id = ?", [passwordHash, userId]);
          if (keepHash) {
            db.run("DELETE FROM sessions WHERE user_id = ? AND token_hash != ?", [userId, keepHash]);
          } else {
            db.run("DELETE FROM sessions WHERE user_id = ?", [userId]);
          }
        });
        return { ok: true };
      });
    },

    touchPresence(sid, windowMs) {
      return withLock(async () => {
        const seen = now();
        const keepAfter = seen - Math.max(Number(windowMs) * 4, 60 * 60 * 1000);
        db.transaction(() => {
          db.run(
            `INSERT INTO presence (sid_hash, last_seen) VALUES (?, ?)
             ON CONFLICT(sid_hash) DO UPDATE SET last_seen = excluded.last_seen`,
            [sha256(sid), seen],
          );
          db.run("DELETE FROM presence WHERE last_seen < ?", [keepAfter]);
        });
      });
    },

    countPresence(windowMs) {
      return withLock(async () => {
        const cutoff = now() - Number(windowMs);
        const row = db.get("SELECT COUNT(*) AS n FROM presence WHERE last_seen >= ?", [cutoff]);
        return Number(row?.n || 0);
      });
    },

    promote(email) {
      return withLock(async () => {
        const normalized = normalizeEmail(email);
        const row = normalized ? getUserByEmail(normalized) : null;
        if (!row) return { ok: false, error: "missing" };
        if (row.role !== "admin") {
          db.transaction(() => {
            db.run("UPDATE users SET role = 'admin' WHERE id = ?", [row.id]);
          });
        }
        return { ok: true, user: publicUser(getUserById(row.id)) };
      });
    },

    deleteUser(email) {
      return withLock(async () => {
        const normalized = normalizeEmail(email);
        const row = normalized ? getUserByEmail(normalized) : null;
        if (!row) return { ok: false, error: "missing" };
        db.transaction(() => {
          db.run("DELETE FROM sessions WHERE user_id = ?", [row.id]);
          db.run("DELETE FROM users WHERE id = ?", [row.id]);
        });
        return { ok: true };
      });
    },

    listUsers() {
      return withLock(async () => {
        return db
          .all("SELECT id, email, role, display_name, created_at FROM users ORDER BY created_at ASC")
          .map(publicUser);
      });
    },

    countUsers() {
      return withLock(async () => {
        const row = db.get("SELECT COUNT(*) AS n FROM users");
        return Number(row?.n || 0);
      });
    },

    close() {
      return withLock(async () => {
        db.close();
      });
    },
  };
}
