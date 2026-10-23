---
name: yuanshan-daily-update
description: Update 同舟跨境·远山频道 by editing only content/ (news markdown, ranking JSON, platforms). Use when refreshing daily platform rules, cosmetics regulations, or beauty bestseller boards, then validate and build.
---

# 远山频道每日更新

只改 `content/**` 和可选的 `content/assets/**`。然后校验、构建。不要改 `src/`，除非 schema 本身变了——那不是每日更新。

先读 `AGENTS.md`、`content/CONTENT.md` 和 `content/schemas/`。

## 1. 检索

只使用你这次打开的官方页面或监管原文。记下 URL。

- 平台规则：卖家中心、费用页、规则中心
- 市场法规：监管机构或法律数据库原文
- 热销榜：该平台美妆日化榜单页

没打开的页面，不要写成已核实。

## 2. 写入

资讯：`content/news/YYYY-MM-DD-slug.md`

```yaml
---
title: "标题"
date: "2026-10-23"          # 发布日或生效日，须和文件名一致
category: "rules"           # 或 regulation
platforms:
  - "amazon-us"
tags:                        # 1–3 个，取 site.json newsTags 的键
  - "fees"
source_url: "https://example.com/official-page"
source_name: "Amazon Seller Central 公告"
checked: "2026-10-23"       # 你打开并核对来源的日期，页面显示为「核对于」
key_date:                    # 可选：生效日、截止日
  date: "2026-11-02"
  label: "开始执法"          # 10 字以内
highlight: true              # 可选：进首页「今日看点」，必须同时有 key_date
summary: "卡片用的一句话，不堆未核实数字。"
needs_review: false          # 官方原文核对过才写 false；媒体或第三方转述写 true
sample: false
---

正文。数字必须能在 source_url 里对上。对不上就改写，并把 needs_review 设为 true。
```

打不开、或只在搜索摘要里见到的来源，不要写进去。

榜单：`content/rankings/<board-id>/YYYY-MM-DD.json`

- `board-id` 取 `site.json` `rankingPlatforms` 里的榜位 `id`；`platform` 字段等于目录名
- `category` 固定 `beauty-personal-care`
- `captured_at` 写抓取时刻和时区，例如 `2026-10-22T20:38:00+08:00`，日期部分等于 `date`
- `source_name`、`source_url` 指向你打开的榜单页
- `partial: true` 时必须写 `coverage_note`，说清楚收了第几名到第几名、缺了什么
- 每一条有 `rank`、`title`、`brand`、`needs_review`；已核实条目要有单品 `url`
- 价格照抄页面并写 `currency`；页面没显示价格就 `"price": null`，不要发明价格
- 品牌取商品页品牌栏；拿不到时取标题里的品牌名，并在 `note` 写「品牌据标题」

每条单品尽量补齐，只写页面上看得到的：

```json
{
  "rank": 1,
  "title": "Mighty Patch Hero Cosmetics Original Nighttime Acne Pimple Patches, 36 Ct",
  "title_zh": "Mighty Patch 夜用痘痘贴 36 片装",
  "brand": "Mighty Patch",
  "image_url": "https://images-na.ssl-images-amazon.com/images/I/xxxx._AC_UL300_SR300,200_.jpg",
  "image_zoom_url": "https://images-na.ssl-images-amazon.com/images/I/xxxx._AC_SL1000_.jpg",
  "price": 11.97,
  "currency": "USD",
  "bought_text": "10K+ bought in past month",
  "rating": 4.6,
  "reviews_count": 186792,
  "url": "https://www.amazon.com/dp/B074PVTPBW",
  "needs_review": false
}
```

- 图片：`image_url` 用页面 `<img>` 的 https 地址；Amazon 把 `._AC_..._.` 换成 `._AC_SL1000_.` 就是大图，填 `image_zoom_url`
- `title_zh`：忠实翻译品名、规格；不加原文没有的功效词
- 销量：页面有「10万+」「月销」就照抄进 `sales_text`，Amazon 的「bought in past month」进 `bought_text`；没有就省略，不要估
- 评分、评价数：榜单页或商品页显示的才写

### 补缺口

`rankingPlatforms` 按优先序排好了。每轮除了刷新已上榜的站点，再按顺序挑 1～2 个「待抓取」或「本期未抓到」的榜位试一次：

1. 打开该站美妆类热销页（有 `board_url` 先用它）
2. 抓得到：写 `content/rankings/<board-id>/YYYY-MM-DD.json`，并从 `rankingGaps` 删掉这一条
3. 抓不到（反爬、要登录、只有脚本空壳）：在 `rankingGaps` 记一条或更新 `tried` 日期，写原因和尝试的 URL。页面显示「本期未抓到」

不要做占位榜，也不要用别的站点数据冒充。

平台介绍只在已有 `id` 上改。`mentions_beauty` 只有原文出现「美妆」或「个护」才为 `true`。

图片放 `content/assets/`，Markdown 里写 `![](/media/文件名.png)`。

## 3. 校验并构建

```bash
npm run validate:content
npm run build
```

校验失败时，根据终端里的文件路径改 `content/`。不要放宽 schema，也不要改组件来绕过错误。

本地预览：

```bash
npm run dev
```

开发服务在 `http://127.0.0.1:4477/yuanshan-channel/`。改完 `content/` 后，校验通过会自动重启开发服务。
