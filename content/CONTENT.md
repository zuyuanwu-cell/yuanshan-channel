# 远山频道编辑规范

受众是跨境卖家和供应链同事，类目只收**美妆日化**（护肤、彩妆、个护、洗护、香水）。不做药品功效承诺，不写与美妆无关的榜。

页面上的事实全部来自 `content/`。改文案、资讯、榜单、平台介绍时，只改这个目录和 `content/assets/` 里的图片。不要把正文写进 `src/`。

## 文件

| 路径 | 作用 |
| --- | --- |
| `site.json` | 站名、导航、栏目名、空状态、免责声明 |
| `platforms.json` | 平台名单。`id` 必须和元数据一致 |
| `about.md` | 关于页 |
| `news/YYYY-MM-DD-slug.md` | 一条资讯 |
| `rankings/<platform-id>/YYYY-MM-DD.json` | 某平台某天的美妆日化榜 |
| `assets/` | 可选图片，页面里用 `/media/文件名` |
| `schemas/` | 校验合同。每日更新不要改 schema |

### 首页动效卡片

首页的标题、浮动标签和那排扇形卡片，都在 `site.json` 的 `hero` 里：

- `hero.cards` 放 3–5 张卡，最多一张 `featured: true`（居中、带「进入」按钮）
- `image` 写 `/media/...`，文件放在 `content/assets/` 下，例如 `content/assets/hero/rankings.webp`
- `colorTop` / `colorBottom` 取插画背景上下两端的颜色，卡片才会和图融在一起
- `statKey` 可选，填了会显示实时条数：`news`、`rules`、`regulation`、`rankings`、`platforms`
- `href` 只能是站内路径，例如 `/news?category=regulation`

插画建议 600×800 的 webp，纯色背景、主体在下半部分。底部导航（手机端）用 `nav` 里的 `icon`，最多 5 项。

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
- `name`、`code`（2–4 位大写，如 `US`、`SEA`）、`market`：页面展示用
- `platform`：可选，对应 `platforms.json` 的 `id`，平台卡片和资讯页据此链到榜单
- `board_url`：可选，只填你打开过的公开热销页

榜位有三种状态，榜单页「覆盖计划」里按颜色区分：有 JSON 为「已上榜」，记在 `rankingGaps` 为「本期未抓到」，其余为「待抓取」。新增榜位只写进 `rankingPlatforms`，不要为它编平台介绍。

### 单品字段

必填：`rank`、`title`（页面原文）、`brand`、`needs_review`。`needs_review: false` 时必须有单品 `url`。

可选，页面上看得到才写：

| 字段 | 写什么 |
| --- | --- |
| `title_zh` | 中文标题，页面主显；不要和 `title` 一样 |
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
