# 远山频道 · 免费管理后台（编辑账号 + 访问统计）

目标（一次配好，长期免费）：

1. **文章资讯后台**：浏览器打开 `/admin/`，用 GitHub 登录后改 `content/news/`，保存即推 `main`，Actions 构建，宝塔约 5 分钟同步上线。
2. **编辑账号**：谁有 GitHub 仓库写权限，谁就能进后台（不做客服式访客会员）。
3. **访问量**：自建 Umami，看 PV / 访客 / 来源；脚本由构建环境变量注入。

> 仓库已提交静态页与安装文件，**OAuth 与 Umami 还要你在宝塔上做一次**，没做完之前 `/admin/` 能打开但点 Login 会失败；统计脚本也不会出现。

---

## 立刻可用 vs 需你操作

| 项目 | 状态 |
| --- | --- |
| `https://ys.tongzhoukuajing.com/admin/` 静态页 | 推 `main` 后约 5–10 分钟可打开 |
| 页脚「编辑入口」 | 同上 |
| GitHub 登录写资讯 | **需**创建 OAuth App + 起 OAuth 桥 |
| Umami 看板 | **需** Docker 安装 + 反代 + 填 Actions Secrets |
| 访客会员体系 | 不做（按你的选择） |

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
# {"ok":true,"service":"yuanshan-decap-oauth"}
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

详见 [`deploy/umami/README.md`](./umami/README.md)。摘要：

```bash
cd /www/server/yuanshan-umami   # 拷入 deploy/umami/
cp .env.example .env            # 填 POSTGRES_PASSWORD、APP_SECRET
docker compose up -d
```

反代到子域（如 `stats.tongzhoukuajing.com`）或主站 `/umami/`。  
浏览器打开 → 默认 `admin` / `umami` → **立刻改密** → Settings → Websites → 添加 `ys.tongzhoukuajing.com` → 复制 Website ID。

---

## D. 把 Umami 接到站点构建

GitHub 仓库 → **Settings → Secrets and variables → Actions → New repository secret**：

| Name | Value |
| --- | --- |
| `PUBLIC_UMAMI_URL` | 例如 `https://stats.tongzhoukuajing.com`（无末尾 `/`） |
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami 给出的 UUID |

推一次 `main`（或手动跑 workflow **Build for Baota**）。构建后页面 `<head>` 才会出现统计脚本；两个 Secret 任一为空则不加载。

本地：复制根目录 `.env.example` 为 `.env` 填同样两项，再 `npm run build:baota`。

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
| GitHub Actions 构建 | 免费额度内 |

不要用付费的 Decap Turbo / Netlify Identity，当前方案已够用。

---

## 排障

| 现象 | 处理 |
| --- | --- |
| Login 弹窗一闪关掉 / authorizing 卡住 | 查 `/oauth/health`、Client Secret、callback URL 是否完全一致 |
| 登录成功但 repo not found | `config.yml` 的 `repo` 是否 `zuyuanwu-cell/yuanshan-channel`；账号是否有写权限 |
| 保存后站点没变 | Actions 是否失败（validate:content）；宝塔 cron 是否在拉 `deploy` |
| 没有统计数据 | Secrets 是否已设并重新构建；浏览器是否拦广告；Website ID 是否对 |
| OAuth 进程挂了 | `pm2 status` / 宝塔 Node 项目日志；`pm2 restart yuanshan-decap-oauth` |
