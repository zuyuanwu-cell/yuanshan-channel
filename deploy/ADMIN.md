# 远山频道 · 免费管理后台（编辑账号 + 访问统计）

目标（一次配好，长期免费）：

1. **文章资讯后台**：浏览器打开 `/admin/`，用 GitHub 登录后改 `content/news/`，保存即推 `main`，Actions 构建，宝塔约 5 分钟同步上线。
2. **编辑账号**：谁有 GitHub 仓库写权限，谁就能进 `/admin/` 改资讯。
3. **访问量**：自建 Umami，看 PV / 访客 / 来源；脚本由构建环境变量注入。
4. **访客控制台**：`/console/` 用邮箱注册。工作人员看 Umami 汇总和在线心跳。安装见 [`console/README.md`](./console/README.md)。

> 仓库已提交静态页与安装文件。线上编辑后台与 Umami 已在跑：看板是主站路径 `https://ys.tongzhoukuajing.com/umami/`，统计脚本由 Actions Secrets 注入。下面保留首次安装步骤，换机器时按同一套重做。

---

## 立刻可用 vs 需你操作

| 项目 | 状态 |
| --- | --- |
| `https://ys.tongzhoukuajing.com/admin/` 静态页 | 推 `main` 后约 5–10 分钟可打开 |
| 页脚「编辑入口」 | 同上 |
| GitHub 登录写资讯 | OAuth 桥已在 `/oauth/health`；仓库写权限即可登录 |
| Umami 看板 | 已在主站 `/umami/`；`PUBLIC_UMAMI_URL` 为 `https://ys.tongzhoukuajing.com/umami`（无末尾 `/`） |
| 访客控制台 `/console/` | 代码在 `deploy/console/`。合并后还要在宝塔装依赖、写 `.env`、加 Nginx，见 [`console/README.md`](./console/README.md) |

---

## A. 创建 GitHub OAuth App

1. 打开 [GitHub → Settings → Developer settings → OAuth Apps → New OAuth App](https://github.com/settings/developers)  
   （组织仓则用 Organization → Settings → Developer settings）
2. 填写：
   - **Application name**：`远山频道 Decap`
   - **Homepage URL**：`https://ys.tongzhoukuajing.com`
   - **Authorization callback URL**：`https://ys.tongzhoukuajing.com/oauth/callback`
3. Register → 记下 **Client ID** → Generate a new client secret，**立刻复制 Client Secret**（只显示一次）。

编辑账号邀请：把对方 GitHub 用户加到仓库 `zuyuanwu-cell/yuanshan-channel` 的 **Collaborator（Write）** 或团队写权限。对方用自己的 GitHub 登录 `/admin/` 即可。

---

## B. 在宝塔启动 OAuth 桥

源码在仓库 `deploy/admin-oauth/`。

```bash
# 在服务器上
mkdir -p /www/wwwroot/yuanshan-decap-oauth
# 把仓库里 deploy/admin-oauth/ 下的文件拷过去（scp / 宝塔文件管理 / git sparse 均可）
cd /www/wwwroot/yuanshan-decap-oauth
cp .env.example .env
# 编辑 .env：填 OAUTH_CLIENT_ID、OAUTH_CLIENT_SECRET
# 合作表单要推企业微信时再填 WECOM_WEBHOOK_URL；留空则页面提示「推送未配置」
npm install
# 宝塔「Node 项目」指向 server.js，或：
export $(grep -v '^#' .env | xargs)
pm2 start ecosystem.config.cjs
pm2 save
```

确认本机健康：

```bash
curl -sS http://127.0.0.1:4181/oauth/health
```

在 **ys.tongzhoukuajing.com** 的 Nginx 配置增加（宝塔 → 网站 → 设置 → 配置文件）：

```nginx
location /oauth/ {
    proxy_pass http://127.0.0.1:4181/oauth/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

保存后重载 Nginx。公网自检：

```bash
curl -sS https://ys.tongzhoukuajing.com/oauth/health
# {"ok":true,"service":"yuanshan-decap-oauth","contact":"unconfigured"}
# contact 为 configured 表示已读到 WECOM_WEBHOOK_URL，响应里不会带出 key
```

然后打开 `https://ys.tongzhoukuajing.com/admin/` → **Login with GitHub**。

站点里的 `public/admin/config.yml` 已指向：

```yaml
backend:
  name: github
  repo: zuyuanwu-cell/yuanshan-channel
  branch: main
  base_url: https://ys.tongzhoukuajing.com
  auth_endpoint: oauth/auth
```

若你改用子域托管 OAuth，请同步改 `config.yml` 的 `base_url` 并推 `main`。

---

## C. 安装 Umami（访问统计）

生产入口是主站路径 **`https://ys.tongzhoukuajing.com/umami/`**，不要再开 `stats.` 子域。详见 [`deploy/umami/README.md`](./umami/README.md)。摘要：

```bash
cd /www/server/yuanshan-umami   # 拷入 deploy/umami/
cp .env.example .env            # 填 POSTGRES_PASSWORD、APP_SECRET
docker compose up -d
```

`docker-compose.yml` 已包含 `BASE_PATH=/umami`、`DATABASE_TYPE=postgresql`，只监听 `127.0.0.1:3001`，并等数据库健康后再启动。这台 VPS 上 Postgres **必须** `privileged: true` 且 `security_opt: ["seccomp:unconfined"]`，否则 `initdb` 报 `Operation not permitted`。

在 `ys.tongzhoukuajing.com` 用 `location ^~ /umami/` 反代到 `127.0.0.1:3001/`（`^~` 避免宝塔把 `script.js` 当主站静态文件）。看板样式还要放行 `/_next/`，片段见 Umami README。

浏览器打开 `https://ys.tongzhoukuajing.com/umami/` → 默认 `admin` / `umami` → **第一次登录后立刻改掉默认密码** → Settings → Websites → 添加 `ys.tongzhoukuajing.com` → 复制 Website ID。

---

## D. 把 Umami 接到站点构建

GitHub 仓库 → **Settings → Secrets and variables → Actions**。这两个 Secret 已经设好，保持原值，不要改成别的地址，也不要新造：

| Name | Value |
| --- | --- |
| `PUBLIC_UMAMI_URL` | `https://ys.tongzhoukuajing.com/umami`（无末尾 `/`） |
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami 给出的 UUID |

推一次 `main`（或手动跑 workflow **Build for Baota**）后，页面 `<head>` 才会出现统计脚本；两个 Secret 任一为空则不加载。

本地：复制根目录 `.env.example` 为 `.env`，`PUBLIC_UMAMI_URL` 同样不要末尾斜杠，再 `npm run build:baota`。

---

## E. 日常怎么用编辑后台

1. 打开 https://ys.tongzhoukuajing.com/admin/（页脚也有「编辑入口」）
2. Login with GitHub（需仓库写权限）
3. **资讯与法规** → New → 填标题、栏目、来源、摘要、正文等（字段与 `content/schemas/news.schema.json` 对齐）
4. Publish：会直接 commit 到 `main` 的 `content/news/`
5. 等 GitHub Actions 绿勾 + 宝塔约 5 分钟拉取 `deploy` 分支

注意：

- `platforms` / `tags` / `countries` 用下拉，勿手填乱码。
- `sample: true` 时 `needs_review` 也必须 true（校验脚本会拦）。
- 文件名日期要与 frontmatter `date` 一致（后台 slug 模板已按日期生成）。
- 合规国家页 JSON（`content/compliance/*.json`）结构复杂，**暂不放进 CMS**，继续用 Git / 脚本改。

---

## 费用

| 组件 | 费用 |
| --- | --- |
| Decap CMS（静态 + CDN） | 免费 |
| OAuth 桥（本机 Node） | 免费（吃一点内存） |
| Umami + Postgres（Docker） | 免费（吃一点磁盘/内存） |
| 访客控制台（本机 Node + SQLite 文件） | 免费（再吃一点内存） |
| GitHub Actions 构建 | 免费额度内 |

不要用付费的 Decap Turbo / Netlify Identity，当前方案已够用。

---

## 排障

| 现象 | 处理 |
| --- | --- |
| Login 弹窗一闪关掉 / authorizing 卡住 | 查 `/oauth/health`、Client Secret、callback URL 是否完全一致 |
| 登录成功但 repo not found | `config.yml` 的 `repo` 是否 `zuyuanwu-cell/yuanshan-channel`；账号是否有写权限 |
| 保存后站点没变 | Actions 是否失败（validate:content）；宝塔 cron 是否在拉 `deploy` |
| 没有统计数据 | `PUBLIC_UMAMI_URL` 是否为 `https://ys.tongzhoukuajing.com/umami`（无末尾 `/`）并已重新构建；`/umami/script.js` 是否被主站 404（Nginx 要用 `location ^~ /umami/`）；Website ID 是否对；浏览器是否拦广告 |
| `umami-db` 起不来，日志 `Operation not permitted` | 保留 compose 里 Postgres 的 `privileged: true` 和 `seccomp:unconfined` |
| OAuth 进程挂了 | `pm2 status` / 宝塔 Node 项目日志；`pm2 restart yuanshan-decap-oauth` |
| `/console/` 打不开 | 静态站 cron 不会拉起这个进程。确认 `pm2 status` 里有 `yuanshan-console`，且 Nginx 有 `location /console/`。见 [`console/README.md`](./console/README.md) |
| 洽谈合作提示「推送未配置」 | 服务器 `.env` 的 `WECOM_WEBHOOK_URL` 为空或进程没重启。见下方「合作浮层与企业微信」 |
| 洽谈合作提示发送失败 | webhook 须为 `https://qyapi.weixin.qq.com/...`；机器人被移出群也会失败。`pm2 logs yuanshan-decap-oauth` 只看状态，不要把 key 打进日志 |

---

## F. 合作浮层与企业微信

页脚和右下角「洽谈合作」随静态站发布。表单不直连企业微信（浏览器会被 CORS 拦住），而是 `POST /oauth/api/contact`，由已经在跑的 OAuth 桥转发。**不用新加 Nginx**：现有 `location /oauth/` 会把这个路径转到 `127.0.0.1:4181`。

静态构建**不会**更新这台 Node 进程。改了 OAuth 桥之后，把 `server.js`、`contact.js`、`subscribe.js`、`notify-updates.js` 拷到服务器同一目录，再执行：

```bash
cd /www/wwwroot/yuanshan-decap-oauth
pm2 restart yuanshan-decap-oauth
```

### 填 webhook

1. 企业微信群 → 群机器人 → 添加 → 复制 Webhook 地址（形如 `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=...`）。
2. 只写进服务器上的 `.env`：

   ```bash
   WECOM_WEBHOOK_URL=https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=替换成你的key
   ```

3. `pm2 restart yuanshan-decap-oauth`（或在宝塔 Node 项目里把该变量加进环境后重启）。
4. 自检：

   ```bash
   curl -sS https://ys.tongzhoukuajing.com/oauth/health
   # contact 与 subscribe 都应为 "configured"

   curl -sS -X POST https://ys.tongzhoukuajing.com/oauth/api/contact \
     -H 'Content-Type: application/json' \
     -d '{"name":"测试","contact":"wx","message":"连通测试","page":"https://ys.tongzhoukuajing.com/"}'
   ```

留空 `WECOM_WEBHOOK_URL`（且别名 `YUANSHAN_WECOM_WEBHOOK_URL` 也为空）时，接口返回 `503` 和 `{"ok":false,"error":"unconfigured"}`，合作页写「推送未配置」。关注页仍会生成 JSON / RSS，只是群里没有这条偏好。不要把真实 key 提交进仓库，也不要写进 GitHub Actions Secrets（静态站用不到）。

消息正文是 markdown：姓名、联系方式、留言、页面 URL、Asia/Shanghai 时间。同一 IP 约 10 分钟内最多 8 次。

### 市场订阅也走这条 webhook

`/subscribe/` 点「生成订阅」时，浏览器 `POST /oauth/api/subscribe`，正文只有市场 id、内容类型、起始日期和页面 URL。桥用同一套环境变量发 markdown，响应里不带回 key。

内容更新用 cron，不要在浏览器里发：

```bash
cd /www/wwwroot/yuanshan-decap-oauth
set -a && . ./.env && set +a
node notify-updates.js \
  --index /www/wwwroot/ys.tongzhoukuajing.com/v1/updates.json \
  --state /var/lib/yuanshan/wecom-seen.json
```

第一次运行只把当前条目 id 写进 state，不发送。之后只发新 id。`--markets us,sg`、`--types rules`、`--since 2026-10-01` 可收窄。`--dry-run` 只在终端打印 markdown。没配 webhook 时跳过并退出码 0。脚本不会把 URL 打出来。

### 换微信二维码

1. 用新图覆盖 `content/assets/contact/wechat-qr.webp`（正方形 webp 即可）。
2. `content/site.json` 里 `contact.wechatQr` 保持 `/media/contact/wechat-qr.webp`，`wechatQrNote` 是卡片上的那句说明。
3. 推 `main`。构建会把文件复制到站点的 `/media/contact/wechat-qr.webp`。不要只改服务器上的 `dist/`，下次部署会盖掉。

社交链接同样只改 `site.json` 的 `social[].href`。没有 `https://` 且没有 `hint` 的项是占位图标；视频号没有主页时把搜索提示写在 `hint`，图标保持实心。

---

## G. 访客控制台

Decap 继续负责改资讯。访客注册和工作人员看板是另一个 Node 进程，源码在 [`console/`](./console/README.md)。

合并进 `main` 之后，服务器上还要做这些（cron 同步的 `deploy` 分支里没有这个进程）：

1. 把 `deploy/console/` 拷到例如 `/www/wwwroot/yuanshan-console`（不要放进站点根，避免被拉取脚本删掉）。
2. `cp .env.example .env`，写入 `CONSOLE_SESSION_SECRET`。公开注册前先写 `CONSOLE_ADMIN_EMAIL` 和 `CONSOLE_ADMIN_PASSWORD`，这样第一个访客不会变成工作人员。
3. `npm install`，然后 `pm2 start ecosystem.config.cjs`。
4. Nginx 增加：

```nginx
location = /console {
    return 301 /console/;
}
location /console/ {
    proxy_pass http://127.0.0.1:4182/console/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
}
```

5. `curl -sS https://ys.tongzhoukuajing.com/console/api/health` 看到 `"ok":true` 后，再打开 `/console/`。

看板里的浏览量走 Umami API（`UMAMI_API_URL` 推荐 `http://127.0.0.1:3001`）。在线人数来自公开页的 `presence.js`，默认统计近 3 分钟的心跳。账号库是该目录下的 `data/console.sqlite`。细节、限流和重置密码的办法都在 [`console/README.md`](./console/README.md)。
