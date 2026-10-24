/**
 * POST /api/subscribe → 企业微信群机器人。
 * Webhook 只来自环境变量。浏览器只提交市场包，不携带 key。
 */
import { formatShanghai, pageLabel, plainField, resolveWebhook } from './contact.js';

const TYPE_LABELS = {
  rules: '平台规则',
  regulation: '市场法规',
  rankings: '热销榜',
};
const TYPES = ['rules', 'regulation', 'rankings'];
const MAX_MARKETS = 96;

export function webhookFromEnv(env = process.env) {
  const raw = String(env.WECOM_WEBHOOK_URL || env.YUANSHAN_WECOM_WEBHOOK_URL || '').trim();
  return resolveWebhook(raw);
}

export function readPackage(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false };
  const trap = typeof body.ys_leave_blank === 'string' ? body.ys_leave_blank.trim() : '';
  if (trap) return { ok: true, honeypot: true };
  const markets = Array.isArray(body.markets) ? body.markets : [];
  const types = Array.isArray(body.types) ? body.types : [];
  if (markets.length === 0 || markets.length > MAX_MARKETS) return { ok: false };
  const ids = [];
  for (const market of markets) {
    if (typeof market !== 'string' || !/^[a-z]{2}$/.test(market)) return { ok: false };
    if (!ids.includes(market)) ids.push(market);
  }
  ids.sort();
  const picked = TYPES.filter((type) => types.includes(type));
  if (picked.length === 0 || types.some((type) => typeof type !== 'string' || !TYPES.includes(type))) {
    return { ok: false };
  }
  let since = '';
  if (body.since != null && body.since !== '') {
    if (typeof body.since !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.since)) return { ok: false };
    since = body.since;
  }
  return { ok: true, value: { markets: ids, types: picked, since, page: body.page } };
}

export function buildSubscribeBody({ markets, types, since, page, at }) {
  const marketLine = markets.map((id) => plainField(id, 8)).join('、');
  const typeLine = types.map((type) => TYPE_LABELS[type] || plainField(type, 24)).join('、');
  const sinceLine = since ? plainField(since, 10) : '不限';
  const content = [
    '**远山频道 · 市场订阅**',
    `>市场：${marketLine}`,
    `>内容：${typeLine}`,
    `>起始：${sinceLine}`,
    `>页面：${pageLabel(page)}`,
    `>时间：${formatShanghai(at)}（Asia/Shanghai）`,
    '>说明：公开已发布内容的筛选偏好，不是法律意见。',
  ].join('\n');
  return { msgtype: 'markdown', markdown: { content } };
}

function clientIp(req) {
  const real = req.headers?.['x-real-ip'];
  if (typeof real === 'string' && real.trim()) return real.trim().slice(0, 80);
  return req.socket?.remoteAddress || 'unknown';
}

function isLimited(hits, ip, at, windowMs, max) {
  const cutoff = at - windowMs;
  let bucket = hits.get(ip) ?? [];
  bucket = bucket.filter((stamp) => stamp > cutoff);
  if (bucket.length >= max) {
    hits.set(ip, bucket);
    return true;
  }
  bucket.push(at);
  hits.set(ip, bucket);
  return false;
}

export function createSubscribeHandler(options = {}) {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const now = options.now ?? (() => new Date());
  const windowMs = options.windowMs ?? 10 * 60 * 1000;
  const maxPerWindow = options.maxPerWindow ?? 8;
  const timeoutMs = options.timeoutMs ?? 8000;
  const hits = new Map();
  const webhookSource = () =>
    options.webhookUrl !== undefined
      ? options.webhookUrl
      : process.env.WECOM_WEBHOOK_URL || process.env.YUANSHAN_WECOM_WEBHOOK_URL || '';

  return async function subscribeHandler(req, res) {
    const ip = clientIp(req);
    if (isLimited(hits, ip, now().getTime(), windowMs, maxPerWindow)) {
      res.status(429).json({ ok: false, error: 'rate_limited' });
      return;
    }
    const parsed = readPackage(req.body);
    if (!parsed.ok) {
      res.status(400).json({ ok: false, error: 'invalid' });
      return;
    }
    if (parsed.honeypot) {
      res.status(200).json({ ok: true });
      return;
    }
    const webhook = resolveWebhook(webhookSource());
    if (webhook.state === 'empty') {
      res.status(503).json({ ok: false, error: 'unconfigured' });
      return;
    }
    if (webhook.state !== 'ok') {
      res.status(500).json({ ok: false, error: 'misconfigured' });
      return;
    }
    const payload = buildSubscribeBody({ ...parsed.value, at: now() });
    let upstream;
    try {
      upstream = await fetchImpl(webhook.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch {
      res.status(502).json({ ok: false, error: 'upstream' });
      return;
    }
    let data = {};
    try {
      data = await upstream.json();
    } catch {
      data = {};
    }
    if (!upstream.ok || (data && typeof data.errcode === 'number' && data.errcode !== 0)) {
      res.status(502).json({ ok: false, error: 'upstream' });
      return;
    }
    res.status(200).json({ ok: true });
  };
}
