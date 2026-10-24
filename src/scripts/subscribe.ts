import { canonicalTypes, CONTENT_TYPES, filterFeedItems, sortIds, TYPE_LABELS } from '../lib/feed-filter.mjs';
import { buildAgentPrompt } from '../lib/subscribe-prompt.mjs';
import { url } from '../lib/format';

interface MarketRef {
  id: string;
  name_zh: string;
  region: string;
  region_slug: string;
}

interface RegionRef {
  slug: string;
  title: string;
  markets: string[];
}

interface PreviewItem {
  kind: 'news' | 'ranking';
  id: string;
  type: 'rules' | 'regulation' | 'rankings';
  date: string;
  title: string;
  summary: string;
  markets: string[];
  page: string;
  source_url: string;
  source_name: string;
  needs_review: boolean;
  sample: boolean;
  scope?: 'global';
  board?: string;
}

interface Payload {
  regions: RegionRef[];
  markets: MarketRef[];
  items: PreviewItem[];
  global: {
    json: string;
    rss: string;
    boards: { id: string; name: string; page: string | null }[];
  };
}

interface SavedPackage {
  markets?: string[];
  types?: string[];
  since?: string;
  confirmed?: boolean;
  notice?: string;
}

const STORAGE_KEY = 'yuanshan.package.v1';
const SEND_FLOOR_MS = 420;

function readPayload(): Payload {
  const node = document.getElementById('subscribe-data');
  if (!node?.textContent) throw new Error('缺少订阅数据');
  return JSON.parse(node.textContent) as Payload;
}

function parseTypes(raw: string | null): string[] {
  if (raw === null) return [...CONTENT_TYPES];
  const parts = raw.split(/[,+]/).map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return [];
  return canonicalTypes(parts.filter((part) => (CONTENT_TYPES as readonly string[]).includes(part)));
}

function motionOk(): boolean {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function linkLine(href: string, text: string): HTMLAnchorElement {
  const anchor = document.createElement('a');
  anchor.className = 'text-link';
  anchor.href = href;
  anchor.textContent = text;
  return anchor;
}

function checkMark(): SVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('aria-hidden', 'true');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5 12.5 9.2 17 19 7');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2.4');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.append(path);
  return svg;
}

export function initSubscribe(): void {
  const root = document.querySelector<HTMLElement>('[data-subscribe]');
  if (!root) return;
  const payload = readPayload();
  const names = new Map(payload.markets.map((market) => [market.id, market.name_zh]));
  const marketButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-market]')];
  const typeButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-type]')];
  const sinceInput = root.querySelector<HTMLInputElement>('[data-since]');
  const result = root.querySelector<HTMLElement>('[data-subscribe-result]');
  const regionButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-region-filter]')];
  const clearButton = root.querySelector<HTMLButtonElement>('[data-subscribe-clear]');
  if (!result) return;

  let markets = new Set<string>();
  let types = new Set<string>(CONTENT_TYPES);
  let since = '';
  let phase: 'idle' | 'sending' | 'done' = 'idle';
  let confirmedKey = '';
  let notice = '';
  let revealMotion = false;
  let requestGen = 0;

  const pressed = (button: HTMLButtonElement, on: boolean) => {
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
  };

  const selection = () => {
    const ids = sortIds([...markets]);
    const ordered = canonicalTypes([...types].filter((type) => (CONTENT_TYPES as readonly string[]).includes(type)));
    const day = /^\d{4}-\d{2}-\d{2}$/.test(since) ? since : '';
    return { ids, ordered, day, key: JSON.stringify({ markets: ids, types: ordered, since: day }) };
  };

  const syncRegionToggles = () => {
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-region-toggle]')) {
      const slug = button.dataset.regionToggle ?? '';
      const ids = payload.regions.find((region) => region.slug === slug)?.markets ?? [];
      const allOn = ids.length > 0 && ids.every((id) => markets.has(id));
      button.textContent = allOn ? '取消此地区' : '全选此地区';
      pressed(button, allOn);
    }
  };

  const setBusy = (busy: boolean) => {
    for (const button of marketButtons) button.disabled = busy;
    for (const button of typeButtons) button.disabled = busy;
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-region-toggle]')) button.disabled = busy;
    if (sinceInput) sinceInput.disabled = busy;
    if (clearButton) clearButton.disabled = busy;
  };

  const render = () => {
    for (const button of marketButtons) pressed(button, markets.has(button.dataset.market ?? ''));
    for (const button of typeButtons) pressed(button, types.has(button.dataset.type ?? ''));
    syncRegionToggles();
    setBusy(phase === 'sending');
    result.replaceChildren();

    const { ids, ordered, day } = selection();
    if (ids.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'lede';
      empty.textContent = '先点选市场。订阅按市场打包，不是全站会员。';
      result.append(empty);
      return;
    }
    if (ordered.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'lede';
      empty.textContent = '至少保留一种内容：平台规则、市场法规或热销榜。';
      result.append(empty);
      return;
    }

    const label = ids.map((id) => names.get(id) ?? id).join('、');
    const typeLabel = ordered.map((type) => TYPE_LABELS[type as keyof typeof TYPE_LABELS] ?? type).join('、');
    const head = document.createElement('h2');
    head.textContent = `${label} · ${typeLabel}`;
    result.append(head);

    const filtered = filterFeedItems(payload.items, { markets: ids, types: ordered, since: day }) as PreviewItem[];
    const count = document.createElement('p');
    count.className = 'muted';
    count.textContent = day ? `已选 ${ids.length} 个市场 · ${filtered.length} 条，自 ${day} 起` : `已选 ${ids.length} 个市场 · ${filtered.length} 条`;
    result.append(count);

    const browse = document.createElement('p');
    browse.className = 'sub-links';
    const newsTypes = ordered.filter((type) => type === 'rules' || type === 'regulation');
    if (newsTypes.length > 0) {
      const params = new URLSearchParams();
      params.set('countries', ids.join(','));
      if (newsTypes.length === 1) params.set('category', newsTypes[0] ?? '');
      browse.append(linkLine(`${url('/news')}?${params.toString()}`, '在资讯里看这些市场'));
    }
    for (const id of ids.slice(0, 6)) {
      browse.append(linkLine(url(`/compliance/${id}`), `${names.get(id) ?? id}合规`));
    }
    if (ids.length > 6) {
      const moreMarkets = document.createElement('span');
      moreMarkets.className = 'muted';
      moreMarkets.textContent = `另有 ${ids.length - 6} 个市场`;
      browse.append(moreMarkets);
    }
    result.append(browse);

    const confirmed = phase === 'done' && selection().key === confirmedKey;
    if (!confirmed) {
      const actions = document.createElement('div');
      actions.className = 'sub-submit';
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'source-button';
      button.dataset.subscribeGenerate = '';
      const changed = confirmedKey.length > 0 && selection().key !== confirmedKey;
      button.textContent = phase === 'sending' ? '生成中' : changed ? '选择有变化，重新生成' : '生成订阅';
      if (phase === 'sending') {
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        button.classList.add('is-sending');
      }
      const hint = document.createElement('p');
      hint.className = 'muted';
      hint.textContent = '生成后给出一段提示词，复制给你的 Agent。偏好会交给服务器上的企业微信，浏览器里没有机器人地址。';
      actions.append(button, hint);
      result.append(actions);
      return;
    }

    const confirm = document.createElement('div');
    confirm.className = 'sub-confirm';
    const mark = document.createElement('span');
    mark.className = revealMotion ? 'sub-check is-fresh' : 'sub-check';
    mark.append(checkMark());
    const copy = document.createElement('div');
    const title = document.createElement('p');
    title.className = 'sub-confirm-title';
    title.textContent = '提示词好了';
    const detail = document.createElement('p');
    detail.className = 'muted';
    detail.textContent = notice;
    copy.append(title, detail);
    confirm.append(mark, copy);
    result.append(confirm);

    const prompt = buildAgentPrompt({
      markets: ids.map((id) => ({ id, name: names.get(id) ?? id })),
      types: ordered,
      since: day,
      regions: payload.regions,
      global: ordered.includes('rankings') ? payload.global : null,
      absolute: (path: string) => new URL(url(path), location.origin).href,
    });
    const box = document.createElement('div');
    box.className = revealMotion ? 'sub-prompt is-fresh' : 'sub-prompt';
    const promptLabel = document.createElement('p');
    promptLabel.className = 'sub-prompt-label';
    promptLabel.textContent = '提示词';
    const promptHint = document.createElement('p');
    promptHint.className = 'muted';
    promptHint.textContent = '贴给 Cursor、ChatGPT、Claude 或其他 Agent。';
    const promptText = document.createElement('textarea');
    promptText.className = 'sub-prompt-text';
    promptText.readOnly = true;
    promptText.rows = 8;
    promptText.value = prompt;
    promptText.setAttribute('aria-label', '给 Agent 的提示词');
    promptText.spellcheck = false;
    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'source-button';
    copyButton.dataset.subscribeCopy = '';
    copyButton.textContent = '复制提示词';
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(prompt);
        copyButton.textContent = '已复制';
      } catch {
        promptText.focus();
        promptText.select();
        copyButton.textContent = '请手动复制';
      }
      window.setTimeout(() => {
        copyButton.textContent = '复制提示词';
      }, 1600);
    });
    box.append(promptLabel, promptHint, promptText, copyButton);
    result.append(box);

    const list = document.createElement('ol');
    list.className = 'sub-preview';
    const shown = filtered.slice(0, 12);
    for (const item of shown) {
      const li = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = url(item.page);
      anchor.textContent = item.title;
      const meta = document.createElement('span');
      meta.className = 'muted';
      const bits = [item.date, TYPE_LABELS[item.type]];
      if (item.needs_review) bits.push('待核实');
      if (item.sample) bits.push('示例');
      meta.textContent = bits.join(' · ');
      li.append(anchor, meta);
      list.append(li);
    }
    result.append(list);
    if (filtered.length === 0) {
      const none = document.createElement('p');
      none.className = 'muted';
      none.textContent = '这组条件下还没有内容。提示词里的地址仍然有效，之后站点有更新，再读一次就能看到。';
      result.append(none);
    } else if (filtered.length > shown.length) {
      const more = document.createElement('p');
      more.className = 'muted';
      more.textContent = `还有 ${filtered.length - shown.length} 条。提示词里的地址含全部，不只有上面这几条。`;
      result.append(more);
    }
    revealMotion = false;
  };

  const writeUrl = (confirmed: boolean) => {
    const next = new URL(location.href);
    const { ids, ordered, day } = selection();
    if (ids.length) next.searchParams.set('markets', ids.join(','));
    else next.searchParams.delete('markets');
    if (ordered.length && ordered.length < CONTENT_TYPES.length) next.searchParams.set('types', ordered.join(','));
    else next.searchParams.delete('types');
    if (day) next.searchParams.set('since', day);
    else next.searchParams.delete('since');
    history.replaceState(null, '', next);
    try {
      const stored: SavedPackage = {
        markets: ids,
        types: ordered,
        since: day,
        confirmed,
        notice: confirmed ? notice : '',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* private mode */
    }
  };

  const apply = () => {
    const { key } = selection();
    if (phase === 'done' && key !== confirmedKey) {
      phase = 'idle';
      notice = '';
    }
    render();
    writeUrl(phase === 'done' && key === confirmedKey);
  };

  const noticeFor = (status: number | null): string => {
    if (status === 200) return '已记到同舟的企业微信群。';
    if (status === 503) return '群通知还没在服务器上配置。';
    if (status === 429) return '群通知太频繁，稍后再试。';
    if (status === null) return '这次没连上群通知。';
    return '这次没把偏好送到群里。';
  };

  const submit = async () => {
    if (phase === 'sending') return;
    const picked = selection();
    if (picked.ids.length === 0 || picked.ordered.length === 0) return;
    const gen = ++requestGen;
    phase = 'sending';
    revealMotion = false;
    render();
    const started = performance.now();
    const trap = root.querySelector<HTMLInputElement>('[data-subscribe-trap]')?.value ?? '';
    let status: number | null = null;
    try {
      const response = await fetch('/oauth/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          markets: picked.ids,
          types: picked.ordered,
          since: picked.day,
          page: location.href,
          ys_leave_blank: trap,
        }),
      });
      status = response.ok ? 200 : response.status;
    } catch {
      status = null;
    }
    const wait = SEND_FLOOR_MS - (performance.now() - started);
    if (wait > 0) await new Promise((resolve) => window.setTimeout(resolve, wait));
    if (gen !== requestGen || selection().key !== picked.key) return;
    phase = 'done';
    confirmedKey = picked.key;
    notice = noticeFor(status);
    revealMotion = motionOk();
    writeUrl(true);
    render();
    result.scrollIntoView({ block: 'nearest', behavior: motionOk() ? 'smooth' : 'auto' });
    result.querySelector<HTMLButtonElement>('[data-subscribe-copy]')?.focus();
  };

  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-subscribe-generate]')) void submit();
  });

  for (const button of marketButtons) {
    button.addEventListener('click', () => {
      if (phase === 'sending') return;
      const id = button.dataset.market;
      if (!id) return;
      if (markets.has(id)) markets.delete(id);
      else markets.add(id);
      apply();
    });
  }

  for (const button of typeButtons) {
    button.addEventListener('click', () => {
      if (phase === 'sending') return;
      const type = button.dataset.type;
      if (!type) return;
      if (types.has(type)) types.delete(type);
      else types.add(type);
      apply();
    });
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-region-toggle]')) {
    button.addEventListener('click', () => {
      if (phase === 'sending') return;
      const slug = button.dataset.regionToggle ?? '';
      const ids = payload.regions.find((region) => region.slug === slug)?.markets ?? [];
      const allOn = ids.every((id) => markets.has(id));
      for (const id of ids) {
        if (allOn) markets.delete(id);
        else markets.add(id);
      }
      apply();
    });
  }

  for (const button of regionButtons) {
    button.addEventListener('click', () => {
      const slug = button.dataset.regionFilter ?? 'all';
      for (const item of regionButtons) pressed(item, item === button);
      for (const block of root.querySelectorAll<HTMLElement>('[data-region-block]')) {
        block.hidden = slug !== 'all' && block.dataset.regionBlock !== slug;
      }
    });
  }

  sinceInput?.addEventListener('change', () => {
    if (phase === 'sending') return;
    since = sinceInput.value;
    apply();
  });

  clearButton?.addEventListener('click', () => {
    if (phase === 'sending') return;
    markets = new Set();
    types = new Set(CONTENT_TYPES);
    since = '';
    phase = 'idle';
    confirmedKey = '';
    notice = '';
    if (sinceInput) sinceInput.value = '';
    apply();
  });

  const params = new URLSearchParams(location.search);
  const fromUrl = params.get('markets');
  let saved: SavedPackage | null = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as SavedPackage | null;
  } catch {
    saved = null;
  }
  if (fromUrl) {
    markets = new Set(sortIds(fromUrl.split(',')));
    types = new Set(parseTypes(params.get('types')));
    since = params.get('since') ?? '';
  } else if (saved?.markets?.length) {
    markets = new Set(sortIds(saved.markets));
    types = new Set(saved.types?.length ? parseTypes(saved.types.join(',')) : CONTENT_TYPES);
    since = saved.since ?? '';
  }
  if (sinceInput) sinceInput.value = /^\d{4}-\d{2}-\d{2}$/.test(since) ? since : '';
  if (sinceInput && !sinceInput.value) since = '';
  if (saved?.confirmed && saved.notice && selection().key === JSON.stringify({
    markets: sortIds(saved.markets ?? []),
    types: canonicalTypes((saved.types ?? []).filter((type) => (CONTENT_TYPES as readonly string[]).includes(type))),
    since: /^\d{4}-\d{2}-\d{2}$/.test(saved.since ?? '') ? saved.since : '',
  })) {
    phase = 'done';
    confirmedKey = selection().key;
    notice = saved.notice;
    revealMotion = false;
  }
  render();
  if (markets.size > 0) writeUrl(phase === 'done');
}
