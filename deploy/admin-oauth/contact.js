/**
 * POST /api/contact → 企业微信群机器人。
 * Webhook 只来自环境变量，不从请求体读取，避免浏览器直连 qyapi。
 */

const NAME_MAX = 40;
const CONTACT_MAX = 80;
const MESSAGE_MAX = 500;
const PAGE_MAX = 500;

export function formatShanghai(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type) => parts.find((part) => part.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`;
}

export function plainField(value, max) {
  return String(value)
    .replace(/[<>]/g, (char) => (char === '<' ? '＜' : '＞'))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

export function pageLabel(page) {
  if (typeof page !== 'string') return '（未提供）';
  const value = page.trim();
  if (!/^https?:\/\/\S+$/.test(value) || value.length > PAGE_MAX) return '（未提供）';
  return plainField(value, PAGE_MAX);
}

export function buildWecomBody({ name, contact, message, page, at }) {
  const content = [
    '**远山频道 · 洽谈合作**',
    `>姓名：${plainField(name, NAME_MAX)}`,
    `>联系方式：${plainField(contact, CONTACT_MAX)}`,
    `>留言：${plainField(message, MESSAGE_MAX)}`,
    `>页面：${pageLabel(page)}`,
    `>时间：${formatShanghai(at)}（Asia/Shanghai）`,
  ].join('\n');
  return { msgtype: 'markdown', markdown: { content } };
}

export function resolveWebhook(raw) {
  const value = String(raw ?? '').trim();
  if (!value) return { state: 'empty' };
  let url;
  try {
    url = new URL(value);
  } catch {
    return { state: 'bad' };
  }
  if (url.protocol !== 'https:') return { state: 'bad' };
  return { state: 'ok', url: value };
}

function clientIp(req) {
  const real = req.headers?.['x-real-ip'];
  if (typeof real === 'string' && real.trim()) return real.trim().slice(0, 80);
  return req.socket?.remoteAddress || 'unknown';
}

function readSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { ok: false };
  const trap = typeof body.ys_leave_blank === 'string' ? body.ys_leave_blank.trim() : '';
  if (trap) return { ok: true, honeypot: true };
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const contact = typeof body.contact === 'string' ? body.contact.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!name || name.length > NAME_MAX) return { ok: false };
  if (!contact || contact.length > CONTACT_MAX) return { ok: false };
  if (!message || message.length > MESSAGE_MAX) return { ok: false };
  return { ok: true, value: { name, contact, message, page: body.page } };
}

function isLimited(hits, ip, at, windowMs, max) {
  const cutoff = at - windowMs;
  let bucket = hits.get(ip) ?? [];
  bucket = bucket.filter((stamp) => stamp > cutoff);
  if (hits.size > 2000) {
    for (const [key, stamps] of hits) {
      if (stamps.every((stamp) => stamp <= cutoff)) hits.delete(key);
    }
  }
  if (bucket.length >= max) {
    hits.set(ip, bucket);
    return true;
  }
  bucket.push(at);
  hits.set(ip, bucket);
  return false;
}

export function createContactHandler(options = {}) {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const now = options.now ?? (() => new Date());
  const windowMs = options.windowMs ?? 10 * 60 * 1000;
  const maxPerWindow = options.maxPerWindow ?? 8;
  const timeoutMs = options.timeoutMs ?? 8000;
  const hits = new Map();

  const webhookSource = () =>
    options.webhookUrl !== undefined ? options.webhookUrl : (process.env.WECOM_WEBHOOK_URL ?? '');

  return async function contactHandler(req, res) {
    const ip = clientIp(req);
    if (isLimited(hits, ip, now().getTime(), windowMs, maxPerWindow)) {
      res.status(429).json({ ok: false, error: 'rate_limited' });
      return;
    }

    const parsed = readSubmission(req.body);
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

    const payload = buildWecomBody({ ...parsed.value, at: now() });
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
