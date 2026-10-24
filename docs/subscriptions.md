# 市场订阅 / Market packages

人类按**市场**订阅，Agent 读**同一套**构建产物。内容仍只在 `content/`。`/v1/` 和 MCP 不另存一份事实。

市场 id 就是 `content/compliance/<id>.json` 的 `country`（`us`、`eu`、`sg`）。地区名用文件里的 `region`。榜位通过 `site.json` 的 `rankingPlatforms` 映射到这些 id：`code` 小写后能对上合规文件；`SEA` 展开为地区「东南亚」；`GL` 是全球榜，不写进单个国家的订阅。`market` 文案按 `/`、`、` 拆开，必须对得上 `name_zh`（「印尼」是「印度尼西亚」的别名）。对不上，构建失败。

内容类型：

| id | 页面 |
| --- | --- |
| `rules` | 平台规则 |
| `regulation` | 市场法规 |
| `rankings` | 热销榜 |

## 人

`/subscribe/` 勾选市场和内容类型。结果有三样：

1. 筛选后的列表，以及进现有资讯页的链接（`/news?countries=us,sg`，可再加 `category`）。
2. 稳定地址。单市场，或刚好等于一整区且三种内容都要，指向构建时写好的文件。其他组合指向 `/v1/updates.json?markets=…&types=…`。
3. 提醒说明。点「生成订阅」后才给出 JSON / RSS。同一次请求把市场包交给 `POST /oauth/api/subscribe`。浏览器不持有 webhook。返回 200 表示已发到企业微信群；503 表示服务器没配地址，订阅链接仍然可用；预览环境连不上时同样只生成地址。站点不发邮件。选择存在这台浏览器的 `localStorage`（`yuanshan.package.v1`），没有账号。

RSS 文件扩展名是 `.xml`（RSS 2.0），方便静态托管按 XML 返回。

## 程序

路径相对站点根，**不含**部署前缀。宝塔 `ys.tongzhoukuajing.com` 前缀是 `/`。GitHub Pages 再加上 `/yuanshan-channel`。

| 路径 | 内容 |
| --- | --- |
| `GET /v1.json` | 目录、筛选约定、以后的密钥形状 |
| `GET /v1/markets.json` | 市场 id、中文名、地区 |
| `GET /v1/updates.json` | 资讯和榜单更新索引 |
| `GET /v1/news/{slug}.json` | 单条资讯 |
| `GET /v1/markets/{id}/compliance.json` | 该市场合规快照 |
| `GET /v1/markets/{id}/rankings.json` | 映射到该市场的榜 |
| `GET /v1/markets/{id}/feed.json` | 该市场三种内容，已滤好 |
| `GET /v1/markets/{id}/feed.xml` | 同上，RSS |
| `GET /v1/markets/{id}/types/{combo}.json` | 内容类型子集。`combo` 按 `rules+regulation+rankings` 的固定顺序用 `+` 连接 |
| `GET /v1/rankings.json` | 榜位目录，含未上榜状态 |
| `GET /v1/rankings/{board}.json` | 最新一榜的单品 |
| `GET /v1/rankings/{board}/{date}.json` | 某一天 |
| `GET /v1/packages/{slug}.json` | 一整区，或 `global` |
| `GET /v1/packages/{slug}.xml` | 同上，RSS |

每份 JSON 都有 `access: "public-read"` 和 `auth: null`。字段名用英文，合规和榜单条目沿用 `content/` 里的名字。

`/v1/updates.json` 的查询参数：

| 参数 | 含义 |
| --- | --- |
| `markets` | 逗号分隔的市场 id，命中 `item.markets` 交集 |
| `types` | `rules`、`regulation`、`rankings` 的子集 |
| `since` | `YYYY-MM-DD`，含当天，比的是 `item.date` |
| `include_global` | `1` 时，在已选市场之外加上 `scope: "global"` 的榜 |

静态托管**不会**应用这些参数，文件整份返回。关注页和 MCP 自己滤。已滤好的单市场文件和整区文件不看查询参数。

`scope: "global"` 的榜（Temu、AliExpress）只出现在索引和 `/v1/packages/global.*`，不进国家 feed。

OpenAPI 摘要：[`v1.openapi.yaml`](v1.openapi.yaml)。

## MCP

`mcp/server.mjs` 是第二入口，stdio，没有依赖。工具 `list_markets`、`get_compliance`、`search_updates`、`get_ranking` 只请求上面的 JSON。

```json
{
  "mcpServers": {
    "yuanshan-channel": {
      "command": "node",
      "args": ["mcp/server.mjs"],
      "cwd": "/path/to/yuanshan-channel"
    }
  }
}
```

默认拉取 `https://ys.tongzhoukuajing.com`。本地构建用 `YUANSHAN_V1_DIR` 指到含 `v1/` 的目录（宝塔构建是 `dist`，GitHub Pages 构建是 `dist/yuanshan-channel`）。GitHub Pages 线上把 `YUANSHAN_API_BASE` 设为 `https://zuyuanwu-cell.github.io/yuanshan-channel`。

`search_updates` 必须带 `markets`、`since`、`query` 之一，或者把 `types` 收窄到不足三类。否则拒绝，避免无筛选的全库导出。

宝塔只托管静态 `dist/`，没有常驻 Node，所以 V1 不做远程 MCP。要远程，在别的机器上跑同一个 stdio 进程，或以后加传输层，仍然读这些 URL。

## 企业微信

公开 `/v1/` 不会主动推送。两件事走已经在跑的 OAuth 桥，webhook 只来自环境变量：

| 变量 | 作用 |
| --- | --- |
| `WECOM_WEBHOOK_URL` | 企业微信群机器人地址 |
| `YUANSHAN_WECOM_WEBHOOK_URL` | 上一行为空时的别名 |

`.env.example` 里只有空值。不要把 key 写进 git、README 或 GitHub Actions。

1. 人点「生成订阅」：`POST /oauth/api/subscribe`，正文是 `{ markets, types, since, page }`。桥用 markdown 发到群。同一 IP 约 10 分钟 8 次。响应里没有 webhook。
2. 内容更新：在服务器上跑 `node deploy/admin-oauth/notify-updates.js --index <dist>/v1/updates.json --state <seen.json>`。第一次只把当前 id 写入 state，不发送。之后只发新 id。可用 `--markets`、`--types`、`--since` 收窄，规则与 `filterFeedItems` 相同。`--dry-run` 只打印 markdown。没配 webhook 时退出码 0 并跳过。

静态部署不会重启这台 Node 进程。改了 `deploy/admin-oauth/` 之后，把 `server.js`、`contact.js`、`subscribe.js`、`notify-updates.js` 拷到服务器再 `pm2 restart`。见 `deploy/ADMIN.md`。

## 这一版不做

- 写入接口、账号、会员
- 把整站打包成一个不筛选的订阅
- 邮件。企业微信不从静态页或浏览器直连
- 代写法律意见，或代替 `source_url` 原文
- 在仓库里放 API 密钥或 webhook key

## 下一步（还没做）

付费或邮件需要一台不在静态站点上的 worker：

1. 存订阅偏好：市场 id、内容类型、邮箱。企业微信群通知已经由上面的桥发送，不要再把 webhook URL 存进浏览器。
2. 拉取 `/v1/updates.json` 或单市场 feed，用 `src/lib/feed-filter.mjs` 的同一套规则，`since` 用上次送达日。`notify-updates.js` 是这一步的群机器人版本。
3. 发信。失败可重试，不要另写一套内容。
4. 若启用密钥：请求头 `Authorization: Bearer <key>`，密钥只允许它名下的市场 id。密钥放在 worker 的环境变量，不进 git，不进前端。

V1 看到这个头也不校验。

## 榜单页工厂引导

`content/factory-promo.json` 驱动热销榜列表和榜单详情上的一张卡：免费打样、设计、全套出海合规方案。`ctaHref` 为 `#contact` 时打开已有洽谈合作浮层；站内路径或 `https://` 则是普通链接。改文案不用改组件。
