import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { filterFeedItems } from '../../src/lib/feed-filter.mjs';
import { filterIndexItems, renderUpdateMarkdown, runNotify, unseenItems } from './notify-updates.js';

const items = [
  { id: 'a', date: '2026-10-02', type: 'rules', markets: ['us'], title: '美国费用' },
  { id: 'b', date: '2026-10-03', type: 'regulation', markets: ['sg'], title: '新加坡法规' },
  { id: 'c', date: '2026-10-04', type: 'rankings', markets: [], scope: 'global', title: 'Temu' },
];

test('index filter matches the shared feed filter', () => {
  const filter = { markets: ['us'], types: ['rules', 'rankings'], since: '2026-10-01' };
  const local = filterIndexItems(items, filter).map((item) => item.id);
  const shared = filterFeedItems(items, filter).map((item) => item.id);
  assert.deepEqual(local, shared);
  const shuffled = [items[2], items[0], items[1]];
  const both = { markets: ['us', 'sg'], types: ['rules', 'regulation'] };
  assert.deepEqual(
    filterIndexItems(shuffled, both).map((item) => item.id),
    filterFeedItems(shuffled, both).map((item) => item.id),
  );
});

test('unseen items and markdown stay free of secrets', () => {
  assert.deepEqual(unseenItems(items, ['a']).map((item) => item.id), ['b', 'c']);
  const text = renderUpdateMarkdown(items.slice(0, 1), 2);
  assert.match(text, /美国费用/);
  assert.match(text, /还有 2 条/);
  assert.doesNotMatch(text, /qyapi|key=/);
});

test('first run records a baseline and does not post', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ys-wecom-'));
  const index = path.join(dir, 'updates.json');
  const state = path.join(dir, 'seen.json');
  fs.writeFileSync(index, JSON.stringify({ items }));
  let called = false;
  const result = await runNotify({
    index,
    state,
    webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=secret',
    fetchImpl: async () => {
      called = true;
      return { ok: true, json: async () => ({ errcode: 0 }) };
    },
  });
  assert.equal(result.baseline, true);
  assert.equal(called, false);
  assert.deepEqual(JSON.parse(fs.readFileSync(state, 'utf8')).ids, ['c', 'b', 'a']);
});

test('second run posts only new ids and hides the webhook from the result', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ys-wecom-'));
  const index = path.join(dir, 'updates.json');
  const state = path.join(dir, 'seen.json');
  fs.writeFileSync(state, JSON.stringify({ ids: ['a'] }));
  fs.writeFileSync(index, JSON.stringify({ items }));
  let sent;
  const result = await runNotify({
    index,
    state,
    markets: ['sg', 'us'],
    webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=secret',
    fetchImpl: async (url, init) => {
      sent = { url, init };
      return { ok: true, json: async () => ({ errcode: 0 }) };
    },
  });
  assert.equal(result.sent, true);
  assert.equal(JSON.stringify(result).includes('secret'), false);
  const body = JSON.parse(sent.init.body);
  assert.match(body.markdown.content, /新加坡法规/);
  assert.doesNotMatch(body.markdown.content, /美国费用/);
  assert.doesNotMatch(body.markdown.content, /Temu/);
});
