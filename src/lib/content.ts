import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { JSON_SCHEMA, load as loadYaml } from 'js-yaml';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { url } from './format';
import type {
  AboutPage,
  ComplianceCountry,
  BoardStatus,
  KeyDate,
  NewsCategory,
  NewsItem,
  Platform,
  Ranking,
  RankingBoard,
  RankingGap,
  RankingItem,
  SiteConfig,
} from './types';

const contentDir = path.join(process.cwd(), 'content');
const parser = new Marked({ gfm: true });
parser.use({
  renderer: {
    html() {
      return '';
    },
  },
  walkTokens(token) {
    if ((token.type === 'link' || token.type === 'image') && typeof token.href === 'string') {
      token.href = url(token.href);
    }
  },
});

let validated = false;

function ensureValid(): void {
  if (validated) return;
  execSync('node scripts/validate-content.mjs', {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
  validated = true;
}

function renderMarkdown(source: string): string {
  const html = parser.parse(source, { async: false });
  if (typeof html !== 'string') throw new Error('Markdown 渲染结果不是字符串');
  return html;
}

function parseFile(file: string) {
  const raw = fs.readFileSync(file, 'utf8');
  return matter(raw, {
    engines: {
      yaml: {
        parse: (source: string) => loadYaml(source, { schema: JSON_SCHEMA }) ?? {},
      },
    },
  });
}

function readKeyDate(value: unknown): KeyDate | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const { date, label } = value as Partial<KeyDate>;
  return typeof date === 'string' && typeof label === 'string' ? { date, label } : undefined;
}

function readNews(): NewsItem[] {
  const dir = path.join(contentDir, 'news');
  const items = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const parsed = parseFile(path.join(dir, file));
      const data = parsed.data as Partial<NewsItem>;
      const category = data.category;
      if (category !== 'rules' && category !== 'regulation') {
        throw new Error(`${file} 的 category 无效`);
      }
      return {
        slug: file.replace(/\.md$/, ''),
        title: String(data.title ?? ''),
        date: String(data.date ?? ''),
        category: category as NewsCategory,
        platforms: Array.isArray(data.platforms) ? data.platforms.map(String) : [],
        countries: Array.isArray((data as any).countries) ? (data as any).countries.map(String) : [],
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        source_url: String(data.source_url ?? ''),
        source_name: String(data.source_name ?? ''),
        checked: String(data.checked ?? ''),
        key_date: readKeyDate(data.key_date),
        highlight: data.highlight === true,
        summary: String(data.summary ?? ''),
        needs_review: data.needs_review === true,
        sample: data.sample === true,
        bodyHtml: renderMarkdown(parsed.content.trim()),
      } satisfies NewsItem;
    });
  return items.sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.slug < b.slug ? -1 : 1;
  });
}

function readRankings(): Ranking[] {
  const dir = path.join(contentDir, 'rankings');
  const rankings: Ranking[] = [];
  for (const platformId of fs.readdirSync(dir)) {
    const platformDir = path.join(dir, platformId);
    if (!fs.statSync(platformDir).isDirectory()) continue;
    for (const file of fs.readdirSync(platformDir)) {
      if (!file.endsWith('.json')) continue;
      const data = JSON.parse(fs.readFileSync(path.join(platformDir, file), 'utf8')) as Ranking;
      rankings.push(data);
    }
  }
  return rankings;
}

interface Cache {
  site: SiteConfig;
  platforms: Platform[];
  platformUpdated: string;
  platformSourceNote: string;
  news: NewsItem[];
  rankings: Ranking[];
  about: AboutPage;
}

let cache: Cache | null = null;

function loadContent(): Cache {
  if (cache) return cache;
  ensureValid();
  const site = JSON.parse(fs.readFileSync(path.join(contentDir, 'site.json'), 'utf8')) as SiteConfig;
  const catalog = JSON.parse(fs.readFileSync(path.join(contentDir, 'platforms.json'), 'utf8')) as {
    updated: string;
    source_note: string;
    platforms: Platform[];
  };
  const aboutFile = parseFile(path.join(contentDir, 'about.md'));
  const aboutData = aboutFile.data as AboutPage;
  if (!aboutData.opening || !aboutData.scope || !aboutData.channel || !aboutData.boundary || !aboutData.close) {
    throw new Error('content/about.md: 缺少开场、业务范围、频道、使用说明或收尾字段');
  }
  cache = {
    site,
    platforms: catalog.platforms,
    platformUpdated: catalog.updated,
    platformSourceNote: catalog.source_note,
    news: readNews(),
    rankings: readRankings(),
    about: aboutData,
  };
  return cache;
}

export function getSite(): SiteConfig {
  return loadContent().site;
}

export function getPlatforms(): Platform[] {
  return loadContent().platforms;
}

export function getPlatform(id: string): Platform | undefined {
  return getPlatforms().find((platform) => platform.id === id);
}

export function getPlatformMeta(): { updated: string; sourceNote: string } {
  const content = loadContent();
  return { updated: content.platformUpdated, sourceNote: content.platformSourceNote };
}

export function getNews(): NewsItem[] {
  return loadContent().news;
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getNews().find((item) => item.slug === slug);
}

export function relatedNews(item: NewsItem, limit = 3): NewsItem[] {
  const score = (other: NewsItem) =>
    other.platforms.filter((id) => item.platforms.includes(id)).length * 2 +
    other.tags.filter((tag) => item.tags.includes(tag)).length +
    (other.category === item.category ? 1 : 0);
  return getNews()
    .filter((other) => other.slug !== item.slug && score(other) > 0)
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

export function getRankings(): Ranking[] {
  return loadContent().rankings;
}

export function getRankingsFor(platformId: string): Ranking[] {
  return getRankings()
    .filter((ranking) => ranking.platform === platformId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function rankingDateCount(platformId: string): number {
  return getRankings().filter((ranking) => ranking.platform === platformId).length;
}

export function latestRankingByPlatform(): Ranking[] {
  const latest = new Map<string, Ranking>();
  for (const ranking of getRankings()) {
    const previous = latest.get(ranking.platform);
    if (!previous || ranking.date > previous.date) latest.set(ranking.platform, ranking);
  }
  const order = getBoards().map((board) => board.id);
  return [...latest.values()].sort((a, b) => order.indexOf(a.platform) - order.indexOf(b.platform));
}

export function getBoards(): RankingBoard[] {
  return getSite().rankingPlatforms;
}

export function getBoard(id: string): RankingBoard | undefined {
  return getBoards().find((board) => board.id === id);
}

export function boardName(id: string): string {
  return getBoard(id)?.name ?? id;
}

export function boardStatus(id: string): BoardStatus {
  if (hasRanking(id)) return 'live';
  return getSite().rankingGaps.some((gap) => gap.platform === id) ? 'gap' : 'planned';
}

/** First board with a published ranking for a catalog platform, so platform pages can link to it. */
export function liveBoardFor(platformId: string): RankingBoard | undefined {
  return getBoards().find((board) => (board.platform ?? board.id) === platformId && hasRanking(board.id));
}

export function itemTitle(item: RankingItem): { main: string; original?: string } {
  const main = item.title_zh ?? item.title;
  return { main, original: main !== item.title ? item.title : undefined };
}

export function itemImage(item: RankingItem): { thumb: string; zoom: string } | undefined {
  const thumb = item.image ? url(item.image) : item.image_url;
  if (!thumb) return undefined;
  return { thumb, zoom: item.image_zoom_url ?? thumb };
}

export function featuredPlatforms(): Platform[] {
  const byId = new Map(getPlatforms().map((platform) => [platform.id, platform]));
  return getSite().featuredPlatformIds.flatMap((id) => {
    const platform = byId.get(id);
    return platform ? [platform] : [];
  });
}

export function hasRanking(platformId: string): boolean {
  return getRankings().some((ranking) => ranking.platform === platformId);
}

export function getAbout(): AboutPage {
  return loadContent().about;
}

export function latestContentDate(): string {
  const dates = [
    getSite().updated,
    ...getNews().map((item) => item.checked),
    ...getRankings().map((item) => item.date),
  ];
  return dates.sort().at(-1) ?? getSite().updated;
}

export function latestNewsCheck(): string {
  return getNews().map((item) => item.checked).sort().at(-1) ?? getSite().updated;
}

export function latestCapture(): string | undefined {
  return getRankings().map((item) => item.captured_at).sort().at(-1);
}

function dayNumber(iso: string): number {
  const [year, month, day] = iso.split('-').map(Number);
  return Date.UTC(year ?? 1970, (month ?? 1) - 1, day ?? 1) / 86_400_000;
}

/** Days from the site's content date to `iso`; negative when already past. Static builds have no "now". */
export function daysFromToday(iso: string): number {
  return Math.round(dayNumber(iso) - dayNumber(latestContentDate()));
}

export function highlightNews(limit = 4): NewsItem[] {
  const flagged = getNews().filter((item) => item.highlight && item.key_date);
  const upcoming = flagged
    .filter((item) => daysFromToday(item.key_date!.date) >= 0)
    .sort((a, b) => (a.key_date!.date < b.key_date!.date ? -1 : 1));
  const past = flagged
    .filter((item) => daysFromToday(item.key_date!.date) < 0)
    .sort((a, b) => (a.key_date!.date < b.key_date!.date ? 1 : -1));
  return [...upcoming, ...past].slice(0, limit);
}

export function newsTagFacets(): { id: string; label: string; count: number }[] {
  const labels = getSite().newsTags;
  return Object.entries(labels)
    .map(([id, label]) => ({ id, label, count: getNews().filter((item) => item.tags.includes(id)).length }))
    .filter((facet) => facet.count > 0);
}

export function newsPlatformFacets(): { id: string; label: string; count: number }[] {
  return getPlatforms()
    .map((platform) => ({
      id: platform.id,
      label: platform.name,
      count: getNews().filter((item) => item.platforms.includes(platform.id)).length,
    }))
    .filter((facet) => facet.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function getRankingGaps(): RankingGap[] {
  return getSite().rankingGaps.filter((gap) => !hasRanking(gap.platform));
}

const REGION_ORDER = ['北美', '欧洲', '东南亚', '东亚', '俄语区', '中东', '拉美'];
let complianceCache: ComplianceCountry[] | undefined;
export function getCompliance(): ComplianceCountry[] {
  if (complianceCache) return complianceCache;
  const dir = path.join(contentDir, 'compliance');
  const list = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as ComplianceCountry)
    : [];
  complianceCache = list.sort((a, b) => REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) || a.country.localeCompare(b.country));
  return complianceCache;
}
export function getComplianceCountry(cc: string): ComplianceCountry | undefined {
  return getCompliance().find((c) => c.country === cc);
}
export function newsForCountry(cc: string, limit = 6) {
  return getNews().filter((n) => n.countries.includes(cc)).slice(0, limit);
}
export function recentNewsForCountry(cc: string, days = 30): number {
  return getNews().filter((n) => n.countries.includes(cc) && daysFromToday(n.date) <= days).length;
}
export const complianceTypeLabels: Record<string, string> = {
  'local-rep': '本地代表', registration: '备案注册', safety: '安全档案', testing: '配方检测', label: '标签',
  packaging: '包装注册', marking: '赋码', halal: '清真', platform: '平台资质', 'tax-customs': '清关税号',
};


export interface HsCodeItem {
  country: string;
  country_code: string;
  product_zh: string;
  product_en: string;
  hs6: string;
  national_code: string | null;
  official_description: string | null;
  description_zh: string | null;
  import_duty: string | null;
  vat_or_gst: string | null;
  other_tax_notes: string | null;
  fta_china: string | null;
  export_rebate: string | null;
  source_url: string | null;
  source_type: string | null;
  verification: string;
  verified_date: string | null;
}

export interface HsCodesDataset {
  version: string;
  title: string;
  products_count: number;
  countries: Record<string, { name_zh: string; rows: number; with_duty: number; verification: Record<string, number> }>;
  items: HsCodeItem[];
  verification_legend: Record<string, string>;
}

let hsCache: HsCodesDataset | undefined;
export function getHsCodesDataset(): HsCodesDataset {
  if (hsCache) return hsCache;
  const file = path.join(contentDir, 'datasets/hs-codes/beauty.json');
  hsCache = JSON.parse(fs.readFileSync(file, 'utf8')) as HsCodesDataset;
  return hsCache;
}
