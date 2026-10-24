import type { APIRoute } from 'astro';
import {
  getCompliance,
  getHsCodesDataset,
  getNews,
  getPlatformMeta,
  getSite,
  latestCapture,
  latestContentDate,
  latestNewsCheck,
  latestRankingByPlatform,
} from '../lib/content';
import { pageUrl } from '../lib/seo';

interface Entry {
  loc: string;
  lastmod?: string;
}

function laterDate(values: Array<string | undefined>): string | undefined {
  const dates = values.filter((value): value is string => Boolean(value && /^\d{4}-\d{2}-\d{2}/.test(value)));
  return dates.sort().at(-1)?.slice(0, 10);
}

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://ys.tongzhoukuajing.com');
  const siteUpdated = getSite().updated;
  const newsChecked = latestNewsCheck();
  const captured = laterDate([latestCapture()]);
  const contentDate = latestContentDate();
  const platformsUpdated = getPlatformMeta().updated;
  const hsVersion = laterDate([getHsCodesDataset().version]);
  const complianceDates = getCompliance().map((country) => country.last_verified);
  const complianceLatest = laterDate(complianceDates);

  const entries: Entry[] = [
    { loc: pageUrl('/', origin), lastmod: contentDate },
    { loc: pageUrl('/news', origin), lastmod: newsChecked },
    ...getNews().map((item) => ({
      loc: pageUrl(`/news/${item.slug}`, origin),
      lastmod: laterDate([item.date, item.checked]),
    })),
    { loc: pageUrl('/compliance', origin), lastmod: complianceLatest },
    { loc: pageUrl('/compliance/compare', origin), lastmod: complianceLatest },
    { loc: pageUrl('/compliance/map', origin), lastmod: complianceLatest },
    { loc: pageUrl('/compliance/templates', origin), lastmod: complianceLatest },
    ...getCompliance().map((country) => ({
      loc: pageUrl(`/compliance/${country.country}`, origin),
      lastmod: laterDate([country.last_verified]),
    })),
    { loc: pageUrl('/hs-codes', origin), lastmod: hsVersion ?? siteUpdated },
    { loc: pageUrl('/rankings', origin), lastmod: captured ?? siteUpdated },
    ...latestRankingByPlatform().map((ranking) => ({
      loc: pageUrl(`/rankings/${ranking.platform}`, origin),
      lastmod: ranking.date,
    })),
    { loc: pageUrl('/platforms', origin), lastmod: laterDate([platformsUpdated]) },
    { loc: pageUrl('/about', origin), lastmod: siteUpdated },
    { loc: pageUrl('/subscribe', origin), lastmod: siteUpdated },
  ];

  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
      return `  <url>\n    <loc>${entry.loc}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
