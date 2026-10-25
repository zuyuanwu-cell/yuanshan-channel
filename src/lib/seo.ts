import { url } from './format';
import { withTrailingSlash } from './trailing-slash.mjs';

export interface Crumb {
  name: string;
  href: string;
}

/** Trim a meta description on a sentence boundary when it runs long. */
export function metaDescription(text: string, max = 100): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max);
  const stop = Math.max(slice.lastIndexOf('。'), slice.lastIndexOf('；'));
  if (stop >= 36) return slice.slice(0, stop + 1);
  return `${slice.replace(/[，、：:；\s]+$/u, '')}…`;
}

export function absoluteUrl(path: string, origin: URL): string {
  return new URL(url(path), origin).href;
}

/** Canonical path for a built page. Files keep their extension; directories end with /. */
export function canonicalPath(pathname: string): string {
  return withTrailingSlash(pathname);
}

/** Rankings detail document title: marketplace, 「美妆日化热销榜」, and the as-of date. */
export function rankingSeoTitle(name: string, market: string, asOf?: string): string {
  const when = asOf ? ` ${asOf}` : '';
  return `${rankingPlace(name, market)} · 美妆日化热销榜${when}`;
}

export function rankingSeoDescription(name: string, market: string, asOf?: string, captured?: string): string {
  const place = rankingPlace(name, market);
  const when = asOf ? `，截至 ${asOf}` : '';
  const crawl = captured ? `，抓取于 ${captured}` : '';
  return `${place} · 美妆日化热销榜${when}${crawl}。记录公开榜单的名次和覆盖范围。`;
}

function rankingPlace(name: string, market: string, alwaysMarket = false): string {
  const label = market.trim();
  if (!label) return name;
  if (!alwaysMarket && name.includes(label)) return name;
  return `${name}（${label}）`;
}

/** Page URLs use the trailing slash Astro emits on directory indexes. */
export function pageUrl(path: string, origin: URL): string {
  const href = absoluteUrl(path, origin);
  return href.endsWith('/') ? href : `${href}/`;
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
