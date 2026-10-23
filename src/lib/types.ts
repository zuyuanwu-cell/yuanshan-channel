export type NewsCategory = 'rules' | 'regulation';
export type HeroStatKey = 'news' | 'platforms' | 'rankings' | NewsCategory;
export type NavIcon = 'home' | 'news' | 'rankings' | 'platforms' | 'about';

export interface HeroCard {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  colorTop: string;
  colorBottom: string;
  statKey?: HeroStatKey;
  statLabel?: string;
  featured?: boolean;
}

export interface HeroConfig {
  badge: string;
  badgeNote: string;
  titleLine1: string;
  titleLine2: string;
  lede: string;
  cardCta: string;
  swipeHint: string;
  tags: { label: string; tone: 'teal' | 'coral' | 'violet' | 'lime'; side: 'left' | 'right' }[];
  cards: HeroCard[];
}

export interface SectionCopy {
  index: string;
  title: string;
  note: string;
}

export interface PageCopy {
  title: string;
  note: string;
}

export interface SiteConfig {
  name: string;
  slug: string;
  brand: string;
  channel: string;
  tagline: string;
  focus: string;
  locale: string;
  updated: string;
  disclaimer: string;
  footerNote: string;
  featuredPlatformIds: string[];
  featuredNote: string;
  nav: { href: string; label: string; icon: NavIcon }[];
  headerCta: { label: string; href: string };
  hero: HeroConfig;
  categoryLabels: Record<NewsCategory | 'beauty-personal-care', string>;
  regions: string[];
  stamps: { sample: string; needsReview: string };
  reviewBanner: string;
  rankingBanner: string;
  newsTags: Record<string, string>;
  rankingGaps: RankingGap[];
  rankingPlatforms: RankingBoard[];
  sections: {
    highlights: SectionCopy;
    news: SectionCopy;
    regulation: SectionCopy;
    rankings: SectionCopy;
    platforms: SectionCopy;
  };
  pages: {
    news: PageCopy;
    rankings: PageCopy;
    platforms: PageCopy;
  };
  empty: {
    highlights: string;
    news: string;
    regulation: string;
    rankings: string;
    platforms: string;
  };
  notFound: { title: string; body: string };
  ui: {
    skip: string;
    all: string;
    beautyOnly: string;
    beautyPill: string;
    allNews: string;
    allRankings: string;
    allPlatforms: string;
    viewRanking: string;
    viewSource: string;
    officialSite: string;
    sellerEntry: string;
    entryFees: string;
    entry: string;
    fees: string;
    note: string;
    pricePending: string;
    filterEmpty: string;
    updatedPrefix: string;
    backNews: string;
    backRankings: string;
    related: string;
    market: string;
    focus: string;
    filterNews: string;
    filterRegion: string;
    openFull: string;
    sourceLabel: string;
    platformsLabel: string;
    switchDate: string;
    brandMark: string;
    filterTag: string;
    filterPlatform: string;
    updatedAt: string;
    checkedAt: string;
    capturedAt: string;
    publishedAt: string;
    partial: string;
    daysLeft: string;
    daysPast: string;
    today: string;
    noRanking: string;
    rankingTop: string;
    resetFilters: string;
    sourceName: string;
    coverage: string;
    keyDate: string;
    boardPlan: string;
    boardPlanNote: string;
    boardLive: string;
    boardPlanned: string;
    zoomImage: string;
    closeImage: string;
    noImage: string;
    originalTitle: string;
    rating: string;
    reviews: string;
    sales: string;
  };
}

export interface Platform {
  id: string;
  name: string;
  url: string;
  seller_url: string;
  region: string;
  market: string;
  mentions_beauty: boolean;
  focus: string;
  pitch: string;
  entry?: string;
  fees?: string;
  note?: string;
  screenshot_needed?: boolean;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  platforms: string[];
  tags: string[];
  source_url: string;
  source_name: string;
  checked: string;
  key_date?: KeyDate;
  highlight: boolean;
  summary: string;
  needs_review: boolean;
  sample: boolean;
  bodyHtml: string;
}

export interface KeyDate {
  date: string;
  label: string;
}

export interface RankingGap {
  platform: string;
  tried: string;
  reason: string;
  source_url: string;
}

export interface RankingBoard {
  id: string;
  name: string;
  code: string;
  market: string;
  platform?: string;
  board_url?: string;
}

export type BoardStatus = 'live' | 'gap' | 'planned';

export interface RankingItem {
  rank: number;
  title: string;
  title_zh?: string;
  brand: string;
  image_url?: string;
  image_zoom_url?: string;
  image?: string;
  sales_text?: string;
  bought_text?: string;
  rating?: number;
  reviews_count?: number | string;
  price?: string | number | null;
  currency?: string;
  url?: string;
  note?: string;
  needs_review: boolean;
}

export interface Ranking {
  platform: string;
  date: string;
  captured_at: string;
  category: 'beauty-personal-care';
  sample: boolean;
  needs_review: boolean;
  partial: boolean;
  coverage_note?: string;
  source_name: string;
  source_url: string;
  source_note: string;
  items: RankingItem[];
}

export interface AboutPage {
  title: string;
  summary: string;
  html: string;
}
