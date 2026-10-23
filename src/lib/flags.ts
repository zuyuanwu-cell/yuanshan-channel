import { url } from './format';

/** Site country codes → ISO 3166-1 alpha-2 used by flag filenames (uk → gb). */
const FLAG_ISO: Record<string, string> = {
  us: 'us',
  uk: 'gb',
  eu: 'eu',
  jp: 'jp',
  kr: 'kr',
  br: 'br',
  ru: 'ru',
  id: 'id',
  my: 'my',
  th: 'th',
  vn: 'vn',
  ph: 'ph',
  sg: 'sg',
  ae: 'ae',
  sa: 'sa',
  cn: 'cn',
};

export function flagIso(cc: string): string {
  const key = cc.toLowerCase();
  return FLAG_ISO[key] ?? key;
}

/** Public path to a self-hosted SVG flag (respects Astro base). */
export function flagSrc(cc: string): string {
  return url(`/flags/${flagIso(cc)}.svg`);
}

/** Safe HTML for client-rendered cards (hs-codes search). */
export function flagImgHtml(cc: string, className = 'flag-img'): string {
  const src = flagSrc(cc);
  return `<img class="${className}" src="${src}" alt="" width="28" height="21" loading="lazy" decoding="async" />`;
}
