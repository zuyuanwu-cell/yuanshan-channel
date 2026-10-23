type NewsFilterKey = 'category' | 'tag' | 'platform';

function initNewsFilters(): void {
  const root = document.querySelector<HTMLElement>('[data-news-list]');
  if (!root) return;
  const cards = [...root.querySelectorAll<HTMLElement>('.news-grid [data-category]')];
  const groups = [...root.querySelectorAll<HTMLElement>('[data-filter-group]')];
  const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
  const count = root.querySelector<HTMLElement>('[data-filter-count]');
  const reset = root.querySelector<HTMLButtonElement>('[data-filter-reset]');
  const state: Record<NewsFilterKey, string> = { category: 'all', tag: 'all', platform: 'all' };

  const matches = (card: HTMLElement) =>
    (state.category === 'all' || card.dataset.category === state.category) &&
    (state.tag === 'all' || (card.dataset.tags ?? '').split(' ').includes(state.tag)) &&
    (state.platform === 'all' || (card.dataset.platforms ?? '').split(' ').includes(state.platform));

  const render = () => {
    let shown = 0;
    for (const card of cards) {
      const visible = matches(card);
      card.hidden = !visible;
      if (visible) shown += 1;
    }
    for (const group of groups) {
      const key = group.dataset.filterGroup as NewsFilterKey;
      for (const button of group.querySelectorAll<HTMLButtonElement>('[data-value]')) {
        button.setAttribute('aria-pressed', button.dataset.value === state[key] ? 'true' : 'false');
      }
    }
    if (empty) empty.hidden = shown !== 0;
    if (count) count.textContent = `${shown} 条`;
    if (reset) reset.hidden = Object.values(state).every((value) => value === 'all');
  };

  const revealActive = () => {
    for (const group of groups) {
      const row = group as HTMLElement;
      const active = row.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!active || row.scrollWidth <= row.clientWidth) continue;
      row.scrollLeft = active.offsetLeft - (row.clientWidth - active.offsetWidth) / 2;
    }
  };

  const sync = () => {
    const next = new URL(location.href);
    for (const key of Object.keys(state) as NewsFilterKey[]) {
      if (state[key] === 'all') next.searchParams.delete(key);
      else next.searchParams.set(key, state[key]);
    }
    history.replaceState(null, '', next);
  };

  for (const group of groups) {
    const key = group.dataset.filterGroup as NewsFilterKey;
    group.addEventListener('click', (event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-value]');
      if (!button) return;
      const value = button.dataset.value ?? 'all';
      state[key] = state[key] === value ? 'all' : value;
      render();
      sync();
    });
  }

  reset?.addEventListener('click', () => {
    state.category = state.tag = state.platform = 'all';
    render();
    sync();
  });

  const params = new URLSearchParams(location.search);
  for (const group of groups) {
    const key = group.dataset.filterGroup as NewsFilterKey;
    const wanted = params.get(key);
    if (wanted && group.querySelector(`[data-value="${CSS.escape(wanted)}"]`)) state[key] = wanted;
  }
  render();
  revealActive();
}

function initPlatformBrowser(): void {
  const root = document.querySelector<HTMLElement>('[data-platform-browser]');
  if (!root) return;
  const cards = [...root.querySelectorAll<HTMLElement>('[data-platform-card]')];
  const regionButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-region]')];
  const beautyButton = root.querySelector<HTMLButtonElement>('[data-beauty-toggle]');
  const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
  let region = 'all';
  let beauty = false;

  const apply = () => {
    let shown = 0;
    for (const card of cards) {
      const regionOk = region === 'all' || card.dataset.region === region;
      const beautyOk = !beauty || card.dataset.beauty === 'true';
      const visible = regionOk && beautyOk;
      card.hidden = !visible;
      if (visible) shown += 1;
    }
    if (empty) empty.hidden = shown !== 0;
  };

  for (const button of regionButtons) {
    button.addEventListener('click', () => {
      region = button.dataset.region ?? 'all';
      for (const item of regionButtons) item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
      const url = new URL(location.href);
      if (region === 'all') url.searchParams.delete('region');
      else url.searchParams.set('region', region);
      history.replaceState(null, '', url);
      apply();
    });
  }

  beautyButton?.addEventListener('click', () => {
    beauty = beautyButton.getAttribute('aria-pressed') !== 'true';
    beautyButton.setAttribute('aria-pressed', beauty ? 'true' : 'false');
    const url = new URL(location.href);
    if (beauty) url.searchParams.set('beauty', '1');
    else url.searchParams.delete('beauty');
    history.replaceState(null, '', url);
    apply();
  });

  const params = new URLSearchParams(location.search);
  const initialRegion = params.get('region');
  const regionMatch = regionButtons.find((button) => button.dataset.region === initialRegion);
  if (initialRegion && regionMatch) {
    region = initialRegion;
    for (const button of regionButtons) {
      button.setAttribute('aria-pressed', button === regionMatch ? 'true' : 'false');
    }
  }
  if (params.get('beauty') === '1' && beautyButton) {
    beauty = true;
    beautyButton.setAttribute('aria-pressed', 'true');
  }
  apply();
}

function initRankingDates(): void {
  const root = document.querySelector<HTMLElement>('[data-ranking-switch]');
  if (!root) return;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-date]')];
  const panels = [...root.querySelectorAll<HTMLElement>('[data-ranking-date]')];
  const show = (date: string) => {
    for (const panel of panels) panel.hidden = panel.dataset.rankingDate !== date;
    for (const button of buttons) {
      button.setAttribute('aria-pressed', button.dataset.date === date ? 'true' : 'false');
    }
  };
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const date = button.dataset.date;
      if (!date) return;
      show(date);
      const url = new URL(location.href);
      url.searchParams.set('date', date);
      history.replaceState(null, '', url);
    });
  }
  const initial = new URLSearchParams(location.search).get('date');
  if (initial && buttons.some((button) => button.dataset.date === initial)) show(initial);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal(): void {
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  if (items.length === 0) return;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    for (const item of items) item.classList.add('is-in');
    return;
  }
  const groups = new Map<Element | null, number>();
  for (const item of items) {
    const parent = item.parentElement;
    const index = groups.get(parent) ?? 0;
    item.style.setProperty('--reveal-i', String(Math.min(index, 6)));
    groups.set(parent, index + 1);
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  for (const item of items) observer.observe(item);
}

function initDeckTilt(): void {
  if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cards = document.querySelectorAll<HTMLElement>('[data-deck-card]');
  for (const card of cards) {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
    });
  }
}

function initDeckCarousel(): void {
  const track = document.querySelector<HTMLElement>('[data-deck-track]');
  if (!track) return;
  const cards = [...track.querySelectorAll<HTMLElement>('[data-deck-card]')];
  const dots = [...document.querySelectorAll<HTMLElement>('[data-deck-dot]')];
  const mobile = window.matchMedia('(max-width: 760px)');

  const setCurrent = (index: number) => {
    cards.forEach((card, i) => card.classList.toggle('is-current', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  const nearest = () => {
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDistance = Infinity;
    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    });
    return best;
  };

  const centerFeatured = () => {
    if (!mobile.matches) return;
    const featured = cards.findIndex((card) => card.classList.contains('featured'));
    const card = cards[Math.max(featured, 0)];
    if (!card) return;
    track.scrollLeft = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    setCurrent(Math.max(featured, 0));
  };

  let frame = 0;
  track.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCurrent(nearest()));
    },
    { passive: true },
  );
  mobile.addEventListener('change', centerFeatured);
  centerFeatured();
}

function initLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const image = dialog?.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const caption = dialog?.querySelector<HTMLElement>('[data-lightbox-caption]');
  if (!dialog || !image || !caption || typeof dialog.showModal !== 'function') return;

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-zoom]');
    if (!trigger?.dataset.zoom) return;
    event.preventDefault();
    image.src = trigger.dataset.zoom;
    caption.textContent = trigger.dataset.zoomCaption ?? '';
    dialog.showModal();
  });
  dialog.addEventListener('click', (event) => {
    const target = event.target as Element;
    if (target === dialog || target.closest('[data-lightbox-close]')) dialog.close();
  });
  dialog.addEventListener('close', () => {
    image.removeAttribute('src');
  });
}


function initTopMarquee(): void {
  const strip = document.querySelector<HTMLElement>('[data-top-marquee]');
  if (!strip || reducedMotion) {
    strip?.classList.add('is-static');
    return;
  }
  const pause = () => strip.classList.add('is-paused');
  const resume = () => strip.classList.remove('is-paused');
  strip.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch' || event.pointerType === 'pen') pause();
  });
  strip.addEventListener('pointerup', resume);
  strip.addEventListener('pointercancel', resume);
  strip.addEventListener('pointerleave', resume);
}

function initContactDock(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-contact-dialog]');
  const form = dialog?.querySelector<HTMLFormElement>('[data-contact-form]');
  const openButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-contact-open]')];
  const status = dialog?.querySelector<HTMLElement>('[data-contact-status]');
  const success = dialog?.querySelector<HTMLElement>('[data-contact-success]');
  if (!dialog || !form || openButtons.length === 0 || !status || !success || typeof dialog.showModal !== 'function') return;

  const notes = {
    error: form.dataset.error ?? '',
    unconfigured: form.dataset.unconfigured ?? '',
    rate: form.dataset.rate ?? '',
  };
  const webhook = form.dataset.webhook ?? '';
  const submitIdle = form.dataset.submit ?? '';
  const submitBusy = form.dataset.sending ?? submitIdle;
  let requestId = 0;

  const setStatus = (message: string) => {
    status.textContent = message;
    status.hidden = message.length === 0;
  };

  const submitButton = () => form.querySelector<HTMLButtonElement>('[type="submit"]');

  const resetForm = () => {
    form.reset();
    form.hidden = false;
    success.hidden = true;
    setStatus('');
    const submit = submitButton();
    if (submit) {
      submit.disabled = false;
      if (submitIdle) submit.textContent = submitIdle;
    }
    form.removeAttribute('aria-busy');
  };

  const focusable = () =>
    [...dialog.querySelectorAll<HTMLElement>('button, input, textarea, select, a[href]')].filter((el) => {
      if (el.tabIndex < 0 || el.hasAttribute('disabled')) return false;
      if (el.closest('[hidden]') || el.closest('[aria-hidden="true"]')) return false;
      return true;
    });

  dialog.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !dialog.open) return;
    const items = focusable();
    if (items.length === 0) {
      event.preventDefault();
      return;
    }
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    const inside = active instanceof HTMLElement && items.includes(active);
    if (event.shiftKey) {
      if (!inside || active === first) {
        event.preventDefault();
        last.focus();
      }
    } else if (!inside || active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  for (const openBtn of openButtons) {
    openBtn.addEventListener('click', () => {
      resetForm();
      dialog.showModal();
      form.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    });
  }

  dialog.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target === dialog || target.closest('[data-contact-close]')) dialog.close();
  });

  dialog.addEventListener('close', () => {
    requestId += 1;
    resetForm();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const current = ++requestId;
    for (const field of form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')) {
      if (field.name === 'ys_leave_blank') continue;
      field.value = field.value.trim();
    }
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const submit = submitButton();
    if (submit) {
      submit.disabled = true;
      if (submitBusy) submit.textContent = submitBusy;
    }
    form.setAttribute('aria-busy', 'true');
    setStatus('');
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          contact: String(data.get('contact') ?? ''),
          message: String(data.get('message') ?? ''),
          page: location.href,
          ys_leave_blank: String(data.get('ys_leave_blank') ?? ''),
        }),
      });
      let body: { ok?: boolean; error?: string } = {};
      try {
        body = (await res.json()) as { ok?: boolean; error?: string };
      } catch {
        body = {};
      }
      if (current !== requestId || !dialog.open) return;
      if (res.ok && body.ok) {
        form.hidden = true;
        success.hidden = false;
        success.focus();
        return;
      }
      if (res.status === 503 || body.error === 'unconfigured') setStatus(notes.unconfigured);
      else if (res.status === 429 || body.error === 'rate_limited') setStatus(notes.rate);
      else setStatus(notes.error);
    } catch {
      if (current === requestId && dialog.open) setStatus(notes.error);
    } finally {
      if (current !== requestId) return;
      form.removeAttribute('aria-busy');
      if (submit && !form.hidden) {
        submit.disabled = false;
        if (submitIdle) submit.textContent = submitIdle;
      }
    }
  });
}

function initWechatPopover(): void {
  const root = document.querySelector<HTMLElement>('[data-wechat]');
  const button = root?.querySelector<HTMLButtonElement>('[data-wechat-btn]');
  const panel = root?.querySelector<HTMLElement>('[data-wechat-panel]');
  if (!root || !button || !panel) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let closeTimer = 0;
  let openedBy: 'pointer' | 'keyboard' = 'pointer';
  let lastPointer = 'mouse';

  const isOpen = () => button.getAttribute('aria-expanded') === 'true';

  const open = () => {
    window.clearTimeout(closeTimer);
    panel.hidden = false;
    button.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    window.clearTimeout(closeTimer);
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(() => {
      if (root.matches(':hover')) return;
      if (openedBy === 'keyboard' && root.contains(document.activeElement)) return;
      close();
    }, 140);
  };

  root.addEventListener('pointerenter', (event) => {
    if (!finePointer.matches || event.pointerType !== 'mouse') return;
    openedBy = 'pointer';
    open();
  });

  root.addEventListener('pointerleave', (event) => {
    if (!finePointer.matches || event.pointerType !== 'mouse') return;
    scheduleClose();
  });

  button.addEventListener('pointerdown', (event) => {
    lastPointer = event.pointerType;
  });

  button.addEventListener('focus', () => {
    if (!finePointer.matches || root.matches(':hover')) return;
    openedBy = 'keyboard';
    open();
  });

  button.addEventListener('blur', () => {
    if (!finePointer.matches) return;
    if (openedBy === 'keyboard') openedBy = 'pointer';
    scheduleClose();
  });

  button.addEventListener('click', (event) => {
    event.preventDefault();
    const fromTouch = lastPointer === 'touch' || lastPointer === 'pen';
    if (event.detail !== 0 && (fromTouch || !finePointer.matches)) {
      if (isOpen()) close();
      else open();
      return;
    }
    open();
  });

  document.addEventListener('pointerdown', (event) => {
    if (!isOpen()) return;
    const target = event.target;
    if (target instanceof Node && root.contains(target)) return;
    close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    close();
  });

  document.querySelector('[data-contact-open]')?.addEventListener('click', close);
  document.querySelector('[data-nav-open]')?.addEventListener('click', close);
}

function initNavSheet(): void {
  const dialog = document.querySelector<HTMLDialogElement>('[data-nav-dialog]');
  const openBtn = document.querySelector<HTMLButtonElement>('[data-nav-open]');
  if (!dialog || !openBtn || typeof dialog.showModal !== 'function') return;

  openBtn.addEventListener('click', () => {
    if (dialog.open) {
      dialog.close();
      return;
    }
    dialog.showModal();
    openBtn.setAttribute('aria-expanded', 'true');
  });

  dialog.addEventListener('close', () => {
    openBtn.setAttribute('aria-expanded', 'false');
  });

  dialog.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target === dialog || target.closest('[data-nav-close]')) {
      dialog.close();
      return;
    }
    const link = target.closest('a');
    if (!link) return;
    dialog.close();
  });
}

initNewsFilters();
initPlatformBrowser();
initRankingDates();
initLightbox();
initReveal();
initDeckTilt();
initDeckCarousel();
initTopMarquee();
initContactDock();
initWechatPopover();
initNavSheet();
