/**
 * Paste-ready prompt for the market subscribe panel.
 * URLs come from resolveFeedUrl — the same files the old copy rows used.
 */

import { TYPE_LABELS, canonicalTypes, resolveFeedUrl, sortIds } from './feed-filter.mjs';

const SITE = 'https://ys.tongzhoukuajing.com/';

/**
 * @param {string} path
 * @param {(path: string) => string} absolute
 */
function href(path, absolute) {
  return absolute(path);
}

/**
 * @param {{
 *   markets: { id: string, name: string }[],
 *   types: string[],
 *   since?: string,
 *   regions: { slug: string, title: string, markets: string[] }[],
 *   global?: { json: string, rss: string, boards?: { name: string, page: string | null }[] } | null,
 *   absolute: (path: string) => string,
 * }} input
 */
export function buildAgentPrompt(input) {
  const ids = sortIds(input.markets.map((market) => market.id));
  const names = new Map(input.markets.map((market) => [market.id, market.name]));
  const ordered = canonicalTypes(input.types);
  const day = input.since && /^\d{4}-\d{2}-\d{2}$/.test(input.since) ? input.since : '';
  const feed = resolveFeedUrl(ids, ordered, input.regions ?? []);
  if (!feed) throw new Error('无法生成提示词：市场或内容类型为空');

  const label = (id) => names.get(id) || id;
  const typeLabel = ordered.map((type) => TYPE_LABELS[type] || type).join('、');
  const lines = [];

  lines.push('请阅读远山频道，按我的订阅整理美妆日化跨境更新，用中文回复。');
  lines.push('只写来源里看得到的事实。不要编造数字、费率、品牌、排名或截止日期。');
  lines.push('');
  lines.push(`远山频道（同舟跨境）报道平台规则、目的国法规和热销榜。站点：${SITE}`);
  lines.push('');
  lines.push('我的订阅');
  lines.push(`- 市场：${ids.map(label).join('、')}`);
  lines.push(`- 内容：${typeLabel}`);
  lines.push(
    day
      ? `- 起始：${day} 及之后（含当天）。比较 JSON 里的 date，格式 YYYY-MM-DD。`
      : '- 起始：不限日期。',
  );
  lines.push('');
  lines.push('先读 JSON。RSS 只有摘要。写某一条时，打开该条的 page 和 source_url，不要只看标题。');

  const sample = href(feed.json, input.absolute);
  if (/^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:|\/)/.test(sample)) {
    lines.push('下面的链接指向本地预览，外网 Agent 打不开。请改用 https://ys.tongzhoukuajing.com 上的同路径，并去掉 /yuanshan-channel 前缀。');
  } else if (!sample.startsWith('https://ys.tongzhoukuajing.com/')) {
    lines.push('下面的链接来自当前站点，请按原样请求，不要改域名。');
  }
  lines.push('');

  if (feed.kind === 'index') {
    lines.push('这组市场没有整包的预生成文件。索引：');
    lines.push(sample);
    lines.push('静态站点会返回完整索引，查询参数不会在服务器上生效。查询参数是筛选约定，请你读完后自己过滤 items：');
    lines.push(`- 保留 markets 与 ${ids.join(',')} 有交集的条目`);
    lines.push(`- 只保留 type 为 ${ordered.join('、')} 的条目`);
    if (day) lines.push(`- 丢掉 date 早于 ${day} 的条目，保留 ${day} 当天`);
    lines.push('- 不要纳入 scope 为 global 的全球榜');
    lines.push('');
    lines.push('各市场另有构建时已滤好的文件。优先读这些，不必再按市场筛。有起始日期时仍要按 date 筛：');
    for (const id of ids) {
      const one = resolveFeedUrl([id], ordered, []);
      if (!one) continue;
      lines.push(`- ${label(id)}`);
      lines.push(`  JSON ${href(one.json, input.absolute)}`);
      if (one.rss) lines.push(`  RSS ${href(one.rss, input.absolute)}`);
    }
  } else {
    lines.push('这组订阅在构建时已经滤好，静态服务器直接返回。不必再按市场或内容类型筛。');
    lines.push(`JSON ${sample}`);
    if (feed.rss) lines.push(`RSS ${href(feed.rss, input.absolute)}`);
    lines.push(feed.note);
    if (day) lines.push(`起始日期不在文件里。请丢掉 date 早于 ${day} 的条目，保留 ${day} 当天。`);
  }

  lines.push('');
  lines.push('页面与合规快照（总结时附上链接）：');
  const newsTypes = ordered.filter((type) => type === 'rules' || type === 'regulation');
  if (newsTypes.length > 0) {
    const params = new URLSearchParams();
    params.set('countries', ids.join(','));
    if (newsTypes.length === 1) params.set('category', newsTypes[0]);
    lines.push(`- 资讯列表 ${href(`/news?${params.toString()}`, input.absolute)}`);
  }
  for (const id of ids) {
    lines.push(`- ${label(id)}合规页 ${href(`/compliance/${id}`, input.absolute)}`);
    lines.push(`  合规 JSON ${href(`/v1/markets/${id}/compliance.json`, input.absolute)}`);
    if (ordered.includes('rankings')) {
      lines.push(`  热销榜 JSON ${href(`/v1/markets/${id}/rankings.json`, input.absolute)}`);
    }
  }

  if (ordered.includes('rankings') && input.global) {
    lines.push('');
    lines.push('全球榜（Temu、AliExpress 等）不写进国家订阅。要看全球榜时另读，不要和上面的国家条目混在一起：');
    lines.push(`- JSON ${href(input.global.json, input.absolute)}`);
    lines.push(`- RSS ${href(input.global.rss, input.absolute)}`);
    for (const board of input.global.boards ?? []) {
      if (board.page) lines.push(`- ${board.name} ${href(board.page, input.absolute)}`);
    }
  }

  lines.push('');
  lines.push('请这样工作：');
  lines.push('1. 抓取上面的 JSON。遇到 /v1/updates.json 时，按上文的 markets、types、since 自己过滤。已滤好的单市场或整区文件不要再按市场筛。');
  lines.push(`2. 只写我订阅的内容，分成这些块：${typeLabel}。每条给日期、市场、一句话变化。needs_review 为 true 时标明「待核实」，sample 为 true 时标明「示例」。`);
  lines.push('3. 每条注明站内 page 和 source_url。费用、排名、法规以原文为准。这不是法律意见。');
  lines.push('4. 我之后问有没有更新时，对照条目 id，只报新出现的。没有就直接说没有。');
  lines.push('5. 不要写未选的市场和内容类型。全球榜不要写进国家摘要。');

  return `${lines.join('\n')}\n`;
}
