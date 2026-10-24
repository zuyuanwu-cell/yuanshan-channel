import { url } from './format';

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

/** Page URLs use the trailing slash Astro emits on directory indexes. */
export function pageUrl(path: string, origin: URL): string {
  const href = absoluteUrl(path, origin);
  return href.endsWith('/') ? href : `${href}/`;
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
