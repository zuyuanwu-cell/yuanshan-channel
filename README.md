# 同舟跨境·远山频道

美妆日化跨境卖家的每日资讯站：平台规则、目的国法规、各站点热销榜。英文 slug：`yuanshan-channel`。

站点是 Astro 静态页。可更新的文字都在 `content/`，页面只读取这些文件。

## 本地预览

需要 Node.js 22+。

```bash
npm install
npm run validate:content
npm run dev
```

浏览器打开 http://127.0.0.1:4477/yuanshan-channel/ 。本地路径和线上 GitHub Pages 保持一致，都带 `/yuanshan-channel/` 前缀。

构建：

```bash
npm run validate:content && npm run build
```

产物在 `dist/`。`npm run build` 会先跑内容校验。

## 代理怎么更新

只改 `content/`（图片可放 `content/assets/`），然后校验并构建。不要把正文写进 `src/`。

1. 看 `AGENTS.md`、`content/CONTENT.md`、`content/schemas/`。
2. 日常步骤在 `.cursor/skills/yuanshan-daily-update/SKILL.md`。
3. `npm run validate:content`
4. `npm run build`
5. 提交，推送到 `main`。GitHub Actions 会重新校验、构建并发布，约 1–2 分钟后线上更新。

内容里的站内链接和图片照常写根路径，例如 `/news`、`/media/hero/rankings.webp`。构建时会自动加上 `/yuanshan-channel/` 前缀，不要手写前缀。

### 新增一条资讯

新建 `content/news/2026-10-23-short-slug.md`。frontmatter 需要 `title`、`date`、`category`（`rules` 或 `regulation`）、`platforms`、`source_url`、`summary`、`needs_review`、`sample`。文件名里的日期要和 `date` 一致。`platforms` 用 `content/platforms.json` 里的 `id`。

来源必须是你打开过的链接。没把握就 `needs_review: true`。占位稿同时设 `sample: true`。

### 新增一份榜单

新建 `content/rankings/<platform-id>/2026-10-23.json`。`category` 固定为 `beauty-personal-care`。同一平台再放一个日期文件，详情页可以切换日期。

不确定的排名不要写成已核实。占位条目标题以「占位」开头，品牌写「待核对」，`price` 用 `null`。

## 界面与移动端

深色底、玻璃质感的胶囊导航，首页是一排扇形展开的彩色卡片。卡片会依次发牌入场，鼠标悬停时抬起并跟着指针倾斜，居中卡片的插画会轻微浮动。下方的资讯、榜单、平台卡片滚动进入视口时淡入。系统开启「减少动态效果」时，这些动画全部关闭。

手机宽度（≤760px）按 App 外壳处理：

- 顶部只留品牌和一个按钮，导航移到底部悬浮 Tab 栏（适配 iPhone 安全区）
- 首页卡片变成可左右滑动的卡组，带分页圆点，默认停在居中那张
- 筛选标签横向滑动，不换行挤压
- 点按区域不小于 36–44px，不依赖悬停

后续做 App 或小程序时，可以直接复用 `content/` 里的 JSON 和 Markdown。卡片配色、插画、标签文案都在 `content/site.json` 的 `hero`，不在组件里。

首页卡片插画在 `content/assets/hero/`，构建时复制到 `/media/hero/`。

## 部署（宝塔 · ys.tongzhoukuajing.com）

线上地址：https://ys.tongzhoukuajing.com/

自动更新链路：

1. 推送到 `main`（或改 `content/` 后提交）
2. GitHub Actions（`.github/workflows/build-baota.yml`）跑 `npm ci`、`validate:content`、`npm run build:baota`
3. 把构建好的 `dist/` 强制推到 orphan 分支 `deploy`（分支根目录就是站点文件）
4. 宝塔服务器 cron 每 5 分钟跑 `deploy/baota-pull.sh`，从 `deploy` 分支同步到 `/www/wwwroot/ys.tongzhoukuajing.com/`

内容校验不过就不会推 `deploy`，线上保持上一版。

### 宝塔首次配置

把仓库里的 `deploy/baota-pull.sh` 拷到服务器（例如 `/root/scripts/yuanshan-baota-pull.sh`），装好 `git` 和 `rsync`，加 crontab：

```cron
*/5 * * * * /bin/bash /root/scripts/yuanshan-baota-pull.sh >> /tmp/yuanshan-pull.log 2>&1
```

脚本会维护工作目录 `/www/wwwroot/yuanshan-channel-deploy`，同步时保留 `.user.ini`、`.htaccess`，且不删 `.well-known/`。

### 路径前缀

| 目标 | 命令 | 前缀 |
| --- | --- | --- |
| 宝塔 · ys.tongzhoukuajing.com | `npm run build:baota` | `/` |
| 本地 / 旧 GitHub Pages | `npm run build` | `/yuanshan-channel/` |

Nginx 保持宝塔默认 `index index.html;` 即可：

```nginx
location / {
    try_files $uri $uri/ =404;
}
error_page 404 /404.html;
location /_astro/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 两个远端（可选）

源码可同时放在 GitHub 和 Origin。触发宝塔更新的是 GitHub 的 `main`：

```bash
git push github main
```

## 管理后台（免费）

编辑资讯用 Decap CMS（`/admin/`），访问统计用自建 Umami。编辑账号 = GitHub 仓库写权限，不做访客会员。

**首次要在宝塔配一次**：GitHub OAuth App + OAuth 桥 +（可选）Umami。逐步说明见 [`deploy/ADMIN.md`](deploy/ADMIN.md)。

未完成 OAuth 前，`/admin/` 页面能打开，但 Login 会失败，属正常。

## 市场订阅

人在 [`/subscribe/`](https://ys.tongzhoukuajing.com/subscribe/) 按市场勾选，再选平台规则、市场法规、热销榜，点「生成订阅」得到一段提示词，复制给自己的 Agent。这不是全站会员。

公开的 `/v1/` 只读，不发邮件。生成订阅时，页面把市场包 `POST` 到 `/oauth/api/subscribe`（浏览器里没有 webhook）。服务器上的 OAuth 桥读 `WECOM_WEBHOOK_URL`，为空则用 `YUANSHAN_WECOM_WEBHOOK_URL`，再发到企业微信群。没配、或纯静态预览连不上时，提示词照样生成，群里收不到。真实 key 只放服务器 `.env`，不要写进仓库或 GitHub Actions。新内容进群用 `deploy/admin-oauth/notify-updates.js`（第一次只记基线）。

单市场和整区的文件在构建时写好；多市场的自定义组合用 `/v1/updates.json?markets=&types=` 作筛选约定，由页面或调用方自己滤。

榜单页的工厂引导文案在 `content/factory-promo.json`。`ctaHref` 为 `#contact` 时打开已有的洽谈合作浮层。

Agent 读同一套 `/v1/` JSON。MCP 在 `mcp/server.mjs`（stdio，无依赖），工具只拉这些文件，不抓 HTML。

```bash
# 默认读 https://ys.tongzhoukuajing.com
node mcp/server.mjs

# 或读本地构建目录（里面要有 v1/）
YUANSHAN_V1_DIR=dist node mcp/server.mjs
```

说明、路径和 V1 不做的事：[`docs/subscriptions.md`](docs/subscriptions.md)。OpenAPI 摘要：[`docs/v1.openapi.yaml`](docs/v1.openapi.yaml)。

V1 是公开只读，不校验密钥。以后若做付费档，请求头是 `Authorization: Bearer <key>`，密钥只覆盖一组市场 id。仓库里不放密钥。

## 声明


仓库里的示例资讯和榜单标了「示例 / 待核实」。它们用来把栏目跑通，不能当作当期行情、费用或法律意见。引用前打开条目里的来源链接。
