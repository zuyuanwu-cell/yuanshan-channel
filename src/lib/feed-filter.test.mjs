import assert from 'node:assert/strict';
import {
  assertScopedRead,
  comboId,
  filterFeedItems,
  marketsForBoard,
  resolveFeedUrl,
  typeSubsets,
} from './feed-filter.mjs';

const countries = [
  { id: 'us', name_zh: '美国', region: '北美' },
  { id: 'sg', name_zh: '新加坡', region: '东南亚' },
  { id: 'id', name_zh: '印度尼西亚', region: '东南亚' },
  { id: 'ae', name_zh: '阿联酋', region: '中东' },
  { id: 'sa', name_zh: '沙特', region: '中东' },
];

const items = [
  { id: 'a', date: '2026-10-01', type: 'rules', markets: ['us'], scope: undefined, title: '美国费用', summary: '配送费', body_text: '' },
  { id: 'b', date: '2026-10-15', type: 'regulation', markets: ['sg'], title: '新加坡通报', summary: 'HSA', body_text: '成分' },
  { id: 'c', date: '2026-10-20', type: 'rankings', markets: [], scope: 'global', title: 'Temu', summary: '全球', body_text: '' },
  { id: 'd', date: '2026-09-01', type: 'rules', markets: ['us', 'sg'], title: '旧闻', summary: '过期', body_text: '' },
];

const us = filterFeedItems(items, { markets: ['us'], types: ['rules', 'regulation', 'rankings'] });
assert.deepEqual(us.map((item) => item.id), ['a', 'd']);

const withGlobal = filterFeedItems(items, { markets: ['us'], includeGlobal: true });
assert.deepEqual(withGlobal.map((item) => item.id), ['c', 'a', 'd']);

const since = filterFeedItems(items, { markets: ['us', 'sg'], since: '2026-10-01' });
assert.deepEqual(since.map((item) => item.id), ['b', 'a']);

const query = filterFeedItems(items, { query: '成分' });
assert.deepEqual(query.map((item) => item.id), ['b']);

assert.equal(comboId(['rankings', 'rules']), 'rules+rankings');
assert.equal(typeSubsets().length, 7);

const noon = marketsForBoard({ id: 'noon', code: 'AE', market: '阿联酋/沙特' }, countries);
assert.deepEqual(noon, { scope: 'markets', markets: ['ae', 'sa'] });

const indo = marketsForBoard({ id: 'shopee-id', code: 'ID', market: '印尼' }, countries);
assert.deepEqual(indo.markets, ['id']);

const sea = marketsForBoard({ id: 'tiktok-shop-sea', code: 'SEA', market: '东南亚' }, countries);
assert.deepEqual(sea.markets, ['id', 'sg']);

const global = marketsForBoard({ id: 'temu', code: 'GL', market: '全球' }, countries);
assert.deepEqual(global, { scope: 'global', markets: [] });

assert.throws(() => marketsForBoard({ id: 'x', code: 'ZZ', market: '美国' }, countries));
assert.throws(() => marketsForBoard({ id: 'x', code: 'GL', market: '美国' }, countries));

const regions = [{ slug: 'southeast-asia', title: '东南亚', markets: ['id', 'sg'] }];
const one = resolveFeedUrl(['sg'], ['rules', 'regulation', 'rankings'], regions);
assert.equal(one?.json, '/v1/markets/sg/feed.json');
assert.equal(one?.rss, '/v1/markets/sg/feed.xml');

const typed = resolveFeedUrl(['sg'], ['regulation'], regions);
assert.equal(typed?.json, '/v1/markets/sg/types/regulation.json');

const region = resolveFeedUrl(['sg', 'id'], ['rules', 'regulation', 'rankings'], regions);
assert.equal(region?.json, '/v1/packages/southeast-asia.json');

const custom = resolveFeedUrl(['us', 'sg'], ['rules'], regions);
assert.equal(custom?.kind, 'index');
assert.equal(custom?.json, '/v1/updates.json?markets=sg%2Cus&types=rules');
assert.equal(custom?.rss, null);

assert.throws(() => assertScopedRead({}));
assert.throws(() => assertScopedRead({ types: ['rules', 'regulation', 'rankings'] }));
assert.deepEqual(assertScopedRead({ markets: ['US', 'sg'] }).markets, ['sg', 'us']);
assert.equal(assertScopedRead({ types: ['rules'] }).types.length, 1);

console.log('feed-filter ok');
