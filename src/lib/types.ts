export type NewsCategory = 'rules' | 'regulation';
export type HeroStatKey = 'news' | 'platforms' | 'rankings' | NewsCategory;
export type NavIcon = 'home' | 'news' | 'rankings' | 'platforms' | 'about' | 'compliance' | 'codes' | 'subscribe';
export type SocialId = 'douyin' | 'channels' | 'xiaohongshu' | 'weibo';

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
  hint?: string;
}

export interface FactoryPromo {
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface ContactConfig {
  wechatQr: string;
  wechatQrNote: string;
  collabLabel: string;
  webhookPath: string;
  sheetTitle: string;
  nameLabel: string;
  contactLabel: string;
  contactPlaceholder: string;
  messageLabel: string;
  submitLabel: string;
  sendingLabel: string;
  cancelLabel: string;
  closeLabel: string;
  successNote: string;
  errorNote: string;
  unconfiguredNote: string;
  rateLimitNote: string;
}

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
  social: SocialLink[];
  contact: ContactConfig;
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
  countries: string[];
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

export interface AboutCard {
  group: 'scope' | 'question';
  label: string;
  title: string;
  text: string;
}

export interface AboutPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface AboutTool {
  label: string;
  text: string;
  href?: string;
}

export interface AboutPage {
  title: string;
  summary: string;
  opening: {
    motto: string;
    meaning: string;
    paragraphs: string[];
    highlights: string[];
  };
  scope: {
    title: string;
    cards: AboutCard[];
    questionsTitle: string;
    questionsIntro: string;
    bridge: string;
    highlights: string[];
    photos: AboutPhoto[];
  };
  channel: {
    title: string;
    audience: string;
    paragraphs: string[];
    toolsLead: string;
    tools: AboutTool[];
    hope: string;
    highlights: string[];
  };
  boundary: {
    title: string;
    lead: string;
    cautions: string[];
    note: string;
    highlights: string[];
  };
  close: {
    paragraphs: string[];
    cta: string;
    note: string;
    highlights: string[];
  };
}

export type ComplianceType = 'local-rep' | 'registration' | 'safety' | 'testing' | 'label' | 'packaging' | 'marking' | 'halal' | 'platform' | 'tax-customs';

export type DocLayout =
  | 'letter'
  | 'table'
  | 'label'
  | 'lab'
  | 'certificate'
  | 'report'
  | 'dossier'
  | 'form'
  | 'platform'
  | 'marking'
  | 'receipt';

export type DocTemplateGroup = '委托与主体' | '配方与标签' | '检测与证明' | '登记与平台';

export interface DocSpecimenField {
  id?: string;
  role?: string;
  label?: string;
  name?: string;
  value?: string;
}

export interface DocSpecimen {
  kicker?: string;
  title: string;
  titleEn?: string;
  refLabel?: string;
  ref?: string;
  refId?: string;
  issuer?: string;
  subtitle?: string;
  coverId?: string;
  paragraphs?: string[];
  parties?: DocSpecimenField[];
  rows?: DocSpecimenField[];
  columns?: string[];
  table?: string[][];
  tableField?: string;
  checks?: string[];
  signs?: DocSpecimenField[];
  stamp?: string;
  qrCaption?: string;
  footer?: string;
  callout?: string;
  calloutId?: string;
  chips?: DocSpecimenField[];
}

export interface DocTemplate {
  id: string;
  name_zh: string;
  summary: string;
  group: DocTemplateGroup;
  layout: DocLayout;
  priority: number;
  preferTypes?: ComplianceType[];
  aliases: string[];
  highlights?: { alias: string; field: string }[];
  specimen: DocSpecimen;
}

export interface DocCatalog {
  disclaimer: string;
  badge: string;
  templates: DocTemplate[];
}
export interface ComplianceItem {
  id: string; name_zh: string; authority: string; type: ComplianceType; mandatory: boolean;
  cost: string; time: string; docs: string[]; who: string; note?: string;
  official_url: string; source_checked: string; needs_review: boolean;
}
export interface ComplianceCountry {
  country: string; name_zh: string; flag: string; region: string; difficulty: 1 | 2 | 3;
  summary: string; last_verified: string; steps: { title: string; type: ComplianceType }[];
  items: ComplianceItem[];
  hs_codes: { status: 'pending' | 'ready'; items: { code: string; name_zh: string; duty?: string; source_url?: string }[] };
}
