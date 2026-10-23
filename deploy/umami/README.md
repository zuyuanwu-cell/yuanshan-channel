# Umami 访问统计（宝塔自建 · 免费）

开源、无 Cookie、可自建。生产环境挂在主站路径 **`https://ys.tongzhoukuajing.com/umami/`**，不要另开 `stats.` 子域。站点脚本通过环境变量注入，**未配置时线上不加载任何统计脚本**。

## 1. 安装

宝塔需已装 Docker。把本目录拷到服务器，例如 `/www/server/yuanshan-umami/`：

```bash
cd /www/server/yuanshan-umami
cp .env.example .env
# 生成密钥：
openssl rand -hex 24   # 填 POSTGRES_PASSWORD
openssl rand -hex 32   # 填 APP_SECRET
docker compose up -d
docker compose ps
```

本机只监听 `127.0.0.1:3001`。

`docker-compose.yml` 已写好：

- Umami：`BASE_PATH=/umami`、`DATABASE_TYPE=postgresql`，依赖数据库健康检查通过后再启动
- Postgres：命名卷 `umami-postgres-data`，健康检查 `pg_isready -U umami -d umami`
- **这台 VPS 上 Postgres 必须** `privileged: true` 且 `security_opt: ["seccomp:unconfined"]`。否则容器里 `initdb` 报 `Operation not permitted`，库起不来。不要删掉这两项。

## 2. 反代（主站路径）

在 **ys.tongzhoukuajing.com** 的 Nginx（宝塔 → 网站 → 设置 → 配置文件）增加：

```nginx
# ^~ 优先于宝塔默认的 js/css 正则。没有 ^~ 时，/umami/script.js 会被主站静态规则吃掉，返回频道 404。
location ^~ /umami/ {
    proxy_pass http://127.0.0.1:3001/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
}

# 官方镜像的看板样式和脚本在域名根上的 /_next，不在 /umami/_next。
# 主站构建产物在 /_astro，这段不冲突。同样要 ^~，否则 .js/.css 到不了容器。
location ^~ /_next/ {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
}
```

`proxy_pass` 末尾的 `/` 会去掉 `/umami` 前缀。容器内心跳仍是 `http://127.0.0.1:3001/api/heartbeat`，公网是 `https://ys.tongzhoukuajing.com/umami/api/heartbeat`。`/umami` 不带斜杠会 301 到 `/umami/`。

`BASE_PATH=/umami` 记的是这条公网路径。Next 的资源前缀在镜像构建时写死，运行时变量不会把 `/_next` 挪到 `/umami/_next`，所以上面要单独反代 `/_next/`。

保存后重载 Nginx，自检：

```bash
curl -sS https://ys.tongzhoukuajing.com/umami/api/heartbeat
# {"ok":true}
curl -sSI https://ys.tongzhoukuajing.com/umami/script.js | head
# 200，且不是主站「这一页不在目录里」
```

## 3. 首次登录

浏览器打开 `https://ys.tongzhoukuajing.com/umami/`。默认账号：

- 用户：`admin`
- 密码：`umami`

**第一次登录后立刻改掉这个默认密码**（Settings → Profile）。口令是公开的，留着等于把看板敞在公网上。

## 4. 添加网站

1. Settings → Websites → Add website
2. Name：`同舟跨境·远山频道`
3. Domain：`ys.tongzhoukuajing.com`
4. 保存后复制 **Website ID**（UUID）

线上已经添加过网站。只在新装或 Website ID 丢失时重做，不要另建一条重复站点。

## 5. 接到远山频道构建

GitHub 仓库 **Settings → Secrets and variables → Actions** 使用这两个 Secret（已设置则保持原值，不要改地址、不要新造）：

| Secret | 值 |
| --- | --- |
| `PUBLIC_UMAMI_URL` | `https://ys.tongzhoukuajing.com/umami`（不要末尾斜杠） |
| `PUBLIC_UMAMI_WEBSITE_ID` | Umami 里复制的 UUID |

`.github/workflows/build-baota.yml` 会在构建时读入。推 `main` 重建后，页面 `<head>` 才加载 `…/umami/script.js`。本地预览可建仓库根目录 `.env`：

```
PUBLIC_UMAMI_URL=https://ys.tongzhoukuajing.com/umami
PUBLIC_UMAMI_WEBSITE_ID=你的-uuid
```

留空 = 不注入脚本。

## 6. 编辑账号（Umami）

Settings → Users → 可加只读或管理员。这是**统计后台**的账号，和 Decap / GitHub 编辑账号无关。

完整步骤见 [../ADMIN.md](../ADMIN.md)。
