import fs from "node:fs";
import path from "node:path";
import { isEmail } from "./passwords.js";

export const DEFAULT_LIMITS = {
  register: { limit: 5, windowMs: 60 * 60 * 1000 },
  loginIp: { limit: 10, windowMs: 15 * 60 * 1000 },
  loginEmail: { limit: 10, windowMs: 15 * 60 * 1000 },
  presenceIp: { limit: 120, windowMs: 60 * 1000 },
};

const DEV_ORIGINS = ["http://127.0.0.1:4477", "http://localhost:4477"];

export function loadEnvFile(file) {
  if (!file || !fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

export function normalizeBase(raw) {
  let value = String(raw || "/console").trim() || "/console";
  if (!value.startsWith("/")) value = `/${value}`;
  value = value.replace(/\/+$/, "") || "/";
  if (value === "/") return "/";
  if (value.includes("//") || value.includes("..") || !/^\/[A-Za-z0-9/_-]+$/.test(value)) {
    throw new Error("CONSOLE_BASE_PATH is invalid");
  }
  return value;
}

export function joinBase(base, suffix) {
  const pathSuffix = suffix.startsWith("/") ? suffix : `/${suffix}`;
  if (base === "/") return pathSuffix;
  if (pathSuffix === "/") return `${base}/`;
  return `${base}${pathSuffix}`;
}

function clampWindow(raw) {
  const parsed = Number(raw);
  let value = Number.isFinite(parsed) && parsed > 0 ? parsed : 180000;
  if (value < 120000) value = 120000;
  if (value > 300000) value = 300000;
  return value;
}

function parseOrigins(raw) {
  const text = String(raw ?? "").trim();
  const fromEnv = (text ? text.split(",") : ["https://ys.tongzhoukuajing.com"])
    .map((item) => item.trim())
    .filter(Boolean);
  return [...new Set([...fromEnv, ...DEV_ORIGINS])];
}

export function readConfig(env = process.env) {
  const cookie = String(env.CONSOLE_COOKIE_SECURE || "auto").trim();
  const port = Number(env.CONSOLE_PORT || 4182);
  return {
    host: String(env.CONSOLE_HOST || "127.0.0.1").trim() || "127.0.0.1",
    port: Number.isInteger(port) && port > 0 && port < 65536 ? port : 4182,
    basePath: normalizeBase(env.CONSOLE_BASE_PATH || "/console"),
    sessionSecret: String(env.CONSOLE_SESSION_SECRET || ""),
    dataFile:
      String(env.CONSOLE_DATA_FILE || "").trim() ||
      path.join(process.cwd(), "data", "console.sqlite"),
    cookieSecure: cookie === "1" || cookie === "0" ? cookie : "auto",
    onlineWindowMs: clampWindow(env.CONSOLE_ONLINE_WINDOW_MS),
    trustedOrigins: parseOrigins(env.TRUSTED_ORIGINS),
    umamiApiUrl: String(env.UMAMI_API_URL || "").trim().replace(/\/$/, ""),
    umamiWebsiteId: String(env.UMAMI_WEBSITE_ID || "").trim(),
    umamiApiToken: String(env.UMAMI_API_TOKEN || "").trim(),
    umamiUsername: String(env.UMAMI_USERNAME || "").trim(),
    umamiPassword: String(env.UMAMI_PASSWORD || ""),
    adminEmail: String(env.CONSOLE_ADMIN_EMAIL || "").trim().toLowerCase(),
    adminPassword: String(env.CONSOLE_ADMIN_PASSWORD || ""),
    adminReset: String(env.CONSOLE_ADMIN_RESET || "") === "1",
    nodeEnv: String(env.NODE_ENV || "development"),
    limits: DEFAULT_LIMITS,
  };
}

export function assertRuntimeConfig(config) {
  if (config.nodeEnv === "production") {
    if (!config.sessionSecret || config.sessionSecret.length < 32) {
      return "Set CONSOLE_SESSION_SECRET to at least 32 characters before starting in production.";
    }
  }
  const emailSet = Boolean(String(config.adminEmail || "").trim());
  const passwordSet = Boolean(config.adminPassword);
  if (emailSet !== passwordSet) {
    return "Set CONSOLE_ADMIN_EMAIL and CONSOLE_ADMIN_PASSWORD together, or leave both empty.";
  }
  if (passwordSet && config.adminPassword.length < 10) {
    return "CONSOLE_ADMIN_PASSWORD must be at least 10 characters.";
  }
  if (emailSet && !isEmail(config.adminEmail)) {
    return "CONSOLE_ADMIN_EMAIL is not a valid email.";
  }
  return "";
}
