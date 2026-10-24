import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import { JSON_SCHEMA, load as loadYaml } from 'js-yaml';
import matter from 'gray-matter';
import { matchDoc, normalizeDocName } from '../src/lib/doc-match.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const schemaDir = path.join(contentDir, 'schemas');

const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    fail(`${rel(file)}: JSON 无法解析（${error instanceof Error ? error.message : error}）`);
    return null;
  }
}

function rel(file) {
  return path.relative(root, file);
}

function isRealDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function parseFrontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  try {
    return matter(raw, {
      engines: {
        yaml: {
          parse: (source) => loadYaml(source, { schema: JSON_SCHEMA }) ?? {},
        },
      },
    });
  } catch (error) {
    fail(`${rel(file)}: frontmatter 无法解析（${error instanceof Error ? error.message : error}）`);
    return null;
  }
}

function schemaErrors(file, validate, data) {
  if (validate(data)) return;
  for (const error of validate.errors ?? []) {
    const where = error.instancePath || '/';
    fail(`${rel(file)}: ${where} ${error.message ?? '无效'}`);
  }
}

const ajv = new Ajv({ allErrors: true, strict: false });
const platformSchema = readJson(path.join(schemaDir, 'platform.schema.json'));
const validatePlatform = platformSchema ? ajv.compile(platformSchema) : null;
const validatePlatforms = ajv.compile(readJson(path.join(schemaDir, 'platforms.schema.json')));
const validateSite = ajv.compile(readJson(path.join(schemaDir, 'site.schema.json')));
const validateNews = ajv.compile(readJson(path.join(schemaDir, 'news.schema.json')));
const validateRanking = ajv.compile(readJson(path.join(schemaDir, 'ranking.schema.json')));
const validateAbout = ajv.compile(readJson(path.join(schemaDir, 'about.schema.json')));
const validateCompliance = ajv.compile(readJson(path.join(schemaDir, 'compliance.schema.json')));
const validateFactoryPromo = ajv.compile(readJson(path.join(schemaDir, 'factory-promo.schema.json')));
const validateDocTemplates = ajv.compile(readJson(path.join(schemaDir, 'doc-templates.schema.json')));

const allowedRoot = new Set([
  'site.json',
  'platforms.json',
  'about.md',
  'CONTENT.md',
  'schemas',
  'news',
  'rankings',
  'assets',
  'compliance',
  'datasets',
  'factory-promo.json',
]);

if (!fs.existsSync(contentDir)) {
  fail('缺少 content/ 目录');
} else {
  for (const entry of fs.readdirSync(contentDir)) {
    if (!allowedRoot.has(entry)) fail(`content/${entry}: 不在约定目录里。每日更新只使用 content 下已有文件夹。`);
  }
}

const sitePath = path.join(contentDir, 'site.json');
const site = fs.existsSync(sitePath) ? readJson(sitePath) : null;
if (site) {
  schemaErrors(sitePath, validateSite, site);
  if (site.updated && !isRealDate(site.updated)) fail('content/site.json: updated 不是真实日期');
  for (const [index, card] of (site.hero?.cards ?? []).entries()) {
    if (typeof card.image !== 'string' || !card.image.startsWith('/media/')) continue;
    const file = path.join(contentDir, 'assets', card.image.slice('/media/'.length));
    if (!fs.existsSync(file)) fail(`content/site.json: hero.cards[${index}].image 找不到文件 ${rel(file)}`);
  }
  if ((site.hero?.cards ?? []).filter((card) => card.featured).length > 1) {
    fail('content/site.json: hero.cards 里最多一张 featured');
  }
  if (typeof site.contact?.wechatQr === 'string' && site.contact.wechatQr.startsWith('/media/')) {
    const qrFile = path.join(contentDir, 'assets', site.contact.wechatQr.slice('/media/'.length));
    if (!fs.existsSync(qrFile)) fail(`content/site.json: contact.wechatQr 找不到文件 ${rel(qrFile)}`);
  }
  const socialIds = new Set();
  for (const [index, item] of (site.social ?? []).entries()) {
    if (!item || typeof item !== 'object') continue;
    if (socialIds.has(item.id)) fail(`content/site.json: social[${index}] id「${item.id}」重复`);
    if (item.id) socialIds.add(item.id);
  }
}

const platformsPath = path.join(contentDir, 'platforms.json');
const catalog = fs.existsSync(platformsPath) ? readJson(platformsPath) : null;
const platformIds = new Set();
if (catalog) {
  schemaErrors(platformsPath, validatePlatforms, catalog);
  if (catalog.updated && !isRealDate(catalog.updated)) fail('content/platforms.json: updated 不是真实日期');
  const regions = new Set(site?.regions ?? []);
  for (const [index, platform] of (catalog.platforms ?? []).entries()) {
    const label = `content/platforms.json platforms[${index}]`;
    if (validatePlatform) schemaErrors(platformsPath, validatePlatform, platform);
    if (platform && typeof platform === 'object') {
      if (platformIds.has(platform.id)) fail(`${label}: id「${platform.id}」重复`);
      if (platform.id) platformIds.add(platform.id);
      if (platform.region && regions.size && !regions.has(platform.region)) {
        fail(`${label}: region「${platform.region}」不在 site.json regions 里`);
      }
    }
  }
}

if (site?.featuredPlatformIds) {
  for (const id of site.featuredPlatformIds) {
    if (!platformIds.has(id)) fail(`content/site.json: featuredPlatformIds 含未知平台「${id}」`);
  }
}

const boardIds = new Set();
for (const [index, board] of (site?.rankingPlatforms ?? []).entries()) {
  const label = `content/site.json rankingPlatforms[${index}]`;
  if (boardIds.has(board.id)) fail(`${label}: id「${board.id}」重复`);
  boardIds.add(board.id);
  if (board.platform && !platformIds.has(board.platform)) {
    fail(`${label}: platform「${board.platform}」不在 platforms.json 里`);
  }
}

const complianceDir = path.join(contentDir, 'compliance');
const countryIds = new Set();
let complianceItems = 0;
const docMentions = [];
if (fs.existsSync(complianceDir)) {
  for (const fileName of fs.readdirSync(complianceDir)) {
    const file = path.join(complianceDir, fileName);
    if (!/^[a-z]{2}\.json$/.test(fileName)) {
      fail(`${rel(file)}: 文件名须为两位国家代码 xx.json`);
      continue;
    }
    const data = readJson(file);
    if (!data) continue;
    schemaErrors(file, validateCompliance, data);
    if (data.country !== fileName.slice(0, 2)) fail(`${rel(file)}: country 与文件名不一致`);
    countryIds.add(data.country);
    if (data.last_verified && !isRealDate(data.last_verified)) fail(`${rel(file)}: last_verified 不是真实日期`);
    const ids = new Set();
    for (const item of data.items ?? []) {
      complianceItems += 1;
      if (ids.has(item.id)) fail(`${rel(file)}: item id「${item.id}」重复`);
      ids.add(item.id);
      if (item.source_checked && !isRealDate(item.source_checked)) fail(`${rel(file)}: ${item.id} source_checked 不是真实日期`);
      for (const doc of item.docs ?? []) {
        if (typeof doc === 'string') docMentions.push({ name: doc, type: item.type });
      }
    }
  }
}

const newsDir = path.join(contentDir, 'news');
const newsName = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
let newsCount = 0;
if (!fs.existsSync(newsDir)) {
  fail('缺少 content/news/');
} else {
  for (const fileName of fs.readdirSync(newsDir)) {
    const file = path.join(newsDir, fileName);
    if (!fs.statSync(file).isFile()) {
      fail(`${rel(file)}: news 目录里只放 Markdown 文件`);
      continue;
    }
    if (!newsName.test(fileName)) {
      fail(`${rel(file)}: 文件名须为 YYYY-MM-DD-slug.md`);
      continue;
    }
    const parsed = parseFrontmatter(file);
    if (!parsed) continue;
    const data = parsed.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      fail(`${rel(file)}: frontmatter 必须是对象`);
      continue;
    }
    schemaErrors(file, validateNews, data);
    newsCount += 1;
    const stemDate = fileName.slice(0, 10);
    if (data.date && data.date !== stemDate) {
      fail(`${rel(file)}: 文件名日期 ${stemDate} 与 frontmatter date ${data.date} 不一致`);
    }
    if (data.date && !isRealDate(data.date)) fail(`${rel(file)}: date 不是真实日期`);
    if (data.sample === true && data.needs_review !== true) {
      fail(`${rel(file)}: 示例稿必须同时标 needs_review: true`);
    }
    for (const id of data.platforms ?? []) {
      if (!platformIds.has(id)) fail(`${rel(file)}: platforms 含未知 id「${id}」`);
    }
    for (const cc of data.countries ?? []) {
      if (countryIds.size && !countryIds.has(cc)) fail(`${rel(file)}: countries 含未知国家「${cc}」`);
    }
    for (const tag of data.tags ?? []) {
      if (!site?.newsTags?.[tag]) fail(`${rel(file)}: tags 含 site.json newsTags 里没有的「${tag}」`);
    }
    if (data.checked && !isRealDate(data.checked)) fail(`${rel(file)}: checked 不是真实日期`);
    if (data.checked && data.date && data.checked < data.date) {
      fail(`${rel(file)}: checked（核对日）不能早于 date`);
    }
    if (data.key_date && !isRealDate(data.key_date.date)) fail(`${rel(file)}: key_date.date 不是真实日期`);
    if (data.highlight === true && !data.key_date) {
      fail(`${rel(file)}: highlight: true 的条目必须有 key_date，首页看点按它排序`);
    }
    const body = parsed.content.trim();
    if (body.length < 20) fail(`${rel(file)}: 正文过短`);
    if (/<script/i.test(body)) fail(`${rel(file)}: 正文不要写 script 标签`);
  }
}

const rankingsDir = path.join(contentDir, 'rankings');
let rankingCount = 0;
if (!fs.existsSync(rankingsDir)) {
  fail('缺少 content/rankings/');
} else {
  for (const platformId of fs.readdirSync(rankingsDir)) {
    const platformDir = path.join(rankingsDir, platformId);
    if (!fs.statSync(platformDir).isDirectory()) {
      fail(`${rel(platformDir)}: rankings 下只能是平台目录`);
      continue;
    }
    if (!boardIds.has(platformId)) {
      fail(`${rel(platformDir)}: 目录「${platformId}」不在 site.json rankingPlatforms 里`);
    }
    const seenDates = new Set();
    for (const fileName of fs.readdirSync(platformDir)) {
      const file = path.join(platformDir, fileName);
      if (!/^\d{4}-\d{2}-\d{2}\.json$/.test(fileName)) {
        fail(`${rel(file)}: 榜单文件名须为 YYYY-MM-DD.json`);
        continue;
      }
      const data = readJson(file);
      if (!data) continue;
      schemaErrors(file, validateRanking, data);
      rankingCount += 1;
      const stemDate = fileName.slice(0, 10);
      if (data.date && data.date !== stemDate) {
        fail(`${rel(file)}: 文件名日期与 date 不一致`);
      }
      if (data.date && !isRealDate(data.date)) fail(`${rel(file)}: date 不是真实日期`);
      if (seenDates.has(data.date)) fail(`${rel(file)}: 同一平台日期重复`);
      if (data.date) seenDates.add(data.date);
      if (data.platform && data.platform !== platformId) {
        fail(`${rel(file)}: platform「${data.platform}」与目录「${platformId}」不一致`);
      }
      if (data.sample === true && data.needs_review !== true) {
        fail(`${rel(file)}: 示例榜单必须同时标 needs_review: true`);
      }
      if (typeof data.captured_at === 'string') {
        if (Number.isNaN(Date.parse(data.captured_at))) fail(`${rel(file)}: captured_at 不是有效时间`);
        else if (data.captured_at.slice(0, 10) !== data.date) {
          fail(`${rel(file)}: captured_at 的日期部分须等于 date（按抓取地时区写）`);
        }
      }
      const ranks = new Set();
      for (const [index, item] of (data.items ?? []).entries()) {
        const itemLabel = `${rel(file)} items[${index}]`;
        if (ranks.has(item.rank)) fail(`${itemLabel}: rank ${item.rank} 重复`);
        ranks.add(item.rank);
        if (data.sample === true && item.needs_review === false) {
          fail(`${itemLabel}: 示例榜单里不能有已核实条目`);
        }
        if (data.needs_review === false && item.needs_review !== false) {
          fail(`${itemLabel}: 榜单标为已核实，但条目仍待核实`);
        }
        if (item.needs_review === false && /占位|待核对/.test(`${item.title ?? ''} ${item.brand ?? ''}`)) {
          fail(`${itemLabel}: 标题或品牌仍是占位，不能标成已核实`);
        }
        if (item.needs_review === false && item.url && data.source_url && item.url === data.source_url) {
          fail(`${itemLabel}: 已核实条目要填单品链接，不能只重复榜单 source_url`);
        }
        if (item.image_zoom_url && !item.image_url && !item.image) {
          fail(`${itemLabel}: 有 image_zoom_url 时也要有 image_url 或 image`);
        }
        if (typeof item.image === 'string' && item.image.startsWith('/media/')) {
          const imageFile = path.join(contentDir, 'assets', item.image.slice('/media/'.length));
          if (!fs.existsSync(imageFile)) fail(`${itemLabel}: image 找不到文件 ${rel(imageFile)}`);
        }
        if (item.reviews_count !== undefined && item.rating === undefined) {
          fail(`${itemLabel}: 有 reviews_count 时要同时写页面上的 rating`);
        }
        if (data.sample !== true) {
          if (!item.title_zh || !String(item.title_zh).trim()) {
            fail(`${itemLabel}: 发布榜单必须有中文 title_zh（读者看不懂外文标题）`);
          } else if (!/[\u4e00-\u9fff]/.test(item.title_zh)) {
            fail(`${itemLabel}: title_zh 须含汉字，不能只是外文或品牌前缀`);
          } else if (item.title_zh === item.title) {
            fail(`${itemLabel}: title_zh 与 title 相同，不是中文标题就别填`);
          }
        } else if (item.title_zh && item.title_zh === item.title) {
          fail(`${itemLabel}: title_zh 与 title 相同，不是中文标题就别填`);
        }
      }
    }
  }
}

for (const [index, gap] of (site?.rankingGaps ?? []).entries()) {
  const label = `content/site.json rankingGaps[${index}]`;
  if (!boardIds.has(gap.platform)) fail(`${label}: 「${gap.platform}」不在 site.json rankingPlatforms 里`);
  if (gap.tried && !isRealDate(gap.tried)) fail(`${label}: tried 不是真实日期`);
}

function joinedText(value) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(joinedText).filter(Boolean).join('\n');
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => key !== 'highlights')
      .map(([, item]) => joinedText(item))
      .filter(Boolean)
      .join('\n');
  }
  return '';
}

function requireHighlights(label, phrases, blob) {
  if (!Array.isArray(phrases)) return;
  for (const phrase of phrases) {
    if (typeof phrase !== 'string' || !blob.includes(phrase)) {
      fail(`${label}: 高亮「${phrase}」不在本节原文里`);
    }
  }
}

const aboutPath = path.join(contentDir, 'about.md');
if (!fs.existsSync(aboutPath)) {
  fail('缺少 content/about.md');
} else {
  const parsed = parseFrontmatter(aboutPath);
  if (parsed) {
    schemaErrors(aboutPath, validateAbout, parsed.data);
    if (parsed.content.trim().length < 40) fail('content/about.md: 正文过短');
    const data = parsed.data ?? {};
    const cards = data.scope?.cards ?? [];
    if (!cards.some((card) => card.group === 'scope') || !cards.some((card) => card.group === 'question')) {
      fail('content/about.md: 业务范围需要同时有工厂供应链卡片和三个具体问题');
    }
    for (const [index, photo] of (data.scope?.photos ?? []).entries()) {
      if (typeof photo?.alt === 'string' && !/[\u4e00-\u9fff]/.test(photo.alt)) {
        fail(`content/about.md: scope.photos[${index}].alt 须含汉字`);
      }
      if (typeof photo?.src === 'string' && photo.src.startsWith('/media/')) {
        const file = path.join(contentDir, 'assets', photo.src.slice('/media/'.length));
        if (!fs.existsSync(file)) fail(`content/about.md: scope.photos[${index}] 找不到文件 ${rel(file)}`);
      }
    }
    requireHighlights('content/about.md opening', data.opening?.highlights, joinedText(data.opening));
    requireHighlights('content/about.md scope', data.scope?.highlights, joinedText(data.scope));
    requireHighlights('content/about.md channel', data.channel?.highlights, joinedText(data.channel));
    requireHighlights(
      'content/about.md boundary',
      data.boundary?.highlights,
      `${joinedText(data.boundary)}\n${site?.footerNote ?? ''}\n${site?.disclaimer ?? ''}`,
    );
    requireHighlights('content/about.md close', data.close?.highlights, joinedText(data.close));
  }
}

const factoryPromoPath = path.join(contentDir, 'factory-promo.json');
const factoryPromo = fs.existsSync(factoryPromoPath) ? readJson(factoryPromoPath) : null;
if (!factoryPromo) fail('缺少 content/factory-promo.json');
else schemaErrors(factoryPromoPath, validateFactoryPromo, factoryPromo);

const contentDoc = path.join(contentDir, 'CONTENT.md');
if (!fs.existsSync(contentDoc) || fs.readFileSync(contentDoc, 'utf8').trim().length < 40) {
  fail('缺少 content/CONTENT.md，或内容过短');
}

const docTemplatesPath = path.join(contentDir, 'datasets', 'doc-templates.json');
const docTemplates = fs.existsSync(docTemplatesPath) ? readJson(docTemplatesPath) : null;
let docCoverageLine = '';
if (!docTemplates) fail('缺少 content/datasets/doc-templates.json');
else {
  schemaErrors(docTemplatesPath, validateDocTemplates, docTemplates);
  if (validateDocTemplates(docTemplates)) {
    const templates = docTemplates.templates ?? [];
    const ids = new Set();
    const fieldIdsOf = (specimen) => {
      const ids = new Set();
      for (const key of ['rows', 'parties', 'chips', 'signs']) {
        for (const row of specimen?.[key] ?? []) if (row?.id) ids.add(row.id);
      }
      for (const key of ['refId', 'coverId', 'tableField', 'calloutId']) {
        if (specimen?.[key]) ids.add(specimen[key]);
      }
      return ids;
    };
    for (const template of templates) {
      if (ids.has(template.id)) fail(`content/datasets/doc-templates.json: id「${template.id}」重复`);
      ids.add(template.id);
      const fields = fieldIdsOf(template.specimen);
      for (const highlight of template.highlights ?? []) {
        if (!fields.has(highlight.field)) {
          fail(`content/datasets/doc-templates.json: ${template.id} 高亮「${highlight.field}」不在样张里`);
        }
      }
      for (const alias of template.aliases ?? []) {
        if (normalizeDocName(alias).length < 2) fail(`content/datasets/doc-templates.json: ${template.id} 别名「${alias}」去掉标点后太短`);
        const hit = matchDoc(alias, templates);
        if (!hit || hit.id !== template.id) {
          fail(`content/datasets/doc-templates.json: ${template.id} 的别名「${alias}」对到了 ${hit?.id ?? '无'}`);
        }
      }
      const columns = template.specimen?.columns;
      for (const row of template.specimen?.table ?? []) {
        if (columns && row.length !== columns.length) {
          fail(`content/datasets/doc-templates.json: ${template.id} 表格列数不一致`);
        }
      }
    }
    const samples = [
      ['授权书', 'local-rep', 'authorization', 'scope'],
      ['品牌授权书', 'local-rep', 'authorization', 'scope'],
      ['RP 委托协议', 'local-rep', 'authorization', 'grantee'],
      ['成分', 'registration', 'ingredient', 'inci'],
      ['全成分', 'label', 'ingredient', 'inci'],
      ['成分（降序）', 'label', 'ingredient', 'inci'],
      ['INCI 成分表', 'label', 'ingredient', 'inci'],
      ['标签', 'label', 'label', null],
      ['批号', 'label', 'label', 'batch'],
      ['净含量（英制+公制）', 'label', 'label', 'net'],
      ['责任人名称地址', 'label', 'label', 'rp'],
      ['实验室检测报告', 'registration', 'test-report', 'result'],
      ['GSO 1943 检测报告', 'registration', 'test-report', 'result'],
      ['GMP/质量体系证明（6d 方案）', 'registration', 'gmp', 'standard'],
      ['CFS/GMP 证明', 'local-rep', 'gmp', 'standard'],
      ['自由销售证明', 'registration', 'free-sale', 'product'],
      ['CFS（领事认证）', 'registration', 'free-sale', 'product'],
      ['符合性声明号', 'platform', 'conformity', 'number'],
      ['标识码', 'platform', 'platform', 'code'],
      ['ТН ВЭД 编码', 'platform', 'platform', 'hs'],
      ['美国代理人（境外工厂）', 'registration', 'local-rep', 'rep'],
      ['RP 名称地址', 'label', 'label', 'rp'],
      ['RP 信息', 'registration', 'local-rep', 'rep'],
      ['PIF', 'safety', 'pif', 'cover'],
      ['CPSR 安全评估', 'safety', 'safety', 'conclusion'],
      ['清真认证申请资料', 'halal', 'halal', 'product'],
      ['上报表 3500A', 'safety', 'application', 'category'],
      ['FD 様式届书', 'registration', 'application', 'category'],
      ['許可申請', 'registration', 'application', 'applicant'],
      ['数字令牌', 'registration', 'platform', 'token'],
      ['样品', 'registration', 'sample-slip', 'sample'],
      ['回收系统合同', 'packaging', 'contract', 'scope'],
      ['没有这种材料xyz', 'label', null, null],
    ];
    for (const [name, type, expectId, expectField] of samples) {
      const hit = matchDoc(name, templates, type);
      const got = hit?.id ?? null;
      if (got !== expectId) fail(`材料样式样例「${name}」应是 ${expectId ?? '无'}，实际 ${got ?? '无'}`);
      else if (expectField && hit?.field !== expectField) {
        fail(`材料样式样例「${name}」应亮 ${expectField}，实际 ${hit?.field ?? '无'}`);
      }
    }
    const unique = new Map();
    let matched = 0;
    const unmatched = [];
    for (const mention of docMentions) {
      const hit = matchDoc(mention.name, templates, mention.type);
      if (!unique.has(mention.name)) unique.set(mention.name, Boolean(hit));
      if (hit) matched += 1;
      else unmatched.push(mention.name);
    }
    const uniqueTotal = unique.size;
    const uniqueMatched = [...unique.values()].filter(Boolean).length;
    const pct = (part, total) => (total ? ((100 * part) / total).toFixed(1) : '0.0');
    docCoverageLine = `- 材料样式 ${templates.length} 种，清单 ${docMentions.length} 处对上 ${matched}（${pct(matched, docMentions.length)}%）；不同写法 ${uniqueTotal}，对上 ${uniqueMatched}（${pct(uniqueMatched, uniqueTotal)}%）`;
    if (unmatched.length) docCoverageLine += `\n- 未对上样式：${[...new Set(unmatched)].join('、')}`;
  }
}

if (errors.length > 0) {
  console.error(`内容校验失败（${errors.length}）`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('内容校验通过');
console.log(`- 平台 ${platformIds.size}`);
console.log(`- 资讯 ${newsCount}`);
console.log(`- 合规国家 ${countryIds.size}（${complianceItems} 项）`);
if (docCoverageLine) console.log(docCoverageLine);
const hsDataset = path.join(contentDir, 'datasets', 'hs-codes', 'beauty.json');
if (fs.existsSync(hsDataset)) {
  const hs = readJson(hsDataset);
  const n = Array.isArray(hs.items) ? hs.items.length : 0;
  if (n < 1) fail('content/datasets/hs-codes/beauty.json: items 为空');
  console.log(`- HS 数据集 ${n} 行（countries ${Object.keys(hs.countries || {}).length}）`);
} else {
  console.log('- HS 数据集 未就绪');
}

console.log(`- 榜单 ${rankingCount}`);
console.log(`- 榜位 ${boardIds.size}（缺口 ${site?.rankingGaps?.length ?? 0}）`);
