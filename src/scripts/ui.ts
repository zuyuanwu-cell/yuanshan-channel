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

initNewsFilters();
initPlatformBrowser();
initRankingDates();
initLightbox();
initReveal();
initDeckTilt();
initDeckCarousel();
