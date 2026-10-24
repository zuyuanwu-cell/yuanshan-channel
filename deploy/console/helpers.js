import http from "node:http";
import { createServer } from "node:http";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { DEFAULT_LIMITS } from "./config.js";
import { createApp } from "./server.js";

export function form(fields) {
  return new URLSearchParams(fields).toString();
}

export function csrfFrom(html) {
  const match = html.match(/name="_csrf" value="([a-f0-9]{64})"/);
  return match ? match[1] : "";
}

export function updateJar(jar, setCookie) {
  const list = !setCookie ? [] : Array.isArray(setCookie) ? setCookie : [setCookie];
  for (const line of list) {
    const [pair] = line.split(";");
    const idx = pair.indexOf("=");
    if (idx < 0) continue;
    const name = pair.slice(0, idx).trim();
    const raw = pair.slice(idx + 1).trim();
    let value = raw;
    try {
      value = decodeURIComponent(raw);
    } catch {
      value = raw;
    }
    if (/max-age=0/i.test(line) || value === "") delete jar[name];
    else jar[name] = value;
  }
}

export function request(base, { method = "GET", path: pathname, headers = {}, body = null, jar = {} } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(pathname, base);
    const payload = body == null ? null : Buffer.from(body);
    const cookie = Object.entries(jar)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("; ");
    const req = http.request(
      {
        hostname: url.hostname,
        port: url.port,
        path: `${url.pathname}${url.search}`,
        method,
        headers: {
          Origin: base,
          ...(cookie ? { Cookie: cookie } : {}),
          ...(payload
            ? {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": String(payload.length),
              }
            : {}),
          ...headers,
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

export async function launch(overrides = {}) {
  const dir = mkdtempSync(path.join(tmpdir(), "ys-console-"));
  const { clock: givenClock, ...rest } = overrides;
  const clock = givenClock || { t: Date.parse("2026-10-24T02:30:00Z") };
  const started = await createApp({
    host: "127.0.0.1",
    port: 0,
    basePath: "/console",
    sessionSecret: "test-session-secret-0123456789abcdef",
    dataFile: path.join(dir, "console.sqlite"),
    cookieSecure: "0",
    onlineWindowMs: 180_000,
    trustedOrigins: ["https://ys.tongzhoukuajing.com", "http://127.0.0.1:4477", "http://localhost:4477"],
    umamiApiUrl: "",
    umamiWebsiteId: "",
    umamiApiToken: "",
    umamiUsername: "",
    umamiPassword: "",
    adminEmail: "",
    adminPassword: "",
    adminReset: false,
    nodeEnv: "test",
    scryptN: 1024,
    limits: DEFAULT_LIMITS,
    now: () => clock.t,
    ...rest,
  });
  const server = createServer(started.app);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;
  return {
    base,
    clock,
    store: started.store,
    async close() {
      await new Promise((resolve) => server.close(resolve));
      await started.close();
      rmSync(dir, { recursive: true, force: true });
    },
  };
}
