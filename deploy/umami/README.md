# Umami 访问统计（宝塔自建 · 免费）

开源、无 Cookie、可自建。装在宝塔同一台机上，用 Docker Compose；站点脚本通过环境变量注入，**未配置时线上不加载任何统计脚本**。

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

## 2. 反代与域名

任选其一：

**A. 子域（推荐）** `stats.tongzhoukuajing.com` → `127.0.0.1:3001`

**B. 主站路径** 在 `ys.tongzhoukuajing.com` 加：

```nginx
location /umami/ {
    proxy_pass http://127.0.0.1:3001/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Real-IP $remote_addr;
}
```

若用路径反代，还要在 Umami 环境变量加 `BASE_PATH=/umami`（改 `docker-compose.yml` 后 `docker compose up -d`）。子域方案不用改。

## 3. 首次登录

浏览器打开 Umami 地址，默认账号：

- 用户：`admin`
- 密码：`umami`

**立刻**改 Settings → Profile 里的密码。

## 4. 添加网站

1. Settings → Websites → Add website  
2. Name：`同舟跨境·远山频道`  
3. Domain：`ys.tongzhoukuajing.com`  
4. 保存后复制 **Website ID**（UUID）

## 5. 接到远山频道构建

在 GitHub 仓库 **Settings → Secrets and variables → Actions** 增加：

| Secret | 例 |
| --- | --- |
| `PUBLIC_UMAMI_URL` | `https://stats.tongzhoukuajing.com`（不要末尾斜杠） |
| `PUBLIC_UMAMI_WEBSITE_ID` | 上一步的 UUID |

`.github/workflows/build-baota.yml` 已读这两个变量；推 `main` 重建后，页面才会加载统计脚本。本地预览可建 `.env`：

```
PUBLIC_UMAMI_URL=https://stats.tongzhoukuajing.com
PUBLIC_UMAMI_WEBSITE_ID=你的-uuid
```

留空 = 不注入脚本（当前线上默认状态）。

## 6. 编辑账号（Umami）

Settings → Users → 可加只读或管理员。这是**统计后台**的账号，和 Decap / GitHub 编辑账号无关。

完整步骤见 [../ADMIN.md](../ADMIN.md)。
