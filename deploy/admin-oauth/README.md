# Decap CMS · GitHub OAuth 桥（宝塔）

静态站本身不能保管 OAuth Client Secret，所以要在宝塔上跑这个很小的 Node 服务。
它负责三件事：`/auth` → 跳 GitHub → `/callback` 换 token → 用 `postMessage` 还给 `/admin/` 弹窗；`POST /api/contact`（经 Nginx 后是 `/oauth/api/contact`）把合作表单转到企业微信群机器人；`POST /api/subscribe`（`/oauth/api/subscribe`）把市场订阅偏好发到同一个群。Webhook 读 `WECOM_WEBHOOK_URL`，这一行为空时读 `YUANSHAN_WECOM_WEBHOOK_URL`，都空则返回 503。不要把 key 写进仓库。内容更新的 cron 是 `notify-updates.js`。步骤见 [ADMIN.md](../ADMIN.md) 的「合作浮层与企业微信」。

## 安装

```bash
cd /www/wwwroot/yuanshan-decap-oauth   # 或你拷贝本目录后的路径
cp .env.example .env
# 编辑 .env，填入 GitHub OAuth App 的 Client ID / Secret
npm install
# 宝塔「Node 项目」或 PM2：
pm2 start ecosystem.config.cjs
# 或: OAUTH_CLIENT_ID=... OAUTH_CLIENT_SECRET=... npm start
```

监听默认 `127.0.0.1:4181`，不要对公网直接暴露端口。

## Nginx 反代（挂到站点 /oauth/）

在 `ys.tongzhoukuajing.com` 站点配置里加：

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

GitHub OAuth App 的 **Authorization callback URL** 填：

```
https://ys.tongzhoukuajing.com/oauth/callback
```

Homepage URL 填：`https://ys.tongzhoukuajing.com`

站点里的 `public/admin/config.yml` 已写好：

```yaml
backend:
  base_url: https://ys.tongzhoukuajing.com
  auth_endpoint: oauth/auth
```

改完 Nginx 后 `nginx -t && nginx -s reload`。自检：

```bash
curl -sS https://ys.tongzhoukuajing.com/oauth/health
# 期望 contact 与 subscribe 都是 "unconfigured"（未配 webhook 时）
# 配好 WECOM_WEBHOOK_URL 或别名 YUANSHAN_WECOM_WEBHOOK_URL 并重启后，两者变为 "configured"
```

完整步骤见上级目录的 [ADMIN.md](../ADMIN.md)。
