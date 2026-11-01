/**
 * Structural views over existing compliance items and news.
 * Dates, roles, and duties are copied from those records. This file does not add regimes.
 */
import {
  getBoards,
  getCompliance,
  getComplianceCountry,
  getNews,
  getPlatform,
  hasRanking,
} from './content';
import type { ComplianceCountry, ComplianceItem, NewsItem } from './types';

const HUBS = new Set(['us', 'id', 'eu']);

export const REGULATION_DIGEST = {
  compiled: '2026-11-01',
  effectiveFrom: '2026-10-01',
  effectiveThrough: '2026-11-01',
  title: '2026年11月全球美妆法规已生效/将生效盘点',
  path: '/guides/2026-11-cosmetics-effective',
  pillar: '/guides/cross-border-cosmetics-regulations',
} as const;

export type DutyBucket = '注册' | '列名' | '标签' | '责任人';

const DUTY_ORDER: DutyBucket[] = ['注册', '列名', '标签', '责任人'];

export function dutyBucket(item: ComplianceItem): DutyBucket | null {
  if (item.type === 'label') return '标签';
  if (item.type === 'local-rep') return '责任人';
  if (item.type === 'registration') {
    if (/列名|通报|备案|CPNP|Notifikasi/i.test(item.name_zh)) return '列名';
    return '注册';
  }
  if (item.type === 'safety' && /责任人|(?:^|[\s/])RP(?:$|[\s/])/.test(item.who)) return '责任人';
  return null;
}

function dutyPoint(item: ComplianceItem): string {
  const note = item.note?.trim();
  if (note) return note;
  if (item.docs.length > 0) return item.docs.slice(0, 3).join('、');
  return item.time;
}

function shiftMonths(iso: string, months: number): string {
  const [year, month, day] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(year ?? 1970, (month ?? 1) - 1 + months, day ?? 1));
  return date.toISOString().slice(0, 10);
}

export interface GuideWho {
  role: string;
  matters: string[];
}

export interface GuideDuty {
  bucket: DutyBucket;
  id: string;
  name: string;
  who: string;
  point: string;
  needs_review: boolean;
}

export interface GuideEvent {
  date: string;
  label: string;
  title: string;
  href: string;
  needs_review: boolean;
}

export interface GuideSource {
  url: string;
  authority: string;
  matters: string[];
}

export interface CountryGuide {
  updated: string;
  who: GuideWho[];
  duties: GuideDuty[];
  timeline: GuideEvent[];
  sources: GuideSource[];
}

export function countryGuide(country: ComplianceCountry): CountryGuide | null {
  if (!HUBS.has(country.country)) return null;
  const items = [...country.items].sort((a, b) => Number(b.mandatory) - Number(a.mandatory));
  const whoMap = new Map<string, string[]>();
  for (const item of items) {
    const role = item.who.trim() || '未注明';
    const list = whoMap.get(role) ?? [];
    list.push(item.name_zh);
    whoMap.set(role, list);
  }

  const duties = items
    .flatMap((item) => {
      const bucket = dutyBucket(item);
      if (!bucket) return [];
      return [
        {
          bucket,
          id: item.id,
          name: item.name_zh,
          who: item.who,
          point: dutyPoint(item),
          needs_review: item.needs_review,
        } satisfies GuideDuty,
      ];
    })
    .sort((a, b) => DUTY_ORDER.indexOf(a.bucket) - DUTY_ORDER.indexOf(b.bucket));

  const from = shiftMonths(country.last_verified, -12);
  const news = getNews().filter(
    (item) => item.countries.includes(country.country) && !item.sample && item.category === 'regulation',
  );
  const timeline: GuideEvent[] = [];
  const newsDates = new Set<string>();
  for (const item of news) {
    const date = item.key_date?.date ?? item.date;
    if (date < from) continue;
    if (item.key_date) newsDates.add(item.key_date.date);
    timeline.push({
      date,
      label: item.key_date?.label ?? '资讯',
      title: item.title,
      href: `/news/${item.slug}`,
      needs_review: item.needs_review,
    });
  }
  for (const item of items) {
    const match = item.time.match(/\d{4}-\d{2}-\d{2}/);
    if (!match) continue;
    const date = match[0];
    if (newsDates.has(date) || date < from) continue;
    timeline.push({
      date,
      label: item.time,
      title: item.name_zh,
      href: `#${item.id}`,
      needs_review: item.needs_review,
    });
  }
  timeline.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title, 'zh')));

  const sourceMap = new Map<string, GuideSource>();
  for (const item of items) {
    const existing = sourceMap.get(item.official_url);
    if (existing) {
      existing.matters.push(item.name_zh);
      continue;
    }
    sourceMap.set(item.official_url, {
      url: item.official_url,
      authority: item.authority,
      matters: [item.name_zh],
    });
  }

  const updated = [country.last_verified, ...items.map((item) => item.source_checked)].sort().at(-1) ?? country.last_verified;
  return {
    updated,
    who: [...whoMap.entries()].map(([role, matters]) => ({ role, matters })),
    duties,
    timeline,
    sources: [...sourceMap.values()],
  };
}

export interface EndLink {
  href: string;
  label: string;
}

export function articleEndLinks(item: NewsItem): { countries: EndLink[]; platforms: EndLink[]; rankings: EndLink[] } {
  const seenCountry = new Set<string>();
  const countries: EndLink[] = [];
  for (const code of item.countries) {
    if (seenCountry.has(code)) continue;
    seenCountry.add(code);
    const country = getComplianceCountry(code);
    if (!country) continue;
    countries.push({ href: `/compliance/${code}`, label: `${country.name_zh}合规` });
  }
  if (countries.length === 0) countries.push({ href: '/compliance', label: '国家合规速查' });

  const seenPlatform = new Set<string>();
  const platforms: EndLink[] = [];
  for (const id of item.platforms) {
    if (seenPlatform.has(id)) continue;
    seenPlatform.add(id);
    const platform = getPlatform(id);
    if (!platform) continue;
    platforms.push({ href: `/platforms/#${id}`, label: platform.name });
  }
  if (platforms.length === 0) platforms.push({ href: '/platforms', label: '平台索引' });

  const rankings = rankingLinks(item);
  if (rankings.length === 0) rankings.push({ href: '/rankings', label: '美妆日化热销榜' });
  return { countries, platforms, rankings };
}

function rankingLinks(item: NewsItem): EndLink[] {
  const live = getBoards().filter((board) => hasRanking(board.id));
  const hit = live.filter((board) => {
    const platform = board.platform ?? board.id;
    return item.platforms.includes(platform) || item.platforms.includes(board.id);
  });
  const sea = new Set(
    getCompliance()
      .filter((country) => country.region === '东南亚')
      .map((country) => country.country),
  );
  const codes = new Set(item.countries.map((code) => code.toUpperCase()));
  const touchesSea = item.countries.some((code) => sea.has(code));
  const narrowed = hit.filter((board) => {
    const code = board.code.toUpperCase();
    if (codes.has(code)) return true;
    if (code === 'SEA' && touchesSea) return true;
    return false;
  });
  return (narrowed.length > 0 ? narrowed : hit).slice(0, 4).map((board) => ({
    href: `/rankings/${board.id}`,
    label: `${board.name}热销榜`,
  }));
}

/** Milestone labels already used on regulation news. Comment deadlines stay out of the digest. */
export function isRegulatoryMilestone(label: string): boolean {
  if (/意见/.test(label)) return false;
  return /生效|施行|实施|适用|投放|清库存|截止|宽限|期满/.test(label);
}

/**
 * Existing articles the November issue should keep visible.
 * Omitted on purpose: no EU fragrance-allergen article is in the repo.
 */
const PRIORITY_SLUGS = new Set([
  '2026-10-30-nmpa-first-uv-filter-new-ingredient',
  '2026-10-12-bpjph-370-cosmetics-sjph',
  '2026-10-29-bpjph-376-cosmetics-sales-services-sjph',
  '2026-10-31-bpjph-387-halal-product-types-cosmetics',
  '2026-10-17-indonesia-halal-cosmetics-2028',
  '2026-10-22-fda-mandatory-cosmetic-recall-guidance',
  '2026-10-31-california-ab1744-sunscreen-reef-safe-claims',
  '2026-10-31-samr-oral-care-national-standards',
  '2026-10-14-nmpa-toothpaste-classification-catalog',
  '2026-10-28-mee-new-chemical-cosmetics-exemption-retained',
  '2026-10-27-tga-sunscreen-reforms',
]);

/** Countries named for this issue, in the order the digest should surface them. */
const PRIORITY_COUNTRY_ORDER = ['cn', 'id', 'us', 'au'];

function digestStamp(item: NewsItem): { date: string; label: string } | null {
  if (item.sample || item.category !== 'regulation') return null;
  if (item.key_date && (isRegulatoryMilestone(item.key_date.label) || PRIORITY_SLUGS.has(item.slug))) {
    return { date: item.key_date.date, label: item.key_date.label };
  }
  if (PRIORITY_SLUGS.has(item.slug)) return { date: item.date, label: '资讯日期' };
  return null;
}

export interface DigestRow {
  slug: string;
  title: string;
  date: string;
  label: string;
  needs_review: boolean;
}

export interface DigestBlock {
  country: string;
  name_zh: string;
  href: string;
  known: boolean;
  rows: DigestRow[];
}

export interface RegulationDigest {
  effective: DigestBlock[];
  upcoming: DigestBlock[];
}

function digestBlocks(news: NewsItem[], keep: (date: string) => boolean): DigestBlock[] {
  const grouped = new Map<string, DigestRow[]>();
  for (const item of news) {
    const stamp = digestStamp(item);
    if (!stamp || !keep(stamp.date)) continue;
    const row: DigestRow = {
      slug: item.slug,
      title: item.title,
      date: stamp.date,
      label: stamp.label,
      needs_review: item.needs_review,
    };
    const codes = item.countries.length > 0 ? item.countries : [''];
    for (const code of codes) {
      const list = grouped.get(code) ?? [];
      if (!list.some((entry) => entry.slug === row.slug)) list.push(row);
      grouped.set(code, list);
    }
  }
  const order = new Map(getCompliance().map((country, index) => [country.country, index]));
  const byDate = (a: DigestRow, b: DigestRow) => {
    const rank = Number(PRIORITY_SLUGS.has(b.slug)) - Number(PRIORITY_SLUGS.has(a.slug));
    if (rank !== 0) return rank;
    if (a.date !== b.date) return a.date < b.date ? -1 : 1;
    return a.title.localeCompare(b.title, 'zh');
  };
  return [...grouped.entries()]
    .map(([code, rows]) => {
      const country = code ? getComplianceCountry(code) : undefined;
      return {
        country: code,
        name_zh: country?.name_zh ?? (code || '未标国家'),
        href: country ? `/compliance/${code}` : '/compliance',
        known: Boolean(country),
        rows: rows.sort(byDate),
      };
    })
    .sort((a, b) => {
      const rank = (block: DigestBlock) => {
        if (!block.rows.some((row) => PRIORITY_SLUGS.has(row.slug))) return 100;
        const index = PRIORITY_COUNTRY_ORDER.indexOf(block.country);
        return index === -1 ? 50 : index;
      };
      const byPriority = rank(a) - rank(b);
      if (byPriority !== 0) return byPriority;
      return (order.get(a.country) ?? 999) - (order.get(b.country) ?? 999) || a.name_zh.localeCompare(b.name_zh, 'zh');
    });
}

export function regulationDigest(): RegulationDigest {
  const news = getNews();
  const { effectiveFrom, effectiveThrough } = REGULATION_DIGEST;
  return {
    effective: digestBlocks(news, (date) => date >= effectiveFrom && date <= effectiveThrough),
    upcoming: digestBlocks(news, (date) => date > effectiveThrough),
  };
}
