import { joinBase } from "./config.js";
import { formatShanghai } from "./time.js";

export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatInt(value) {
  if (typeof value !== "number" || !Number.isFinite(value)) return "—";
  const sign = value < 0 ? "-" : "";
  const digits = String(Math.round(Math.abs(value)));
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const NOTICES = {
  profile: "显示名已更新。",
  password: "密码已更新。其他设备上的登录已退出。",
};

function roleLabel(role) {
  return role === "admin" ? "工作人员" : "访客";
}

function layout({ title, base, user, csrf, main, script }) {
  const css = joinBase(base, "/console.css");
  const home = joinBase(base, "/");
  const links = [`<a href="/">返回频道</a>`];
  if (user && user.role === "admin") {
    links.push(`<a href="${esc(joinBase(base, "/dashboard"))}">看板</a>`);
    links.push(`<a href="/admin/">内容编辑</a>`);
    links.push(`<a href="/umami/">Umami</a>`);
  }
  if (user) links.push(`<a href="${esc(joinBase(base, "/account"))}">账号</a>`);
  else {
    links.push(`<a href="${esc(joinBase(base, "/login"))}">登录</a>`);
    links.push(`<a href="${esc(joinBase(base, "/register"))}">注册</a>`);
  }
  const logout = user
    ? `<form method="post" action="${esc(joinBase(base, "/logout"))}">
        <input type="hidden" name="_csrf" value="${esc(csrf)}" />
        <button class="linkish" type="submit">退出</button>
      </form>`
    : "";
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <meta name="color-scheme" content="dark" />
  <meta name="theme-color" content="#09090b" />
  <title>${esc(title)} · 远山控制台</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="${esc(css)}" />
</head>
<body>
  <a class="skip" href="#content">跳到内容</a>
  <header class="top">
    <a class="brand" href="${esc(home)}">
      <span class="mark" aria-hidden="true">远</span>
      <span><strong>远山频道</strong><em>控制台</em></span>
    </a>
    <nav class="nav" aria-label="控制台">
      ${links.join("")}
      ${logout}
    </nav>
  </header>
  <main id="content" class="wrap">${main}</main>
  ${script ? `<script src="${esc(script)}" defer></script>` : ""}
</body>
</html>`;
}

function alertBox(error, notice) {
  if (error) return `<p class="alert" role="alert">${esc(error)}</p>`;
  if (notice && NOTICES[notice]) return `<p class="notice" role="status">${esc(NOTICES[notice])}</p>`;
  return "";
}

export function renderLogin({ base, csrf, error, email }) {
  const main = `
    <section class="card narrow">
      <h1>登录</h1>
      <p class="lede">工作人员看访问看板。注册访客进入自己的账号页。改资讯仍走原来的编辑入口。</p>
      ${alertBox(error)}
      <form method="post" action="${esc(joinBase(base, "/login"))}">
        <input type="hidden" name="_csrf" value="${esc(csrf)}" />
        <label for="email">邮箱</label>
        <input id="email" name="email" type="email" autocomplete="username" required maxlength="254" value="${esc(email || "")}" />
        <label for="password">密码</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required minlength="10" maxlength="128" />
        <button type="submit">登录</button>
      </form>
      <p class="switch">没有账号？<a href="${esc(joinBase(base, "/register"))}">注册</a></p>
    </section>`;
  return layout({ title: "登录", base, user: null, main });
}

export function renderRegister({ base, csrf, error, email, displayName }) {
  const main = `
    <section class="card narrow">
      <h1>注册</h1>
      <p class="lede">第一个注册成功的账号会成为工作人员。服务器若已用环境变量种下管理员，后来的注册都是访客。</p>
      ${alertBox(error)}
      <form method="post" action="${esc(joinBase(base, "/register"))}">
        <input type="hidden" name="_csrf" value="${esc(csrf)}" />
        <div class="hp" aria-hidden="true">
          <label for="company_website">公司网站</label>
          <input id="company_website" name="company_website" tabindex="-1" autocomplete="off" />
        </div>
        <label for="email">邮箱</label>
        <input id="email" name="email" type="email" autocomplete="username" required maxlength="254" value="${esc(email || "")}" />
        <label for="displayName">显示名 <span>（可空）</span></label>
        <input id="displayName" name="displayName" type="text" autocomplete="nickname" maxlength="40" value="${esc(displayName || "")}" />
        <label for="password">密码 <span>至少 10 位</span></label>
        <input id="password" name="password" type="password" autocomplete="new-password" required minlength="10" maxlength="128" />
        <button type="submit">注册</button>
      </form>
      <p class="switch">已有账号？<a href="${esc(joinBase(base, "/login"))}">登录</a></p>
    </section>`;
  return layout({ title: "注册", base, user: null, main });
}

export function renderAccount({ base, user, csrf, error, notice }) {
  const created = formatShanghai(new Date(user.createdAt));
  const main = `
    <section class="card">
      <p class="kicker">${esc(roleLabel(user.role))}</p>
      <h1>你好，${esc(user.displayName)}</h1>
      <p class="lede">${
        user.role === "admin"
          ? "这是工作人员账号。访问看板在「看板」。资讯正文仍在 Decap 里改。"
          : "这是访客账号。这一期只有欢迎页和资料，不含资讯编辑。"
      }</p>
      ${alertBox(error, notice)}
      <dl class="facts">
        <div><dt>邮箱</dt><dd>${esc(user.email)}</dd></div>
        <div><dt>身份</dt><dd>${esc(roleLabel(user.role))}</dd></div>
        <div><dt>注册时间</dt><dd>${esc(created)}（Asia/Shanghai）</dd></div>
      </dl>
      <form method="post" action="${esc(joinBase(base, "/account"))}">
        <input type="hidden" name="_csrf" value="${esc(csrf)}" />
        <label for="displayName">显示名</label>
        <input id="displayName" name="displayName" type="text" maxlength="40" value="${esc(user.displayName)}" />
        <button type="submit">保存显示名</button>
      </form>
      <form method="post" action="${esc(joinBase(base, "/account/password"))}">
        <input type="hidden" name="_csrf" value="${esc(csrf)}" />
        <label for="currentPassword">当前密码</label>
        <input id="currentPassword" name="currentPassword" type="password" autocomplete="current-password" required minlength="10" maxlength="128" />
        <label for="newPassword">新密码 <span>至少 10 位</span></label>
        <input id="newPassword" name="newPassword" type="password" autocomplete="new-password" required minlength="10" maxlength="128" />
        <button type="submit">修改密码</button>
      </form>
    </section>`;
  return layout({ title: "账号", base, user, csrf, main });
}

export function renderDashboard({ base, user, csrf, online, umami, windowMs }) {
  const minutes = Math.round(windowMs / 60000);
  const ranges = (umami && umami.ranges) || {};
  const card = (key, label) => {
    const row = ranges[key] || {};
    return `<article class="stat">
      <h2>${esc(label)}</h2>
      <p><span data-field="${esc(key)}-pageviews">${esc(formatInt(row.pageviews))}</span><small>浏览量</small></p>
      <p><span data-field="${esc(key)}-visitors">${esc(formatInt(row.visitors))}</span><small>访客</small></p>
    </article>`;
  };
  const main = `
    <section class="card" data-stats data-endpoint="${esc(joinBase(base, "/api/stats"))}">
      <p class="kicker">工作人员</p>
      <h1>访问看板</h1>
      <p class="lede">浏览量和访客来自已经在跑的 Umami，这里只是读接口。在线人数是公开页面的心跳，近 ${esc(String(minutes))} 分钟内出现过的浏览器标签会话。</p>
      <p class="online-label">近 ${esc(String(minutes))} 分钟在线</p>
      <p class="online" data-field="online">${esc(formatInt(online))}</p>
      <div class="grid">
        ${card("today", "今天")}
        ${card("d7", "近 7 天")}
        ${card("d30", "近 30 天")}
      </div>
      <p class="note" data-field="umami-note">${esc((umami && umami.message) || "")}</p>
      <div class="actions">
        <a class="button" href="/admin/">编辑资讯（Decap）</a>
        <a class="button secondary" href="/umami/">打开 Umami</a>
        <a class="button secondary" href="${esc(joinBase(base, "/dashboard"))}">刷新</a>
      </div>
      <p class="fine">资讯正文这一期仍在 Decap 里改。控制台不写 <code>content/</code>。</p>
    </section>`;
  return layout({
    title: "看板",
    base,
    user,
    csrf,
    main,
    script: joinBase(base, "/console.js"),
  });
}

export function renderMessage({ base, user, csrf, title, detail }) {
  const main = `
    <section class="card narrow">
      <h1>${esc(title)}</h1>
      <p class="lede">${esc(detail)}</p>
      <p class="switch"><a href="${esc(joinBase(base, user ? "/" : "/login"))}">返回</a></p>
    </section>`;
  return layout({ title, base, user, csrf, main });
}
