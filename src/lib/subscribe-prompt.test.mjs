import assert from 'node:assert/strict';
import { buildAgentPrompt } from './subscribe-prompt.mjs';

const absolute = (path) => `https://ys.tongzhoukuajing.com${path}`;
const regions = [{ slug: 'southeast-asia', title: '东南亚', markets: ['id', 'sg'] }];
const global = {
  json: '/v1/packages/global.json',
  rss: '/v1/packages/global.xml',
  boards: [
    { name: 'Temu', page: '/rankings/temu' },
    { name: 'AliExpress', page: '/rankings/aliexpress' },
  ],
};

const mixed = buildAgentPrompt({
  markets: [
    { id: 'id', name: '印度尼西亚' },
    { id: 'my', name: '马来西亚' },
    { id: 'ru', name: '俄罗斯' },
    { id: 'vn', name: '越南' },
  ],
  types: ['rankings', 'rules', 'regulation'],
  since: '2026-10-24',
  regions,
  global,
  absolute,
});

assert.match(mixed, /远山频道（同舟跨境）/);
assert.match(mixed, /站点：https:\/\/ys\.tongzhoukuajing\.com\//);
assert.match(mixed, /印度尼西亚、马来西亚、俄罗斯、越南/);
assert.match(mixed, /平台规则、市场法规、热销榜/);
assert.match(mixed, /2026-10-24/);
assert.match(mixed, /静态站点会返回完整索引/);
assert.match(mixed, /查询参数是筛选约定/);
assert.match(mixed, /\/v1\/updates\.json\?markets=id%2Cmy%2Cru%2Cvn&types=rules%2Cregulation%2Crankings/);
assert.match(mixed, /\/v1\/markets\/ru\/feed\.json/);
assert.match(mixed, /\/v1\/markets\/vn\/feed\.xml/);
assert.match(mixed, /\/news\?countries=id%2Cmy%2Cru%2Cvn/);
assert.match(mixed, /\/compliance\/my/);
assert.match(mixed, /\/v1\/markets\/id\/compliance\.json/);
assert.match(mixed, /\/v1\/markets\/id\/rankings\.json/);
assert.match(mixed, /\/v1\/packages\/global\.json/);
assert.match(mixed, /\/rankings\/temu/);
assert.match(mixed, /不要编造/);
assert.match(mixed, /这不是法律意见/);
assert.doesNotMatch(mixed, /复制 JSON/);

const one = buildAgentPrompt({
  markets: [{ id: 'sg', name: '新加坡' }],
  types: ['rules', 'regulation', 'rankings'],
  since: '',
  regions,
  global,
  absolute,
});
assert.match(one, /\/v1\/markets\/sg\/feed\.json/);
assert.match(one, /\/v1\/markets\/sg\/feed\.xml/);
assert.match(one, /构建时已按该市场滤好/);
assert.match(one, /起始：不限日期/);
assert.doesNotMatch(one, /完整索引/);
assert.doesNotMatch(one, /不要改域名/);

const local = buildAgentPrompt({
  markets: [{ id: 'sg', name: '新加坡' }],
  types: ['rules'],
  regions,
  absolute: (path) => `http://127.0.0.1:4477/yuanshan-channel${path}`,
});
assert.match(local, /本地预览/);
assert.match(local, /去掉 \/yuanshan-channel 前缀/);

const typed = buildAgentPrompt({
  markets: [{ id: 'sg', name: '新加坡' }],
  types: ['rules'],
  regions,
  global,
  absolute,
});
assert.match(typed, /\/v1\/markets\/sg\/types\/rules\.json/);
assert.match(typed, /内容：平台规则/);
assert.match(typed, /category=rules/);
assert.doesNotMatch(typed, /全球榜（Temu/);
assert.doesNotMatch(typed, /rankings\.json/);

const region = buildAgentPrompt({
  markets: [
    { id: 'sg', name: '新加坡' },
    { id: 'id', name: '印度尼西亚' },
  ],
  types: ['rules', 'regulation', 'rankings'],
  since: '2026-01-01',
  regions,
  global,
  absolute,
});
assert.match(region, /\/v1\/packages\/southeast-asia\.json/);
assert.match(region, /\/v1\/packages\/southeast-asia\.xml/);
assert.match(region, /东南亚/);
assert.match(region, /丢掉 date 早于 2026-01-01/);
assert.doesNotMatch(region, /完整索引/);

const gh = buildAgentPrompt({
  markets: [{ id: 'us', name: '美国' }],
  types: ['regulation'],
  regions,
  absolute: (path) => `https://zuyuanwu-cell.github.io/yuanshan-channel${path}`,
});
assert.match(gh, /不要改域名/);
assert.match(gh, /https:\/\/zuyuanwu-cell\.github\.io\/yuanshan-channel\/v1\/markets\/us\/types\/regulation\.json/);

assert.throws(() => buildAgentPrompt({ markets: [], types: ['rules'], regions, absolute }));

console.log('subscribe-prompt ok');
