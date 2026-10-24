/**
 * One filter for market packages. The site, the static feeds, and the MCP
 * server all import this file. It does not read content or the network.
 */

export const CONTENT_TYPES = ['rules', 'regulation', 'rankings'];

export const TYPE_LABELS = {
  rules: '平台规则',
  regulation: '市场法规',
  rankings: '热销榜',
};

/** Chinese compliance `region` → stable URL slug. Not a second market list. */
export const REGION_SLUGS = {
  北美: 'north-america',
  拉美: 'latin-america',
  欧洲: 'europe',
  俄语区: 'cis',
  东亚: 'east-asia',
  东南亚: 'southeast-asia',
  南亚: 'south-asia',
  中亚: 'central-asia',
  中东: 'middle-east',
  非洲: 'africa',
  大洋洲: 'oceania',
  其他: 'other',
};

export const GLOBAL_PACKAGE = 'global';

/** Ranking-board market labels that are shorter than compliance `name_zh`. */
export const MARKET_LABEL_ALIASES = {
  印尼: 'id',
};

export function regionSlug(name) {
  const slug = REGION_SLUGS[name];
  if (!slug) throw new Error(`未知地区「${name}」，需要在 REGION_SLUGS 里加稳定英文 slug`);
  return slug;
}

export function sortIds(ids) {
  return [...new Set((ids ?? []).map((id) => String(id).trim().toLowerCase()).filter(Boolean))].sort();
}

export function canonicalTypes(types) {
  const want = new Set(types ?? []);
  for (const type of want) {
    if (!CONTENT_TYPES.includes(type)) throw new Error(`未知内容类型 ${type}`);
  }
  return CONTENT_TYPES.filter((type) => want.has(type));
}

export function typeSubsets() {
  const subsets = [];
  const n = CONTENT_TYPES.length;
  for (let mask = 1; mask < 2 ** n; mask += 1) {
    subsets.push(CONTENT_TYPES.filter((_, index) => mask & (2 ** index)));
  }
  return subsets;
}

export function comboId(types) {
  const ordered = canonicalTypes(types);
  if (ordered.length === 0) throw new Error('内容类型为空');
  return ordered.join('+');
}

export function assertSince(since) {
  if (!since) return '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error('since 须为 YYYY-MM-DD');
  return since;
}

/**
 * Refuse an unfiltered read. A type list counts only when it drops at least one type.
 * @param {{ markets?: string[], types?: string[], since?: string, query?: string }} filter
 */
export function assertScopedRead(filter) {
  const markets = sortIds(filter.markets);
  const types = filter.types?.length ? canonicalTypes(filter.types) : [];
  const since = assertSince(filter.since ?? '');
  const query = (filter.query ?? '').trim();
  const narrowed = types.length > 0 && types.length < CONTENT_TYPES.length;
  if (markets.length === 0 && !since && !query && !narrowed) {
    throw new Error('需要 markets、since、query，或收窄 types。V1 不提供无筛选的全库导出。');
  }
  return {
    markets,
    types,
    since,
    query,
    includeGlobal: filter.includeGlobal === true,
  };
}

function sameSet(left, right) {
  if (left.length !== right.length) return false;
  const b = [...right].sort();
  return [...left].sort().every((value, index) => value === b[index]);
}

/**
 * Stable feed URL for a package.
 * One market, or a whole region with every content type, points at a file
 * written at build time. Any other mix points at the index plus a query
 * the static host does not apply — callers filter `items` themselves.
 *
 * @param {string[]} markets
 * @param {string[]} types
 * @param {{ slug: string, title: string, markets: string[] }[]} regions
 */
export function resolveFeedUrl(markets, types, regions) {
  const ids = sortIds(markets);
  const ordered = canonicalTypes(types);
  if (ids.length === 0 || ordered.length === 0) return null;
  const combo = ordered.join('+');
  const full = ordered.length === CONTENT_TYPES.length;
  if (ids.length === 1) {
    const id = ids[0];
    if (full) {
      return {
        kind: 'prebuilt',
        json: `/v1/markets/${id}/feed.json`,
        rss: `/v1/markets/${id}/feed.xml`,
        note: '这个文件在构建时已按该市场滤好，静态服务器直接返回。',
      };
    }
    return {
      kind: 'prebuilt',
      json: `/v1/markets/${id}/types/${combo}.json`,
      rss: `/v1/markets/${id}/types/${combo}.xml`,
      note: '这个文件在构建时已按该市场和内容类型滤好。',
    };
  }
  const region = (regions ?? []).find((entry) => sameSet(entry.markets, ids));
  if (region && full) {
    return {
      kind: 'prebuilt',
      json: `/v1/packages/${region.slug}.json`,
      rss: `/v1/packages/${region.slug}.xml`,
      note: `与「${region.title}」整区一致，构建时已滤好。`,
    };
  }
  const params = new URLSearchParams();
  params.set('markets', ids.join(','));
  params.set('types', ordered.join(','));
  return {
    kind: 'index',
    json: `/v1/updates.json?${params.toString()}`,
    rss: null,
    note: '静态站点会返回完整索引。查询参数是筛选约定，由关注页和 MCP 在读取时应用。每个市场另有已滤好的 RSS。',
  };
}

/**
 * @template { { date: string, id: string, type: string, markets?: string[], scope?: string, title?: string, summary?: string, body_text?: string } } T
 * @param {T[]} items
 * @param {{ markets?: string[], types?: string[], since?: string, query?: string, includeGlobal?: boolean }} filter
 * @returns {T[]}
 */
export function filterFeedItems(items, filter) {
  const markets = sortIds(filter.markets);
  const types = filter.types?.length ? canonicalTypes(filter.types) : [];
  const since = assertSince(filter.since ?? '');
  const query = (filter.query ?? '').trim().toLowerCase();
  const includeGlobal = filter.includeGlobal === true;
  const matched = items.filter((item) => {
    if (types.length > 0 && !types.includes(item.type)) return false;
    if (since && item.date < since) return false;
    if (query) {
      const hay = `${item.title ?? ''}\n${item.summary ?? ''}\n${item.body_text ?? ''}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    if (markets.length > 0) {
      const global = item.scope === 'global';
      if (global) return includeGlobal;
      if (!(item.markets ?? []).some((id) => markets.includes(id))) return false;
    }
    return true;
  });
  matched.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
  return matched;
}

/**
 * Map a ranking board onto compliance country ids.
 * `GL` / 「全球」is global. `SEA` / 「东南亚」expands to that region.
 * Any other `code` must be a compliance country id. The Chinese `market`
 * label is split on `/` and `、` and must match `name_zh` (or an alias).
 *
 * @param {{ id: string, code: string, market: string }} board
 * @param {{ id: string, name_zh: string, region: string }[]} countries
 * @param {Record<string, string>} [aliases]
 * @returns {{ scope: 'global' | 'markets', markets: string[] }}
 */
export function marketsForBoard(board, countries, aliases = MARKET_LABEL_ALIASES) {
  const byId = new Map(countries.map((country) => [country.id, country]));
  const byName = new Map(countries.map((country) => [country.name_zh, country.id]));
  for (const [token, id] of Object.entries(aliases)) {
    if (!byId.has(id)) throw new Error(`别名「${token}」指向不存在的市场 ${id}`);
    byName.set(token, id);
  }

  const globalCode = board.code === 'GL';
  const globalLabel = board.market === '全球';
  if (globalCode || globalLabel) {
    if (!globalCode || !globalLabel) {
      throw new Error(`榜位 ${board.id} 的全球标记不一致：code=${board.code} market=${board.market}`);
    }
    return { scope: 'global', markets: [] };
  }

  const seaCode = board.code === 'SEA';
  const seaLabel = board.market === '东南亚';
  if (seaCode || seaLabel) {
    if (!seaCode || !seaLabel) {
      throw new Error(`榜位 ${board.id} 的东南亚标记不一致：code=${board.code} market=${board.market}`);
    }
    const markets = countries
      .filter((country) => country.region === '东南亚')
      .map((country) => country.id)
      .sort();
    if (markets.length === 0) throw new Error('合规数据里没有东南亚市场');
    return { scope: 'markets', markets };
  }

  const fromCode = board.code.toLowerCase();
  if (!byId.has(fromCode)) {
    throw new Error(`榜位 ${board.id} 的 code ${board.code} 没有 content/compliance/${fromCode}.json`);
  }
  const ids = new Set([fromCode]);
  const parts = board.market.split(/[/、,，]/).map((part) => part.trim()).filter(Boolean);
  for (const token of parts) {
    const id = byName.get(token);
    if (!id) throw new Error(`榜位 ${board.id} 的市场「${token}」对不上合规国家名称`);
    ids.add(id);
  }
  return { scope: 'markets', markets: [...ids].sort() };
}

export function htmlToText(html) {
  return String(html ?? '')
    .replace(/<a\s+[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
      const label = text.replace(/<[^>]+>/g, '').trim();
      return label ? `${label} (${href})` : href;
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|h1|h2|h3|li|blockquote|div)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rfc822(isoDate) {
  return new Date(`${isoDate}T12:00:00Z`).toUTCString();
}

/**
 * @param {{ title: string, link: string, description: string, self: string, updated: string, items: { title: string, link: string, date: string, id: string, summary: string }[] }} channel
 */
export function renderRss(channel) {
  const items = channel.items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="false">${escapeXml(item.id)}</guid>
      <pubDate>${escapeXml(rfc822(item.date))}</pubDate>
      <description>${escapeXml(item.summary)}</description>
    </item>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channel.link)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${escapeXml(rfc822(channel.updated))}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(channel.self)}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}
