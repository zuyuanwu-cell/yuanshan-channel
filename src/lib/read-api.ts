import {
  CONTENT_TYPES,
  GLOBAL_PACKAGE,
  canonicalTypes,
  filterFeedItems,
  htmlToText,
  marketsForBoard,
  regionSlug,
  renderRss,
  sortIds,
} from './feed-filter.mjs';
import { url } from './format';
import {
  boardStatus,
  getBoard,
  getBoards,
  getCompliance,
  getComplianceCountry,
  getNews,
  getRankings,
  getRankingsFor,
  getSite,
  hasRanking,
} from './content';
import type { RankingItem } from './types';

export { CONTENT_TYPES, GLOBAL_PACKAGE, typeSubsets, comboId } from './feed-filter.mjs';

export interface FeedItem {
  kind: 'news' | 'ranking';
  id: string;
  type: 'rules' | 'regulation' | 'rankings';
  date: string;
  title: string;
  summary: string;
  markets: string[];
  page: string;
  source_url: string;
  source_name: string;
  needs_review: boolean;
  sample: boolean;
  body_text?: string;
  platforms?: string[];
  tags?: string[];
  checked?: string;
  key_date?: { date: string; label: string } | null;
  scope?: 'global';
  board?: string;
  partial?: boolean;
  detail?: string;
}

export interface RegionPackage {
  slug: string;
  title: string;
  markets: string[];
}

function origin(): string {
  return String(import.meta.env.SITE ?? '').replace(/\/$/, '');
}

/** Absolute URL for this build (site + base). RSS readers need this. */
export function absoluteUrl(path: string): string {
  return `${origin()}${url(path)}`;
}

function countryRefs() {
  return getCompliance().map((country) => ({
    id: country.country,
    name_zh: country.name_zh,
    region: country.region,
  }));
}

function baseDoc<T extends Record<string, unknown>>(kind: string, extra: T) {
  const site = getSite();
  return {
    api: 'yuanshan-channel/v1',
    access: 'public-read' as const,
    auth: null,
    generated: site.updated,
    disclaimer: site.disclaimer,
    kind,
    ...extra,
  };
}

function defined(item: RankingItem) {
  const row: Record<string, unknown> = {
    rank: item.rank,
    title: item.title,
    brand: item.brand,
    needs_review: item.needs_review,
  };
  if (item.title_zh) row.title_zh = item.title_zh;
  if (item.price !== undefined) row.price = item.price;
  if (item.currency) row.currency = item.currency;
  if (item.image_url) row.image_url = item.image_url;
  if (item.image_zoom_url) row.image_zoom_url = item.image_zoom_url;
  if (item.image) row.image = item.image;
  if (item.url) row.url = item.url;
  if (item.sales_text) row.sales_text = item.sales_text;
  if (item.bought_text) row.bought_text = item.bought_text;
  if (item.rating !== undefined) row.rating = item.rating;
  if (item.reviews_count !== undefined) row.reviews_count = item.reviews_count;
  if (item.note) row.note = item.note;
  return row;
}

let itemCache: FeedItem[] | null = null;

function buildItems(): FeedItem[] {
  const countries = countryRefs();
  const known = new Set(countries.map((country) => country.id));
  const items: FeedItem[] = [];

  for (const news of getNews()) {
    for (const code of news.countries) {
      if (!known.has(code)) throw new Error(`资讯 ${news.slug} 的 countries 含未知市场 ${code}`);
    }
    items.push({
      kind: 'news',
      id: news.slug,
      type: news.category,
      date: news.date,
      title: news.title,
      summary: news.summary,
      body_text: htmlToText(news.bodyHtml),
      markets: sortIds(news.countries),
      platforms: news.platforms,
      tags: news.tags,
      source_url: news.source_url,
      source_name: news.source_name,
      checked: news.checked,
      needs_review: news.needs_review,
      sample: news.sample,
      key_date: news.key_date ?? null,
      page: `/news/${news.slug}`,
    });
  }

  for (const ranking of getRankings()) {
    const board = getBoard(ranking.platform);
    if (!board) throw new Error(`榜单 ${ranking.platform}/${ranking.date} 没有 rankingPlatforms 条目`);
    const linked = marketsForBoard(board, countries);
    const bits = [`${ranking.items.length} 个单品`, ranking.source_name];
    if (ranking.partial) bits.push('部分数据');
    if (ranking.needs_review) bits.push('待核实');
    const item: FeedItem = {
      kind: 'ranking',
      id: `${ranking.platform}/${ranking.date}`,
      type: 'rankings',
      date: ranking.date,
      title: `${board.name} · ${ranking.date}`,
      summary: bits.join(' · '),
      markets: linked.markets,
      board: ranking.platform,
      source_url: ranking.source_url,
      source_name: ranking.source_name,
      needs_review: ranking.needs_review,
      sample: ranking.sample,
      partial: ranking.partial,
      page: `/rankings/${ranking.platform}`,
      detail: `/v1/rankings/${ranking.platform}/${ranking.date}.json`,
    };
    if (linked.scope === 'global') item.scope = 'global';
    items.push(item);
  }

  return filterFeedItems(items, {}) as FeedItem[];
}

export function feedItems(options?: { body?: boolean }): FeedItem[] {
  if (!itemCache) itemCache = buildItems();
  if (options?.body === false) {
    return itemCache.map((item) => {
      const { body_text: _body, ...rest } = item;
      return rest;
    });
  }
  return itemCache;
}

export function regionPackages(): RegionPackage[] {
  const countries = getCompliance();
  const names: string[] = [];
  for (const country of countries) {
    if (!names.includes(country.region)) names.push(country.region);
  }
  return names.map((title) => ({
    slug: regionSlug(title),
    title,
    markets: countries.filter((country) => country.region === title).map((country) => country.country).sort(),
  }));
}

export function packageSlugs(): string[] {
  return [...regionPackages().map((region) => region.slug), GLOBAL_PACKAGE];
}

const FILTER_HELP = {
  markets: 'Comma-separated compliance country ids. An item matches when item.markets intersects. Items with scope=global match only if include_global=1.',
  types: 'Comma-separated subset of rules,regulation,rankings. Omit for all three.',
  since: 'YYYY-MM-DD, inclusive on item.date.',
  include_global: 'Set to 1 to add GL ranking boards when markets is set. Market packages leave them out.',
  static_host:
    'A static server returns this file unchanged and ignores the query string. Apply the query in the client, or use a prebuilt /v1/markets/{id}/feed.json, /v1/markets/{id}/types/{combo}.json, or /v1/packages/{slug}.json.',
};

export function directoryDocument() {
  return baseDoc('directory', {
    human: '/subscribe/',
    access_note: 'V1 is an unauthenticated public read of content already published on the site. No API key is checked.',
    auth_later: {
      required: false,
      header: 'Authorization',
      scheme: 'Bearer',
      scope: 'A future paid key is limited to one market package (compliance country ids). V1 does not issue or check keys. Do not put secrets in client JavaScript.',
    },
    non_goals: [
      'no write API',
      'no unfiltered bulk export as a subscription — MCP search_updates requires markets, since, query, or a narrowed types list',
      'not legal advice and not a substitute for source_url',
    ],
    content_types: CONTENT_TYPES.map((id) => ({ id, label_zh: id === 'rules' ? '平台规则' : id === 'regulation' ? '市场法规' : '热销榜' })),
    paths: {
      markets: '/v1/markets.json',
      updates: '/v1/updates.json',
      news: '/v1/news/{slug}.json',
      rankings: '/v1/rankings.json',
      ranking_latest: '/v1/rankings/{board}.json',
      ranking_date: '/v1/rankings/{board}/{date}.json',
      compliance: '/v1/markets/{id}/compliance.json',
      market_rankings: '/v1/markets/{id}/rankings.json',
      market_feed: '/v1/markets/{id}/feed.json',
      market_feed_rss: '/v1/markets/{id}/feed.xml',
      market_types: '/v1/markets/{id}/types/{combo}.json',
      market_types_rss: '/v1/markets/{id}/types/{combo}.xml',
      package: '/v1/packages/{slug}.json',
      package_rss: '/v1/packages/{slug}.xml',
    },
    path_note: 'Paths are site-root paths without the deploy base. On ys.tongzhoukuajing.com the base is /. On GitHub Pages prefix /yuanshan-channel.',
    filter: FILTER_HELP,
    regions: regionPackages(),
    global_package: '/v1/packages/global.json',
  });
}

export function marketsDocument() {
  const markets = getCompliance().map((country) => ({
    id: country.country,
    name_zh: country.name_zh,
    region: country.region,
    region_slug: regionSlug(country.region),
    page: `/compliance/${country.country}`,
    feeds: {
      json: `/v1/markets/${country.country}/feed.json`,
      rss: `/v1/markets/${country.country}/feed.xml`,
      compliance: `/v1/markets/${country.country}/compliance.json`,
      rankings: `/v1/markets/${country.country}/rankings.json`,
    },
  }));
  return baseDoc('markets', {
    count: markets.length,
    regions: regionPackages(),
    markets,
  });
}

export function updatesDocument() {
  const items = feedItems();
  return baseDoc('index', {
    count: items.length,
    filter: FILTER_HELP,
    items,
  });
}

export function newsDocument(slug: string) {
  const item = feedItems().find((entry) => entry.kind === 'news' && entry.id === slug);
  if (!item) throw new Error(`未知资讯 ${slug}`);
  return baseDoc('news', { item });
}

export function feedDocument(markets: string[], types: string[], meta: { id: string; title: string; kind?: string }) {
  const ordered = canonicalTypes(types);
  const ids = sortIds(markets);
  const items = filterFeedItems(feedItems(), { markets: ids, types: ordered });
  return baseDoc(meta.kind ?? 'feed', {
    id: meta.id,
    title: meta.title,
    markets: ids,
    types: ordered,
    filter: { markets: ids, types: ordered, include_global: false },
    count: items.length,
    items,
  });
}

export function globalPackageDocument() {
  const items = feedItems().filter((item) => item.scope === 'global');
  return baseDoc('package', {
    id: GLOBAL_PACKAGE,
    title: '全球',
    scope: 'global',
    markets: [],
    types: ['rankings'],
    note: '榜位 code 为 GL 的热销榜，不绑到单个国家，也不会自动并进国家订阅。',
    count: items.length,
    items,
  });
}

export function packageDocument(slug: string) {
  if (slug === GLOBAL_PACKAGE) return globalPackageDocument();
  const region = regionPackages().find((entry) => entry.slug === slug);
  if (!region) throw new Error(`未知订阅包 ${slug}`);
  return feedDocument(region.markets, [...CONTENT_TYPES], { id: region.slug, title: region.title, kind: 'package' });
}

export function rssForDocument(
  doc: {
    title: string;
    items: { title: string; page: string; date: string; id: string; summary: string }[];
    markets?: string[];
    types?: string[];
  },
  selfPath: string,
) {
  const site = getSite();
  const markets = doc.markets ?? [];
  const types = doc.types ?? [];
  const params = new URLSearchParams();
  if (markets.length) params.set('markets', markets.join(','));
  if (types.length) params.set('types', types.join(','));
  const query = params.toString();
  return renderRss({
    title: `远山频道 · ${doc.title}`,
    link: absoluteUrl(query ? `/subscribe/?${query}` : '/subscribe/'),
    description: `${site.disclaimer} 公开只读，不是法律意见，也不代替来源原文。`,
    self: absoluteUrl(selfPath),
    updated: site.updated,
    items: doc.items.map((item) => ({
      title: item.title,
      link: absoluteUrl(item.page),
      date: item.date,
      id: item.id,
      summary: item.summary,
    })),
  });
}

export function complianceDocument(id: string) {
  const country = getComplianceCountry(id);
  if (!country) throw new Error(`未知市场 ${id}`);
  return baseDoc('compliance', {
    id: country.country,
    name_zh: country.name_zh,
    region: country.region,
    region_slug: regionSlug(country.region),
    page: `/compliance/${country.country}`,
    market: country,
  });
}

export function rankingSnapshot(boardId: string, date?: string) {
  const board = getBoard(boardId);
  if (!board) throw new Error(`未知榜位 ${boardId}`);
  const linked = marketsForBoard(board, countryRefs());
  const rankings = getRankingsFor(boardId);
  const ranking = date ? rankings.find((entry) => entry.date === date) : rankings[0];
  const status = boardStatus(boardId);
  if (!ranking) {
    return {
      board: board.id,
      name: board.name,
      code: board.code,
      market_label: board.market,
      markets: linked.markets,
      scope: linked.scope,
      status,
      latest: null,
      dates: [] as string[],
      page: null,
      items: [] as Record<string, unknown>[],
    };
  }
  return {
    board: board.id,
    name: board.name,
    code: board.code,
    market_label: board.market,
    markets: linked.markets,
    scope: linked.scope,
    status,
    date: ranking.date,
    latest: !date || date === rankings[0]?.date,
    captured_at: ranking.captured_at,
    category: ranking.category,
    sample: ranking.sample,
    needs_review: ranking.needs_review,
    partial: ranking.partial,
    coverage_note: ranking.coverage_note ?? null,
    source_name: ranking.source_name,
    source_url: ranking.source_url,
    source_note: ranking.source_note,
    page: `/rankings/${board.id}`,
    dates: rankings.map((entry) => entry.date),
    items: ranking.items.map(defined),
  };
}

export function rankingsDocument() {
  const countries = countryRefs();
  const boards = getBoards().map((board) => {
    const linked = marketsForBoard(board, countries);
    const rankings = getRankingsFor(board.id);
    const live = hasRanking(board.id);
    return {
      id: board.id,
      name: board.name,
      code: board.code,
      market_label: board.market,
      markets: linked.markets,
      scope: linked.scope,
      status: boardStatus(board.id),
      latest: rankings[0]?.date ?? null,
      dates: rankings.map((entry) => entry.date),
      page: live ? `/rankings/${board.id}` : null,
      detail: rankings[0] ? `/v1/rankings/${board.id}.json` : null,
    };
  });
  return baseDoc('rankings', { count: boards.length, boards });
}

export function rankingDocument(boardId: string, date?: string) {
  return baseDoc('ranking', rankingSnapshot(boardId, date));
}

export function marketRankingsDocument(id: string) {
  if (!getComplianceCountry(id)) throw new Error(`未知市场 ${id}`);
  const countries = countryRefs();
  const boards = getBoards()
    .filter((board) => marketsForBoard(board, countries).markets.includes(id))
    .map((board) => rankingSnapshot(board.id));
  return baseDoc('rankings', { id, count: boards.length, boards });
}

export function newsSlugs(): string[] {
  return getNews().map((item) => item.slug);
}

export function rankingPaths(): { board: string; date: string }[] {
  return getRankings().map((ranking) => ({ board: ranking.platform, date: ranking.date }));
}

export function marketIds(): string[] {
  return getCompliance().map((country) => country.country);
}

export function subscribePayload() {
  const countries = countryRefs();
  return {
    regions: regionPackages(),
    markets: getCompliance().map((country) => ({
      id: country.country,
      name_zh: country.name_zh,
      region: country.region,
      region_slug: regionSlug(country.region),
    })),
    items: feedItems({ body: false }),
    global: {
      json: '/v1/packages/global.json',
      rss: '/v1/packages/global.xml',
      boards: getBoards()
        .filter((board) => marketsForBoard(board, countries).scope === 'global')
        .map((board) => ({
          id: board.id,
          name: board.name,
          page: hasRanking(board.id) ? `/rankings/${board.id}` : null,
        })),
    },
  };
}
