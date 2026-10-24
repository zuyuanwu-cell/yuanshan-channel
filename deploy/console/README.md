# 远山控制台（访客登录 + 工作人员看板）

自建页面，挂在 `https://ys.tongzhoukuajing.com/console/`。和 Decap（`/admin/`）、Umami（`/umami/`）分开。

这一期有四件事：

- 邮箱 + 密码注册、登录、退出。角色是 `admin`（工作人员）和 `member`（访客）。
- 工作人员看板：今天 / 近 7 天 / 近 30 天的浏览量和访客，数据来自已经在跑的 Umami。
- 在线人数：公开页每约 45 秒发一次心跳，统计近 2–5 分钟（默认 3 分钟）里出现过的浏览器标签。
- 登录后的账号页：显示名、改密码。不是资讯编辑器。

改 `content/` 仍用 Decap。控制台顶栏和看板里有「内容编辑」，链到 `/admin/`。

## 为什么不塞进 OAuth 桥

`deploy/admin-oauth` 只做三件事：Decap 的 GitHub 登录、合作表单、市场订阅。没配 `OAUTH_CLIENT_ID` 它会拒绝启动。访客密码、会话和 Umami 令牌放进去，会把 CMS 登录和企业微信绑在同一进程上。

控制台是旁边的进程，默认 `127.0.0.1:4182`。OAuth 桥仍是 `4181`。两边都不要对公网开端口。

数据库用 **SQLite 文件**（[`sql.js`](https://github.com/sql-js/sql.js)，纯 JS / WASM，不用 node-gyp）。Umami 那套 Postgres 在 Docker 里，端口没公布，而且不该把访客密码写进统计库。账号在 `data/console.sqlite`，权限 `0600`。备份这个文件即可。

代码不调用全局 `fetch`，密码用 `crypto.scrypt`。宝塔上的 Node 16.14 及以上可以跑；更稳的是装 Node 18 或 22。

## 本地

```bash
cd deploy/console
npm install
npm test
cp .env.example .env
# 至少改 CONSOLE_SESSION_SECRET（openssl rand -hex 32）
npm start
```

浏览器打开 http://127.0.0.1:4182/console/register 。

没配 Umami 时，看板的浏览量是「—」，并写明未配置。在线人数只要有心跳就会动。

公开站本地预览时，Astro 把 `/console` 转到 `127.0.0.1:4182`（`astro.config.mjs`）。先 `npm start` 再 `npm run dev`，心跳才会记上。控制台没开时，页面上的请求失败会被脚本忽略。

### 第一个工作人员

两条路，用一条即可。

**环境变量（公开注册前用这条）。** 在 `.env` 写上：

```bash
CONSOLE_ADMIN_EMAIL=you@example.com
CONSOLE_ADMIN_PASSWORD='至少10位的密码'
```

先启动（或重启）进程，再把 `/console/` 告诉别人。种子用户在监听端口之前写入。之后注册的都是访客。再次启动不会覆盖这个密码。要改密码时把 `CONSOLE_ADMIN_RESET=1` 重启一次，确认能登录后改回 `0` 再重启。重置会退出该邮箱的全部会话。

**第一个注册的人。** 两个变量都留空时，用户表里还没有人，第一个注册成功的账号是 `admin`，后面的是 `member`。适合本机。线上要先种下管理员再开放，避免路人抢到工作人员。

已经注册错了角色时，在 `deploy/console` 目录：

```bash
node user-admin.js list
node user-admin.js promote person@example.com
node user-admin.js delete person@example.com
```

`delete` 会删掉该用户和会话，对方可以重新注册。命令不接收密码参数。忘了密码、又不是种子账号时：删掉用户让对方重注册，或在对方还能登录时用账号页改密码。

## 看板和 Umami

Umami 继续当访问量的来源，这里只读它的 API，不替换 `/umami/`。

| 变量 | 作用 |
| --- | --- |
| `UMAMI_API_URL` | 推荐 `http://127.0.0.1:3001`。这是容器端口，路径是 `/api/...`，不要加 `/umami`。公网也可以写成 `https://ys.tongzhoukuajing.com/umami`（没有末尾斜杠）。 |
| `UMAMI_WEBSITE_ID` | Umami 网站 UUID，和构建用的 `PUBLIC_UMAMI_WEBSITE_ID` 是同一个值。 |
| `UMAMI_API_TOKEN` | Umami → Settings → API keys。请求头是 `Authorization: Bearer`。 |
| `UMAMI_USERNAME` / `UMAMI_PASSWORD` | 没有 API key 时，用看板账号换短期 token。 |

三个都空着（token 和账号也空）时，健康检查里 `umami` 为 `unconfigured`。配了但连不上时，看板仍显示在线人数，并写明暂时连不上。

时间范围：

- **今天**：Asia/Shanghai 当天 0 点到现在。
- **近 7 天 / 近 30 天**：从现在往前滚动，不是自然周。

结果缓存约 60 秒。页面每 30 秒再向 `/console/api/stats` 拉一次（要工作人员会话）。

## 在线心跳

公开站 `src/layouts/Base.astro` 引入 `public/presence.js`。脚本在每个标签页生成一个会话 id（`sessionStorage`），约 45 秒 `POST /console/api/presence`，带上当前路径。服务端只存会话 id 的哈希和最后一次时间，不存路径、不存 IP。

一个标签页算一个会话。关掉标签后，在窗口期内仍会计入，过期就消失。默认窗口 `CONSOLE_ONLINE_WINDOW_MS=180000`（3 分钟），允许范围 2–5 分钟，超出会被夹到这个区间。

控制台自己的页面不发心跳，避免工作人员看看板时把「在线」抬高。

心跳地址写死为域名根上的 `/console/api/presence`。`CONSOLE_BASE_PATH` 保持 `/console`。要改路径时，同时改 `public/presence.js`，再走一次静态站构建。

片段（完整文件在 `public/presence.js`）：

```js
fetch("/console/api/presence", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ sid: "16到80位的会话id", path: location.pathname }),
  credentials: "omit",
});
```

`Origin` 必须是本站、`TRUSTED_ORIGINS` 里的源，或本机 `localhost` / `127.0.0.1`（给 Astro 开发端口用）。其它来源返回 403。

## 合并之后，宝塔上还要做

静态站的 `deploy` 分支只有构建产物。`presence.js` 会随下一次「Build for Baota」进站点根目录。**控制台进程不会跟着 cron 更新**，和 OAuth 桥一样要单独放一份。

1. 把仓库里的 `deploy/console/` 拷到服务器，例如 `/www/wwwroot/yuanshan-console`（不要放进会被 `baota-pull.sh` 清空的站点根）。
2. `cp .env.example .env`，填 `CONSOLE_SESSION_SECRET`，按上面的办法种下管理员，需要看板数字时再填 Umami。
3. `npm install`（需要能访问 npm）。
4. 启动：

   ```bash
   cd /www/wwwroot/yuanshan-console
   pm2 start ecosystem.config.cjs
   pm2 save
   ```

   程序会读旁边的 `.env`，且不会覆盖已经在环境里的变量。用宝塔「Node 项目」时，启动文件选 `server.js`，运行目录选这一份拷贝，把 `.env` 里的项填进项目环境。

5. 在 `ys.tongzhoukuajing.com` 的 Nginx 增加下面的 location，然后 `nginx -t && nginx -s reload`。
6. 自检：

   ```bash
   curl -sS http://127.0.0.1:4182/console/api/health
   curl -sS https://ys.tongzhoukuajing.com/console/api/health
   ```

   期望 `{"ok":true,"service":"yuanshan-console","umami":"unconfigured"}` 或 `umami` 为 `configured`。响应里没有密钥和 Umami 地址。

7. 浏览器打开 `/console/register` 或用种子账号登录 `/console/`。工作人员应看到看板，以及去 `/admin/` 的链接。

以后更新：覆盖除 `data/` 和 `.env` 以外的文件，再 `npm install` 和 `pm2 restart yuanshan-console`。不要删 `data/console.sqlite`。

## Nginx

`X-Real-IP` 和 `X-Forwarded-For` 用 `$remote_addr`，不要用 `$proxy_add_x_forwarded_for`，避免客户端自己伪造来源。限流只在连接来自本机时才相信这些头。

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

`/admin/`、`/oauth/`、`/umami/` 保持原来的配置。

## 环境变量

见 [`.env.example`](./.env.example)。生产环境 `CONSOLE_SESSION_SECRET` 至少 32 个字符，否则进程拒绝启动。Cookie 名 `ys_session`（httpOnly、SameSite=Lax、Path=/console）。经 Nginx 看到 `https` 时加 `Secure`。会话 14 天，服务端只存令牌的 HMAC，密钥轮换后旧 Cookie 失效。

表单带一次性校验：匿名的登录/注册比对 `ys_csrf` Cookie 和隐藏域；登录后的表单比对会话里的校验值。跨站 `Origin` 直接 403。

限流（单 IP，内存，重启清零）：

| 动作 | 上限 |
| --- | --- |
| 注册 | 5 次 / 小时 |
| 登录 | 10 次 / 15 分钟（IP 和邮箱各算） |
| 心跳 | 120 次 / 分钟 |

密码用 scrypt（N=16384），库里不存明文。登录失败不区分「没有这个邮箱」和「密码错误」。

## 健康检查与接口

| 方法 | 路径 | 谁可以 |
| --- | --- | --- |
| GET | `/console/api/health` | 任何人 |
| POST | `/console/api/presence` | 同源心跳 |
| GET | `/console/api/me` | 已登录 |
| GET | `/console/api/stats` | 工作人员 |
| GET | `/console/login` `/console/register` `/console/account` `/console/dashboard` | 页面 |

## 这一期不做

- 不替换 Decap，不在控制台里改 `content/`。
- 不接付费登录（没有微信开放平台、没有 Auth0）。
- 不做百度收录 / IndexNow。
- 访客不能在页面上把别人提升为工作人员。
