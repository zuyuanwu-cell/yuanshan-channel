import { withTrailingSlash } from './trailing-slash.mjs';

export { withTrailingSlash };

export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  return `${match[1]}.${match[2]}.${match[3]}`;
}

export function formatShortDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  return `${Number(match[2])}月${Number(match[3])}日`;
}

/** Keeps the wall-clock time and offset the capture was recorded in, e.g. "2026.10.22 20:38 UTC+8". */
export function formatDateTime(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2})?(Z|[+-]\d{2}:\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, y, m, d, hh, mm, zone] = match;
  let label = 'UTC';
  if (zone && zone !== 'Z') {
    const [hours, minutes] = zone.slice(1).split(':');
    label = `UTC${zone[0]}${Number(hours)}${minutes === '00' ? '' : `:${minutes}`}`;
  }
  return `${y}.${m}.${d} ${hh}:${mm} ${label}`;
}

export function formatPrice(
  price: string | number | null | undefined,
  currency: string | undefined,
  pendingLabel: string,
): string {
  if (price === null || price === undefined || price === '') return pendingLabel;
  if (typeof price === 'number' && currency) {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency }).format(price);
  }
  return currency ? `${currency} ${price}` : String(price);
}

export function fill(template: string, n: number): string {
  return template.replace('{n}', String(n));
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${base}${withTrailingSlash(path)}`;
}

export function stripBase(pathname: string): string {
  if (base && pathname.startsWith(base)) return pathname.slice(base.length) || '/';
  return pathname;
}

export function isActivePath(pathname: string, href: string): boolean {
  const path = stripBase(pathname.split(/[?#]/)[0] ?? pathname).replace(/\/$/, '') || '/';
  const target = stripBase((href.split(/[?#]/)[0] ?? href)).replace(/\/$/, '') || '/';
  if (target === '/') return path === '/';
  return path === target || path.startsWith(`${target}/`);
}

export function padRank(rank: number): string {
  return String(rank).padStart(2, '0');
}
