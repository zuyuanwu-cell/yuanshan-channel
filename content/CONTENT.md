# 远山频道编辑规范

受众是跨境卖家和供应链同事，类目只收**美妆日化**（护肤、彩妆、个护、洗护、香水）。不做药品功效承诺，不写与美妆无关的榜。

页面上的事实全部来自 `content/`。改文案、资讯、榜单、平台介绍时，只改这个目录和 `content/assets/` 里的图片。不要把正文写进 `src/`。

## 文件

| 路径 | 作用 |
| --- | --- |
| `site.json` | 站名、导航、栏目名、空状态、免责声明、页脚社交和合作入口 |
| `platforms.json` | 平台名单。`id` 必须和元数据一致 |
| `about.md` | 关于页。版面来自文首字段，正文不直接渲染 |
| `news/YYYY-MM-DD-slug.md` | 一条资讯 |
| `rankings/<platform-id>/YYYY-MM-DD.json` | 某平台某天的美妆日化榜 |
| `assets/` | 可选图片，页面里用 `/media/文件名` |
| `schemas/` | 校验合同。每日更新不要改 schema |
| `datasets/hs-codes/` | 美妆与家清日化海关编码（含洗衣液等）；同步到各国 `compliance/<cc>.json` 的 `hs_codes` |

### 首页动效卡片

首页的标题、浮动标签和那排扇形卡片，都在 `site.json` 的 `hero` 里：

- `hero.cards` 放 3–5 张卡，最多一张 `featured: true`（居中、带「进入」按钮）
- `image` 写 `/media/...`，文件放在 `content/assets/` 下，例如 `content/assets/hero/rankings.webp`
- `colorTop` / `colorBottom` 取插画背景上下两端的颜色，卡片才会和图融在一起
- `statKey` 可选，填了会显示实时条数：`news`、`rules`、`regulation`、`rankings`、`platforms`
- `href` 只能是站内路径，例如 `/news?category=regulation`

插画建议 600×800 的 webp，纯色背景、主体在下半部分。底部导航（手机端）用 `nav` 里的 `icon`，最多 5 项。

### 页脚社交与合作入口

- `social`：抖音、视频号、小红书、微博。`href` 以 `https://` 开头才是可点链接；留空则图标变灰。没有主页地址时写 `hint`（视频号目前是「微信搜：同舟跨境远山」）。
- `contact.wechatQr` 指向 `/media/contact/wechat-qr.webp`，文件放在 `content/assets/contact/wechat-qr.webp`。换二维码只替换这个文件，再推送构建。
- 合作表单的企业微信地址不写在 `site.json`，只放在宝塔 OAuth 桥的环境变量里。见 `deploy/ADMIN.md`。

### 关于页

`about.md` 的文首字段决定版面：开场、业务范围卡片、工厂照片、频道在做什么、使用说明、收尾。正文不直接渲染。高亮短语必须能在同一节原文里原样找到；使用说明里的「不提供入驻代办」来自 `site.json` 的 `footerNote`。照片放 `content/assets/about/`，`src` 写 `/media/about/文件名.webp`，`alt` 用中文。不要写客户数量、成交额或其他没有来源的证明。

`news` 文件名里的日期必须等于 frontmatter 的 `date`。榜单文件名必须等于 JSON 里的 `date`，目录名必须等于 `platform`。

## 资讯

`category` 只有两个值：

- `rules`：平台规则、费用、入驻、物流政策
- `regulation`：目的国法规与合规（化妆品法规、包装法、税号、标签）

每条都必须有 `source_url`，并且是你这次打开过的 http(s) 页面。`summary` 给卡片用，160 字以内，不要在摘要里堆未核实数字。

其他必填字段：

- `source_name`：来源的可读名称，例如「FDA · Registration & Listing」
- `checked`：你核对来源的日期，页面显示为「核对于」，不能早于 `date`
- `tags`：1–3 个，取 `site.json` 里 `newsTags` 的键（`fees`、`listing`、`compliance`、`ingredients`、`labeling`、`customs`、`penalties`、`ai`）。资讯页按它和 `platforms` 筛选

可选字段：

- `key_date`：`{ date, label }`，生效日或截止日。卡片会显示「还有 N 天」，以全站最新内容日期为「今天」
- `highlight: true`：进首页「今日看点」。必须同时有 `key_date`；未到期的按日期先后排在前面

`needs_review` 的口径：对过官方原文（监管机构、平台规则页、平台公告）写 `false`；来源是媒体、行业号或第三方转述写 `true`，正文里说明原因。

`platforms` 填 `platforms.json` 里的 `id`。纯法规可以留空数组，但有对应站点时写上。

## 榜单

每份榜单写明抓取时刻 `captured_at`（带时区）、`source_name` 和覆盖范围。只收到前几十名、缺价格或缺品牌时，`partial: true` 并在 `coverage_note` 写清楚。

抓不到的平台不做占位榜，在 `site.json` 的 `rankingGaps` 里记原因。

### 榜位（rankingPlatforms）

`site.json` 的 `rankingPlatforms` 是全部榜位，按数组顺序就是抓取优先序。一个榜位是「平台 × 站点」，例如 `amazon-uk`、`shopee-id`、`tiktok-shop-us`。

- `id`：榜单目录名 `content/rankings/<id>/`，也是榜单 JSON 的 `platform` 和 `rankingGaps[].platform`
- `name`、`code`（2–4 位大写，如 `US`、`SEA`）、`market`：页面展示用。`code` 小写后要有 `content/compliance/<code>.json`，或者用 `SEA`（`market` 写「东南亚」）、`GL`（`market` 写「全球」）。`market` 里用 `/` 或 `、` 分开的名字要对上合规国家的 `name_zh`（「印尼」对应印度尼西亚）。这是市场订阅的映射，对不上构建会失败。
- `platform`：可选，对应 `platforms.json` 的 `id`，平台卡片和资讯页据此链到榜单
- `board_url`：可选，只填你打开过的公开热销页

榜位有三种状态，榜单页「覆盖计划」里按颜色区分：有 JSON 为「已上榜」，记在 `rankingGaps` 为「本期未抓到」，其余为「待抓取」。新增榜位只写进 `rankingPlatforms`，不要为它编平台介绍。

### 榜单页工厂引导（factory-promo.json）

热销榜列表和榜单详情各放一张引导卡，文案只改 `content/factory-promo.json`，不要改组件。

- `ctaHref` 写 `#contact` 时，按钮打开页面上已有的「洽谈合作」浮层。
- 写成 `/subscribe` 这类站内路径，或 `https://` 外链，则是普通链接。站内路径不要手写部署前缀。

这张卡是工厂能做的事（打样、设计、出海合规方案），不是榜单数据，也不替代监管原文。

### 单品字段

必填：`rank`、`title`（页面原文）、`brand`、`needs_review`、`title_zh`（可读中文品名）。`needs_review: false` 时必须有单品 `url`。

已上架发布的榜单（`sample: false`）每条都必须有 `title_zh`：读者只看中文，外文 `title` 保留作核对，不能当页面主显。`title_zh` 须含汉字，品牌+品类+关键规格（容量/片数等原文有的才写），不要和 `title` 相同，也不要编造原文没有的卖点。

可选，页面上看得到才写：

| 字段 | 写什么 |
| --- | --- |
| `image_url` | 主图，必须 `https://`，可直接用平台 CDN |
| `image_zoom_url` | 大图，点开放大时用；不写就用 `image_url` |
| `image` | 站内镜像图 `/media/...`，文件放 `content/assets/`；有它时优先用它 |
| `price` + `currency` | 页面展示价，按站点币种 |
| `sales_text` | 页面可见的销量文案，照抄，例如「10万+」「月销 2,000+」 |
| `bought_text` | Amazon「10K+ bought in past month」之类原文 |
| `rating` | 页面评分，0–5 |
| `reviews_count` | 页面评价数，数字或原文；写了它就要有 `rating` |

页面上没有的销量、评分、评价数不要写，更不能估算。`title_zh` 是翻译，不要加原文没有的卖点。

## 禁止编造

不确定的数字、排名、价格、品牌、保证金、佣金、截止日期，一律 `needs_review: true`。

占位内容还要 `sample: true`。示例不能标成已核实：`sample: true` 时 `needs_review` 必须是 `true`。

榜单占位条：

- `title` 以「占位」开头
- `brand` 写「待核对」
- `price` 用 `null`，不要填一个看起来真实的价格
- 没有单品链接时，不要把 `needs_review` 设成 `false`

已核实条目必须有自己的单品 `url`，不能只重复榜单的 `source_url`。

`mentions_beauty` 仅当介绍原文写到「美妆」或「个护」时为 `true`。不要因为“这个站也能卖美妆”就改成 `true`。

不要新增名单外的平台，除非你有该平台官网和卖家入口，并把出处写进 `note`。费用口径过期就改句子并标待核实，不要沿用旧数字装成现价。

## 校验

```bash
npm run validate:content
npm run build
```

校验失败就改 `content/`，不要为了通过去改页面组件。


## 抓不到时的处理

不做假榜。按原因选路径，并写入 `site.json` 的 `rankingGaps`（`reason` ≤120 字）：

1. **反爬/403**（eBay、Target、部分 Walmart）：用已登录浏览器打开榜页或 Best Sellers 子类；仍失败只记缺口。
2. **纯 SPA**（Shopee、Lazada）：必须浏览器渲染后再读销量排序；日常更新固定走浏览器，不用裸 HTTP。
3. **地区墙**（Ozon、Wildberries）：浏览器 + 能打开目标站的出口；打不开则记缺口。
4. **无公开网页榜**（TikTok Shop 等）：卖家后台导出/截屏录入，或标明出处的第三方周报；否则只记缺口。
5. **字段不全**：照发并设 `partial: true` + `coverage_note`；无公开销量就省略，不编数字；中文标题可译但原文可核对。

## Apify-first ranking sources

B/C 层榜单优先用 Apify 专用 Actor（云端住宅代理，无需本机过验证）；失败再降级本机 CDP；仍失败才写 `rankingGaps`。每次调用加 `callOptions.maxTotalChargeUsd: 0.5`，取数用 `get-dataset-items` 并设 `limit: 50`（默认只回 20 条）。入库时必须补 `title_zh`，`source_note` 写明 Actor 与排序口径。

| 榜位 | Actor | 输入模板 | 排名口径 / 备注 |
|---|---|---|---|
| shopee-sg/my/th/vn/id | `xtracto/shopee-search` | `{country:'my', mode:'keyword', keyword:'skincare', sort:'sales', maxProducts:30}`（mode 仅 keyword/category/url；TH 用「สกินแคร์」，VN 用「kem dưỡng da」） | 关键词销量排序；备选 `zen-studio/shopee-product-scraper`（best_selling） |
| lazada-* | `fatihtahta/lazada-scraper` | 美妆类目/关键词，按销量，30 条 | 备选 `lergassy/lazada-scraper` |
| ozon | `zen-studio/ozon-scraper-pro` | 美妆类目或关键词，按热度，30 条 | |
| coupang | `zen-studio/coupang-search-scraper` | 关键词 `스킨케어`，按销量，30 条 | |
| wildberries | `zen-studio/wildberries-scraper` | `{searchTerms:['уход за кожей'], sortBy:'popular', maxResults:30}` | 备选 `memo23/wildberries-scraper`；未实跑验证 |
| noon | `memo23/noon-scraper` | `{startUrls:['https://www.noon.com/uae-en/beauty/?sort[by]=popularity&sort[dir]=desc'], country:'uae', maxItems:30}` | 已验证；备选 `saswave/noon-product-scraper` |
| tiktok-shop-us | `pro100chok/tiktok-shop-scraper-usage` | `{region:'us', scrapeType:'search', searchKeywords:['skincare'], sortBy:'best_sellers', maxItems:30}` | 关键词热销近似榜，`partial:true`，coverage_note 注明非官方榜 |
| tiktok-shop-sea | 同上（region my/th/sg） | 同上 | 2026-10-23 实测多为零销量小店，质量不足，记缺口 |

**兜底（本机 CDP）**：用户电脑 machine `896edebb-180c-4ced-8d9b-8ec73cf13908`，脚本目录 `C:\Users\Administrator\yuanshan-scrape`，运行 `run_b_tier_scrape.bat`（独立 `chrome-profile`，端口 9222）；验证码页记 blocked，不等人。
