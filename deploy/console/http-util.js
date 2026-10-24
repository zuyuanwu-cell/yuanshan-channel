function headerOne(value) {
  if (typeof value !== "string") return "";
  return value.split(",")[0].trim();
}

export function isLoopback(req) {
  const addr = req.socket?.remoteAddress || "";
  return addr === "127.0.0.1" || addr === "::1" || addr === "::ffff:127.0.0.1";
}

export function clientIp(req) {
  if (isLoopback(req)) {
    const real = headerOne(req.headers["x-real-ip"]);
    if (real) return real.slice(0, 64);
    const forwarded = headerOne(req.headers["x-forwarded-for"]);
    if (forwarded) return forwarded.slice(0, 64);
  }
  return (req.socket && req.socket.remoteAddress) || "unknown";
}

export function requestHost(req) {
  if (isLoopback(req)) {
    const forwarded = headerOne(req.headers["x-forwarded-host"]);
    if (forwarded) return forwarded.toLowerCase();
  }
  return headerOne(req.headers.host).toLowerCase();
}

export function requestIsHttps(req) {
  if (isLoopback(req)) {
    const proto = headerOne(req.headers["x-forwarded-proto"]).toLowerCase();
    if (proto) return proto === "https";
  }
  return req.secure === true;
}

function hostsMatch(originValue, hostHeader) {
  let url;
  try {
    url = new URL(originValue);
  } catch {
    return false;
  }
  const host = String(hostHeader || "").toLowerCase();
  return url.host.toLowerCase() === host;
}

export function originAllowed(req, { trustedOrigins = [], allowLocalhost = false } = {}) {
  const origin = headerOne(req.headers.origin);
  let candidate = origin;
  if (!candidate && typeof req.headers.referer === "string") {
    try {
      candidate = new URL(req.headers.referer).origin;
    } catch {
      candidate = "";
    }
  }
  if (!candidate || candidate === "null") return false;
  let url;
  try {
    url = new URL(candidate);
  } catch {
    return false;
  }
  if (hostsMatch(candidate, requestHost(req))) return true;
  if (trustedOrigins.includes(url.origin)) return true;
  if (allowLocalhost && (url.hostname === "localhost" || url.hostname === "127.0.0.1")) return true;
  return false;
}

export function readCookies(req) {
  const header = req.headers.cookie;
  const out = {};
  if (!header || typeof header !== "string") return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    if (!key) continue;
    const raw = part.slice(idx + 1).trim();
    try {
      out[key] = decodeURIComponent(raw);
    } catch {
      out[key] = raw;
    }
  }
  return out;
}

export function writeCookie(res, { name, value, path, maxAge, secure, httpOnly }) {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${path}`, "SameSite=Lax"];
  if (typeof maxAge === "number") parts.push(`Max-Age=${Math.max(0, Math.floor(maxAge))}`);
  if (httpOnly) parts.push("HttpOnly");
  if (secure) parts.push("Secure");
  const line = parts.join("; ");
  const existing = res.getHeader("Set-Cookie");
  if (!existing) res.setHeader("Set-Cookie", line);
  else if (Array.isArray(existing)) res.setHeader("Set-Cookie", existing.concat(line));
  else res.setHeader("Set-Cookie", [existing, line]);
}

export function isApi(req) {
  const pathOnly = String(req.originalUrl || req.url || req.path || "").split("?")[0];
  return pathOnly.includes("/api/");
}
