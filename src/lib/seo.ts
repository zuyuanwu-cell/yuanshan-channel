import { url } from './format';
import type { ComplianceCountry } from './types';
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

export type TitleBrand = 'full' | 'channel';

/**
 * Document title. Search terms stay in `headline`; the brand sits after a fullwidth ｜.
 * Headlines that already contain ｜ are used as-is.
 */
export function composeDocumentTitle(
  headline: string | undefined,
  brand: TitleBrand,
  siteName: string,
  channel: string,
): string {
  const suffix = brand === 'channel' ? channel : siteName;
  const text = headline?.trim();
  if (!text) return `跨境美妆日化法规、目的国合规与热销榜｜${siteName}`;
  if (text.includes('｜')) return text;
  return `${text}｜${suffix}`;
}

/** Amazon 新加坡 follows the 2026-10-31 rewrite; other boards keep the existing headline. */
export function rankingDocumentHeadline(
  boardId: string,
  name: string,
  market: string,
  asOf?: string,
): { title: string; brand: TitleBrand } {
  if (boardId === 'amazon-sg' && asOf) {
    return { title: `Amazon 新加坡美妆日化热销榜（${asOf}）`, brand: 'channel' };
  }
  return { title: rankingSeoTitle(name, market, asOf), brand: 'full' };
}

/**
 * Major-market document titles and descriptions from the 2026-10-31 Baidu rewrite table.
 * Headlines omit the ｜远山频道 suffix; the layout adds it.
 */
const COMPLIANCE_SEO: Record<string, { title: string; description: string }> = {
  us: {
    title: '美国化妆品 FDA/MoCRA 合规：注册·列名·标签',
    description: '美国美妆：设施注册、产品列名、英文标签与 MoCRA 责任人要点；不用事先审批，附站内 FDA 资讯。',
  },
  eu: {
    title: '欧盟化妆品合规：CPNP 通报与责任人',
    description: '欧盟/德国美妆：欧盟责任人、CPNP 通报、安全报告；关注 REACH/禁限用更新（以官方为准）。',
  },
  id: {
    title: '印尼美妆 BPOM 备案与清真认证要点',
    description: '印尼：本地公司 BPOM 备案、印尼语标签；清真强制持证节点见 PP/BPJPH（货品证现顺延至 2028）。',
  },
  th: {
    title: '泰国美妆 FDA 通报与泰文标签',
    description: '泰国：本地进口商向 Thai FDA 逐品通报，标签须泰文；附禁限用相关资讯入口。',
  },
  my: {
    title: '马来西亚美妆 NPRA 通报（QUEST）',
    description: '马来西亚：本地 CNH 经 NPRA/QUEST 逐品通报，有效期约 2 年；需 PIF/安全评估。',
  },
  sg: {
    title: '新加坡美妆 HSA 通报与东盟标签',
    description: '新加坡：本地公司 HSA 产品通报（年更）；标签遵循东盟化妆品指令要点。',
  },
  au: {
    title: '澳洲美妆合规与 TGA 防晒改革要点',
    description: '澳大利亚美妆成分/标签要点；TGA 已公布防晒改革方向（成品测 SPF 等），落地时间表另定。',
  },
  vn: {
    title: '越南美妆 DAV 产品公告与 CFS',
    description: '越南：向 DAV 提交产品公告，常需自由销售证明 CFS；美妆出海东南亚常用目的国。',
  },
  ph: {
    title: '菲律宾美妆 LTO/CPN 备案要点',
    description: '菲律宾：本地进口商 LTO + 逐品 CPN；部分品类试点自动签发，以 FDA 通函为准。',
  },
  jp: {
    title: '日本化妆品制造销售业许可与备案',
    description: '日本：持化妆品制造销售业许可的本地公司进口备案；医薬部外品另审批；外原規节点见站内资讯。',
  },
  kr: {
    title: '韩国美妆责任销售业登记与通关申报',
    description: '韩国：进口商登记责任销售业，通关前预申报；美妆日化进韩常见门槛速览。',
  },
  uk: {
    title: '英国化妆品 SCPN 通报与英国责任人',
    description: '英国：英国责任人 + SCPN 通报，规则大体近欧盟；脱欧后勿与 CPNP 混用。',
  },
  ca: {
    title: '加拿大化妆品卫生部通报与过敏原标示',
    description: '加拿大：首次销售后限期向卫生部通报（通报≠批准）；香精过敏原标示宽限见站内说明。',
  },
  ru: {
    title: '俄罗斯美妆 EAC/ТР ТС 009 与禁限用',
    description: '俄罗斯：EAC 声明与诚信标志等；ТР ТС 009 禁限用清单按欧亚第74号决定更新（见站内资讯）。',
  },
  kz: {
    title: '哈萨克斯坦美妆欧亚 ТР ТС 009 合规',
    description: '哈萨克斯坦为欧亚成员，适用 ТР ТС 009；禁限用修订节点与俄/邻国页交叉阅读。',
  },
  cn: {
    title: '中国化妆品注册备案与新原料要点',
    description: '中国：特殊注册/普通备案、牙膏分类、新原料与环境登记等公开要求速览（做出海对照用）。',
  },
  br: {
    title: '巴西美妆 ANVISA 通报/注册要点',
    description: '巴西：本地公司持 AFE，产品按分级通报或注册；附禁限用相关资讯入口。',
  },
  sa: {
    title: '沙特美妆 SFDA 列名与 GSO 标签',
    description: '沙特：SFDA 列名、GSO 1943 标签；包装形态限制见站内 SFDA 相关资讯。',
  },
  ae: {
    title: '阿联酋美妆 ECAS/MoIAT 符合性要点',
    description: '阿联酋：MoIAT/ECAS 符合性；迪拜市政另册等以官方为准。',
  },
};

/** Short regulator token already present on the country record. Not a new claim. */
export function complianceRegulatorHook(items: ComplianceCountry['items']): string {
  const item = items.find((entry) => entry.mandatory) ?? items[0];
  const raw = item?.authority ?? '';
  const name = item?.name_zh ?? '';
  // The page says this regime does not apply, or the procedure was not verified.
  if (/不能套用|未核到|没有已核/.test(name)) return '上市要求';
  const acronym = raw.match(/[A-Z][A-Z0-9]{1,12}/);
  if (acronym && acronym[0] !== 'HS' && !raw.includes('拟')) return acronym[0];
  let auth = (raw.split(/[/／]/)[0] ?? '').trim();
  auth = auth.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '').trim();
  if (auth === '目的国海关') return '海关';
  if (auth.length > 0 && auth.length <= 8) return auth;
  const fromName = name.match(/[A-Z][A-Z0-9]{1,12}/);
  if (fromName && fromName[0] !== 'HS') return fromName[0];
  return '上市要求';
}

export function compliancePageSeo(country: Pick<ComplianceCountry, 'country' | 'name_zh' | 'summary' | 'items'>): {
  title: string;
  description: string;
} {
  const curated = COMPLIANCE_SEO[country.country];
  if (curated) return curated;
  return {
    title: `${country.name_zh}美妆${complianceRegulatorHook(country.items)}合规速查`,
    description: `${country.name_zh}美妆日化合规：${country.summary}`,
  };
}

/** Page URLs use the trailing slash Astro emits on directory indexes. */
export function pageUrl(path: string, origin: URL): string {
  const href = absoluteUrl(path, origin);
  return href.endsWith('/') ? href : `${href}/`;
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
