import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const SCRYPT_MAXMEM = 48 * 1024 * 1024;

export function isEmail(value) {
  if (typeof value !== "string") return false;
  const email = value.trim().toLowerCase();
  if (email.length < 6 || email.length > 254) return false;
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(email);
}

export function normalizeEmail(value) {
  const email = String(value ?? "").trim().toLowerCase();
  return isEmail(email) ? email : "";
}

export function validatePassword(password) {
  if (typeof password !== "string") return false;
  if (password.length < 10 || password.length > 128) return false;
  if (password.includes("\0")) return false;
  return true;
}

export function cleanDisplayName(value, email) {
  const cleaned = squashName(value);
  if (cleaned) return cleaned;
  const local = String(email || "").split("@")[0] || "访客";
  return squashName(local) || "访客";
}

function squashName(value) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function b64urlDecode(value) {
  const padded = String(value).replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return Buffer.from(padded + pad, "base64");
}

function scryptOptions(N) {
  return { N, r: 8, p: 1, maxmem: SCRYPT_MAXMEM };
}

export async function hashPassword(password, { N = 16384 } = {}) {
  if (!validatePassword(password)) throw new Error("invalid-password");
  if (!Number.isInteger(N) || N < 1024 || N > 32768 || (N & (N - 1)) !== 0) {
    throw new Error("invalid-scrypt-n");
  }
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 32, scryptOptions(N));
  return `scrypt$${N}$8$1$${b64url(salt)}$${b64url(hash)}`;
}

export async function verifyPassword(password, encoded) {
  try {
    if (typeof password !== "string" || password.length > 128) return false;
    const parts = String(encoded || "").split("$");
    if (parts.length !== 6 || parts[0] !== "scrypt") return false;
    const N = Number(parts[1]);
    const r = Number(parts[2]);
    const p = Number(parts[3]);
    if (!Number.isInteger(N) || N < 1024 || N > 32768 || (N & (N - 1)) !== 0) return false;
    if (r !== 8 || p !== 1) return false;
    const salt = b64urlDecode(parts[4]);
    const expected = b64urlDecode(parts[5]);
    if (salt.length < 8 || expected.length < 16) return false;
    const actual = await scryptAsync(password, salt, expected.length, scryptOptions(N));
    if (actual.length !== expected.length) return false;
    return timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}
