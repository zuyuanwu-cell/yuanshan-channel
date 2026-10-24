import http from "node:http";
import https from "node:https";

/**
 * Tiny JSON client on node:http so the console does not need global fetch
 * (Node 16 on Baota has no fetch unless a polyfill is loaded).
 */
export function requestJson(urlString, { method = "GET", headers = {}, body = null, timeoutMs = 8000 } = {}) {
  const url = new URL(urlString);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return Promise.reject(new Error("unsupported-protocol"));
  }
  const lib = url.protocol === "https:" ? https : http;
  const payload =
    body == null ? null : Buffer.from(typeof body === "string" ? body : JSON.stringify(body));

  return new Promise((resolve, reject) => {
    const req = lib.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === "https:" ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method,
        headers: {
          Accept: "application/json",
          ...(payload
            ? {
                "Content-Type": "application/json",
                "Content-Length": String(payload.length),
              }
            : {}),
          ...headers,
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => {
          chunks.push(chunk);
        });
        res.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          let json = null;
          if (text) {
            try {
              json = JSON.parse(text);
            } catch {
              json = null;
            }
          }
          resolve({ status: res.statusCode || 0, json, text });
        });
      },
    );
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}
