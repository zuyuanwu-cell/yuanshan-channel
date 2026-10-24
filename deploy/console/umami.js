import { shanghaiStartOfDay } from "./time.js";

const DAY_MS = 24 * 60 * 60 * 1000;

export function describeUmami(umami) {
  if (!umami || !umami.configured) {
    return "未配置 Umami API。访问量显示为占位，在线人数仍来自本站心跳。";
  }
  if (umami.reason === "bad-url") {
    return "Umami 地址无效。请检查服务器上的 UMAMI_API_URL。";
  }
  if (!umami.ok) {
    return "暂时连不上 Umami。在线人数仍会更新。";
  }
  return "访问量来自自建 Umami。今天从 Asia/Shanghai 0 点起算，7 天和 30 天是滚动窗口。";
}

export function readCount(value) {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.round(value));
  if (value && typeof value === "object" && typeof value.value === "number" && Number.isFinite(value.value)) {
    return Math.max(0, Math.round(value.value));
  }
  return null;
}

function safeBase(apiUrl) {
  try {
    const url = new URL(apiUrl);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return apiUrl.replace(/\/$/, "");
  } catch {
    return "";
  }
}

function jwtExpiryMs(token) {
  const parts = String(token || "").split(".");
  if (parts.length < 2) return 0;
  try {
    const padded = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const json = JSON.parse(Buffer.from(padded + pad, "base64").toString("utf8"));
    return typeof json.exp === "number" ? json.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

function normalizeStats(json) {
  return {
    pageviews: readCount(json && json.pageviews),
    visitors: readCount(json && json.visitors),
    visits: readCount(json && json.visits),
    bounces: readCount(json && json.bounces),
  };
}

export function createUmamiClient({
  apiUrl = "",
  websiteId = "",
  apiToken = "",
  username = "",
  password = "",
  request,
  now = () => Date.now(),
  cacheMs = 60_000,
} = {}) {
  let sessionToken = "";
  let sessionExp = 0;
  let pendingLogin = null;
  let cache = null;

  function configured() {
    return Boolean(safeBase(apiUrl) && websiteId && (apiToken || (username && password)));
  }

  function finish(payload) {
    return { ...payload, message: describeUmami(payload) };
  }

  async function doLogin() {
    const base = safeBase(apiUrl);
    const res = await request(`${base}/api/auth/login`, {
      method: "POST",
      body: { username, password },
    });
    if (!res || res.status !== 200 || !res.json || !res.json.token) {
      throw new Error("umami-auth");
    }
    sessionToken = String(res.json.token);
    const exp = jwtExpiryMs(sessionToken);
    sessionExp = exp > now() ? exp : now() + 30 * 60 * 1000;
  }

  function login() {
    if (!pendingLogin) {
      pendingLogin = doLogin().finally(() => {
        pendingLogin = null;
      });
    }
    return pendingLogin;
  }

  async function authorization() {
    if (apiToken) return `Bearer ${apiToken}`;
    if (!sessionToken || now() >= sessionExp - 60_000) await login();
    return `Bearer ${sessionToken}`;
  }

  async function statsRange(startAt, endAt, retried) {
    const base = safeBase(apiUrl);
    const headers = {
      Authorization: await authorization(),
      Accept: "application/json",
    };
    const res = await request(
      `${base}/api/websites/${encodeURIComponent(websiteId)}/stats?startAt=${startAt}&endAt=${endAt}`,
      { method: "GET", headers },
    );
    if (res && res.status === 401 && !apiToken && !retried) {
      sessionToken = "";
      sessionExp = 0;
      return statsRange(startAt, endAt, true);
    }
    if (!res || res.status !== 200 || !res.json) throw new Error("umami-stats");
    return normalizeStats(res.json);
  }

  return {
    configured,
    async overview(at = now()) {
      if (!apiUrl && !websiteId && !apiToken && !username) {
        return finish({ configured: false, ok: false, reason: "unconfigured" });
      }
      if (!configured()) {
        if (apiUrl && !safeBase(apiUrl)) return finish({ configured: true, ok: false, reason: "bad-url" });
        return finish({ configured: false, ok: false, reason: "unconfigured" });
      }
      if (cache && at - cache.at < cacheMs) return cache.value;
      const endAt = at;
      const todayStart = Math.min(shanghaiStartOfDay(at), endAt);
      try {
        const [today, d7, d30] = await Promise.all([
          statsRange(todayStart, endAt, false),
          statsRange(endAt - 7 * DAY_MS, endAt, false),
          statsRange(endAt - 30 * DAY_MS, endAt, false),
        ]);
        const value = finish({
          configured: true,
          ok: true,
          timezone: "Asia/Shanghai",
          ranges: { today, d7, d30 },
        });
        cache = { at, value };
        return value;
      } catch {
        return finish({ configured: true, ok: false, reason: "unreachable" });
      }
    },
  };
}
