#!/usr/bin/env node
/**
 * Yuanshan Channel MCP — read-only tools over the same /v1 JSON the site builds.
 * Stdio transport. No HTML scraping. No write tools. No API key in V1.
 *
 *   YUANSHAN_API_BASE=https://ys.tongzhoukuajing.com node mcp/server.mjs
 *   YUANSHAN_V1_DIR=./dist node mcp/server.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { stdin, stdout } from 'node:process';
import { assertScopedRead, filterFeedItems } from '../src/lib/feed-filter.mjs';

const SERVER = { name: 'yuanshan-channel', version: '0.1.0' };
const PROTOCOLS = new Set(['2024-11-05', '2025-03-26', '2025-06-18']);

function apiBase() {
  return (process.env.YUANSHAN_API_BASE || 'https://ys.tongzhoukuajing.com').replace(/\/$/, '');
}

function asList(value) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === 'string' && value.trim()) return value.split(/[,+]/);
  return [];
}

function clampLimit(value) {
  const n = Number(value ?? 20);
  if (!Number.isFinite(n)) return 20;
  return Math.min(100, Math.max(1, Math.floor(n)));
}

function safeSegment(value, label) {
  const text = String(value ?? '').trim().toLowerCase();
  if (!/^[a-z0-9-]+$/.test(text)) throw new Error(`${label} 无效`);
  return text;
}

async function loadJson(pathname) {
  const local = process.env.YUANSHAN_V1_DIR;
  if (local) {
    const root = path.resolve(local);
    const full = path.resolve(root, pathname.replace(/^\//, ''));
    if (full !== root && !full.startsWith(root + path.sep)) throw new Error('路径越界');
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  }
  const response = await fetch(`${apiBase()}${pathname}`);
  if (!response.ok) throw new Error(`${response.status} ${pathname}`);
  return response.json();
}

const tools = [
  {
    name: 'list_markets',
    description:
      'List Yuanshan markets. Ids are compliance country codes (us, eu, sg, …) with Chinese names and regions. Optional region filter: Chinese name (东南亚) or slug (southeast-asia).',
    inputSchema: {
      type: 'object',
      properties: {
        region: { type: 'string', description: 'Chinese region name or region slug. Omit for all markets.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_compliance',
    description: 'Compliance snapshot for one market id: summary, steps, and checklist items from content/compliance. Not legal advice.',
    inputSchema: {
      type: 'object',
      properties: {
        market: { type: 'string', description: 'Compliance country id, for example us or sg.' },
      },
      required: ['market'],
      additionalProperties: false,
    },
  },
  {
    name: 'search_updates',
    description:
      'Search published news and ranking updates. Requires markets, since (YYYY-MM-DD), query, or a narrowed types list (rules, regulation, rankings). Does not return the unfiltered index. Reads /v1/updates.json and applies the same filter as the site.',
    inputSchema: {
      type: 'object',
      properties: {
        markets: {
          description: 'Market ids. Array or comma-separated string.',
          anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'string' }],
        },
        types: {
          description: 'Subset of rules, regulation, rankings. Array or comma-separated string.',
          anyOf: [{ type: 'array', items: { type: 'string' } }, { type: 'string' }],
        },
        since: { type: 'string', description: 'YYYY-MM-DD inclusive.' },
        query: { type: 'string', description: 'Case-insensitive match on title, summary, and news body text.' },
        include_global: {
          type: 'boolean',
          description: 'When markets is set, also include GL ranking boards (Temu, AliExpress). Default false.',
        },
        limit: { type: 'integer', minimum: 1, maximum: 100, description: 'Default 20, max 100.' },
      },
      additionalProperties: false,
    },
  },
  {
    name: 'get_ranking',
    description: 'Latest beauty ranking for a board id (amazon-us, shopee-id, …), or a dated snapshot. Product rows come from the generated JSON, not from HTML.',
    inputSchema: {
      type: 'object',
      properties: {
        board: { type: 'string', description: 'Ranking board id from /v1/rankings.json.' },
        date: { type: 'string', description: 'Optional YYYY-MM-DD. Omit for the latest snapshot.' },
      },
      required: ['board'],
      additionalProperties: false,
    },
  },
];

async function callTool(name, args) {
  const input = args ?? {};
  if (name === 'list_markets') {
    const doc = await loadJson('/v1/markets.json');
    let markets = doc.markets ?? [];
    if (input.region) {
      const region = String(input.region).trim();
      markets = markets.filter((market) => market.region === region || market.region_slug === region);
    }
    return { access: doc.access, count: markets.length, markets };
  }
  if (name === 'get_compliance') {
    const market = safeSegment(input.market, 'market');
    return loadJson(`/v1/markets/${market}/compliance.json`);
  }
  if (name === 'search_updates') {
    const scoped = assertScopedRead({
      markets: asList(input.markets),
      types: asList(input.types),
      since: input.since ? String(input.since) : '',
      query: input.query ? String(input.query) : '',
    });
    const index = await loadJson('/v1/updates.json');
    const matched = filterFeedItems(index.items ?? [], {
      markets: scoped.markets,
      types: scoped.types,
      since: scoped.since,
      query: scoped.query,
      includeGlobal: input.include_global === true,
    });
    const limit = clampLimit(input.limit);
    const items = matched.slice(0, limit);
    return {
      access: 'public-read',
      auth: null,
      disclaimer: index.disclaimer ?? null,
      filter: { ...scoped, include_global: input.include_global === true },
      matched: matched.length,
      returned: items.length,
      truncated: matched.length > items.length,
      items,
    };
  }
  if (name === 'get_ranking') {
    const board = safeSegment(input.board, 'board');
    if (input.date) {
      const date = String(input.date).trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('date 须为 YYYY-MM-DD');
      return loadJson(`/v1/rankings/${board}/${date}.json`);
    }
    return loadJson(`/v1/rankings/${board}.json`);
  }
  throw new Error(`未知工具 ${name}`);
}

function send(message) {
  const json = JSON.stringify(message);
  stdout.write(`Content-Length: ${Buffer.byteLength(json)}\r\n\r\n${json}`);
}

function respond(id, result) {
  send({ jsonrpc: '2.0', id, result });
}

function fail(id, message) {
  respond(id, {
    content: [{ type: 'text', text: message }],
    isError: true,
  });
}

async function handle(message) {
  if (!message || message.jsonrpc !== '2.0') return;
  const { id, method, params } = message;
  if (id === undefined) return;
  try {
    if (method === 'initialize') {
      const requested = params?.protocolVersion;
      respond(id, {
        protocolVersion: PROTOCOLS.has(requested) ? requested : '2024-11-05',
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER,
        instructions:
          'Read-only public feeds for 同舟跨境·远山频道. Pass markets or another filter to search_updates. Not legal advice. V1 does not use an API key.',
      });
      return;
    }
    if (method === 'ping') {
      respond(id, {});
      return;
    }
    if (method === 'tools/list') {
      respond(id, { tools });
      return;
    }
    if (method === 'tools/call') {
      const name = params?.name;
      const args = params?.arguments ?? {};
      try {
        const data = await callTool(name, args);
        respond(id, { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] });
      } catch (error) {
        fail(id, error instanceof Error ? error.message : String(error));
      }
      return;
    }
    send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
  } catch (error) {
    send({
      jsonrpc: '2.0',
      id,
      error: { code: -32603, message: error instanceof Error ? error.message : String(error) },
    });
  }
}

let buffer = Buffer.alloc(0);
stdin.on('data', (chunk) => {
  buffer = Buffer.concat([buffer, chunk]);
  for (;;) {
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) return;
    const header = buffer.slice(0, headerEnd).toString('utf8');
    const match = /Content-Length:\s*(\d+)/i.exec(header);
    if (!match) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }
    const length = Number(match[1]);
    const start = headerEnd + 4;
    if (buffer.length < start + length) return;
    const body = buffer.slice(start, start + length).toString('utf8');
    buffer = buffer.slice(start + length);
    try {
      handle(JSON.parse(body));
    } catch (error) {
      send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: error instanceof Error ? error.message : 'parse error' } });
    }
  }
});
