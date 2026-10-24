# 给内容代理

同舟跨境·远山频道（`yuanshan-channel`）是 Astro 静态站。事实在 `content/`，页面只负责读。

## 只做这一条路径

1. 读 `content/CONTENT.md` 和 `content/schemas/`。
2. 只改 `content/**`。图片放 `content/assets/`，正文用 `/media/文件名`。
3. 跑 `npm run validate:content`，再跑 `npm run build`。
4. 提交，把同一批提交推到两个远端的 `main`：`git push origin main` 和 `git push github main`。推到 GitHub 后，Actions 会自动重新校验、构建并发布到 https://zuyuanwu-cell.github.io/yuanshan-channel/ 。

站内链接照常写 `/news`、`/media/...`，构建会自动加 `/yuanshan-channel/` 前缀，不要手写。校验没过就不要推送；CI 也会拦下，线上停在上一版。

不要把资讯正文、榜单、平台介绍、免责声明写进 `src/`。日常更新不要改组件、样式或 schema。

## 订阅和只读接口

`/subscribe/`、`/v1/`、`mcp/server.mjs` 都在构建时从 `content/` 生成，不要手改产物，也不要另写一套资讯。市场 id 就是 `content/compliance/<id>.json` 的 `country`。

新增榜位时，`rankingPlatforms` 的 `code` 必须能对应合规文件（小写），或使用已有的 `SEA`（且 `market` 为「东南亚」）、`GL`（且 `market` 为「全球」）。`market` 文案里用 `/` 或 `、` 分开的国家名要对上合规 `name_zh`。对不上，`npm run build` 会失败。

细节在 `docs/subscriptions.md`。日常更新仍然只改 `content/`。

榜单页工厂引导只改 `content/factory-promo.json`。`ctaHref` 用 `#contact` 打开已有洽谈合作浮层。企业微信 webhook 只放服务器环境变量 `WECOM_WEBHOOK_URL`（空则用 `YUANSHAN_WECOM_WEBHOOK_URL`），不要写进仓库。

步骤细节在 `.cursor/skills/yuanshan-daily-update/SKILL.md`。

## 不能编造

没有打开来源页，就不要写成已核实。排名、价格、品牌、费率、截止日期不确定时：`needs_review: true`。占位榜用 `sample: true`，标题以「占位」开头，品牌写「待核对」，价格 `null`。

平台只使用 `content/platforms.json` 里已有的 `id`。不要新造一个站。

榜单目录用 `site.json` `rankingPlatforms` 里的榜位 `id`（如 `amazon-uk`、`shopee-id`）。抓不到就记 `rankingGaps`，不做假榜。单品的图、中文标题、销量文案、评分都是可选字段，只写页面上看得到的，见 `content/CONTENT.md`「单品字段」。
