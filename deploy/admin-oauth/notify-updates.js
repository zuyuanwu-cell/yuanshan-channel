#!/usr/bin/env node
/**
 * Post new /v1/updates.json items to the WeCom group robot.
 *
 *   WECOM_WEBHOOK_URL=... node notify-updates.js \
 *     --index /www/wwwroot/ys.tongzhoukuajing.com/v1/updates.json \
 *     --state /var/lib/yuanshan/wecom-seen.json
 *
 * The first run only records the current ids and does not send.
 * Webhook URL comes from WECOM_WEBHOOK_URL, or YUANSHAN_WECOM_WEBHOOK_URL if that is empty.
 * Never pass the URL as an argument. This script does not print it.
 */
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolveWebhook } from './contact.js';

const TYPES = ['rules', 'regulation', 'rankings'];
const TYPE_LABELS = { rules: '平台规则', regulation: '市场法规', rankings: '热销榜' };

function sortItems(items) {
  return [...items].sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
}

export function filterIndexItems(items, filter = {}) {
  const markets = [...new Set((filter.markets ?? []).map((id) => String(id).trim().toLowerCase()).filter(Boolean))].sort();
  const types = TYPES.filter((type) => (filter.types ?? []).includes(type));
  const since = filter.since ?? '';
  const matched = items.filter((item) => {
    if (types.length > 0 && !types.includes(item.type)) return false;
    if (since && item.date < since) return false;
    if (markets.length > 0) {
      if (item.scope === 'global') return filter.includeGlobal === true;
      if (!(item.markets ?? []).some((id) => markets.includes(id))) return false;
    }
    return true;
  });
  return sortItems(matched);
}

export function unseenItems(items, seen) {
  const known = new Set(seen);
  return items.filter((item) => item && typeof item.id === 'string' && !known.has(item.id));
}

export function renderUpdateMarkdown(items, extraCount) {
  const lines = ['**远山频道 · 内容更新**'];
  for (const item of items) {
    const type = TYPE_LABELS[item.type] || item.type || '';
    const markets = (item.markets ?? []).join('、') || (item.scope === 'global' ? '全球' : '');
    lines.push(`> ${item.date || ''} · ${type}${markets ? ` · ${markets}` : ''}`);
    lines.push(`> ${String(item.title || '').replace(/\s+/g, ' ').slice(0, 80)}`);
  }
  if (extraCount > 0) lines.push(`> 还有 ${extraCount} 条，见站点 /subscribe/`);
  lines.push('> 公开已发布内容，不是法律意见。');
  return lines.join('\n');
}

function readArgs(argv) {
  const args = { index: '', state: '', markets: [], types: [], since: '', dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];
    if (token === '--index' && next) {
      args.index = next;
      i += 1;
    } else if (token === '--state' && next) {
      args.state = next;
      i += 1;
    } else if (token === '--markets' && next) {
      args.markets = next.split(',').map((id) => id.trim()).filter(Boolean);
      i += 1;
    } else if (token === '--types' && next) {
      args.types = next.split(',').map((id) => id.trim()).filter(Boolean);
      i += 1;
    } else if (token === '--since' && next) {
      args.since = next;
      i += 1;
    } else if (token === '--dry-run') {
      args.dryRun = true;
    }
  }
  return args;
}

export async function runNotify(options) {
  const index = JSON.parse(fs.readFileSync(options.index, 'utf8'));
  const items = filterIndexItems(index.items ?? [], options);
  const ids = items.map((item) => item.id);
  let seen = [];
  if (fs.existsSync(options.state)) {
    const stored = JSON.parse(fs.readFileSync(options.state, 'utf8'));
    seen = Array.isArray(stored.ids) ? stored.ids : [];
  } else {
    fs.mkdirSync(options.stateDir ?? dirnameOf(options.state), { recursive: true });
    fs.writeFileSync(options.state, `${JSON.stringify({ ids }, null, 2)}\n`);
    return { baseline: true, sent: false, fresh: 0 };
  }
  const fresh = unseenItems(items, seen);
  if (fresh.length === 0) return { baseline: false, sent: false, fresh: 0 };
  const shown = fresh.slice(0, 8);
  const markdown = renderUpdateMarkdown(shown, fresh.length - shown.length);
  if (options.dryRun) return { baseline: false, sent: false, fresh: fresh.length, markdown };
  const webhook = resolveWebhook(options.webhookUrl ?? '');
  if (webhook.state === 'empty') return { baseline: false, sent: false, fresh: fresh.length, skipped: 'unconfigured' };
  if (webhook.state !== 'ok') return { baseline: false, sent: false, fresh: fresh.length, skipped: 'misconfigured' };
  const response = await (options.fetchImpl ?? globalThis.fetch)(webhook.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ msgtype: 'markdown', markdown: { content: markdown } }),
    signal: AbortSignal.timeout(options.timeoutMs ?? 8000),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || (typeof data.errcode === 'number' && data.errcode !== 0)) {
    throw new Error('wecom upstream failed');
  }
  const merged = [...new Set([...seen, ...ids])];
  fs.writeFileSync(options.state, `${JSON.stringify({ ids: merged }, null, 2)}\n`);
  return { baseline: false, sent: true, fresh: fresh.length };
}

function dirnameOf(file) {
  const index = file.lastIndexOf('/');
  return index <= 0 ? '.' : file.slice(0, index);
}

async function main() {
  const args = readArgs(process.argv.slice(2));
  if (!args.index || !args.state) {
    console.error('用法: node notify-updates.js --index <updates.json> --state <seen.json> [--markets us,sg] [--types rules] [--dry-run]');
    process.exit(2);
  }
  const webhookUrl = String(process.env.WECOM_WEBHOOK_URL || process.env.YUANSHAN_WECOM_WEBHOOK_URL || '').trim();
  try {
    const result = await runNotify({ ...args, webhookUrl });
    if (result.baseline) console.log('已记下当前条目，这次不发送。');
    else if (result.skipped === 'unconfigured') console.log('未配置 WECOM_WEBHOOK_URL，跳过发送。');
    else if (result.dryRun || args.dryRun) console.log(result.markdown || '没有新条目。');
    else if (result.sent) console.log(`已发送 ${result.fresh} 条。`);
    else console.log('没有新条目。');
  } catch (error) {
    console.error(error instanceof Error ? error.message : '发送失败');
    process.exit(1);
  }
}

const entry = process.argv[1];
if (entry && import.meta.url === pathToFileURL(entry).href) {
  main();
}
