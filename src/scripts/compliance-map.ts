interface View {
  x: number;
  y: number;
  w: number;
  h: number;
}

function readView(el: HTMLElement | SVGElement): View | undefined {
  const x = Number(el.dataset.vx);
  const y = Number(el.dataset.vy);
  const w = Number(el.dataset.vw);
  const h = Number(el.dataset.vh);
  if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) return undefined;
  return { x, y, w, h };
}

export function initComplianceMap(): void {
  const root = document.querySelector<HTMLElement>('[data-cc-map]');
  if (!root || root.dataset.ready === 'true') return;
  root.dataset.ready = 'true';

  const viewport = root.querySelector<HTMLElement>('.cc-map-viewport');
  const svg = root.querySelector<SVGSVGElement>('.cc-map-svg');
  const copy = root.querySelector<HTMLElement>('[data-cc-map-copy]');
  const flag = root.querySelector<HTMLImageElement>('[data-cc-map-flag]');
  const go = root.querySelector<HTMLAnchorElement>('[data-cc-map-go]');
  const jump = root.querySelector<HTMLSelectElement>('[data-cc-jump]');
  if (!viewport || !svg || !copy || !flag || !go) return;

  const baseVal = svg.viewBox.baseVal;
  const base: View = { x: baseVal.x, y: baseVal.y, w: baseVal.width, h: baseVal.height };
  let view: View = { ...base };
  /** Market armed by the first tap on a coarse pointer. A second tap opens it. */
  let armed: SVGAElement | null = null;
  let suppressClick = false;
  let anim = 0;
  const pointers = new Map<number, { x: number; y: number }>();
  let pan: { x: number; y: number; moved: boolean; id: number } | null = null;
  let pinch: { dist: number; view: View; ax: number; ay: number } | null = null;

  const coarse = () => window.matchMedia('(pointer: coarse)').matches;
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const apply = () => {
    svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
    const rect = svg.getBoundingClientRect();
    const scale = rect.width / view.w;
    if (!scale) return;
    const radius = Math.min(16, Math.max(4.5, 16 / scale));
    for (const beacon of svg.querySelectorAll<SVGCircleElement>('.cc-map-beacon')) {
      beacon.setAttribute('r', radius.toFixed(2));
    }
  };

  const clamp = (next: View): View => {
    const minW = base.w * 0.045;
    const w = Math.min(base.w, Math.max(minW, next.w));
    const h = w * (base.h / base.w);
    const marginX = w * 0.35;
    const marginY = h * 0.35;
    const x = Math.min(base.x + base.w - w + marginX, Math.max(base.x - marginX, next.x));
    const y = Math.min(base.y + base.h - h + marginY, Math.max(base.y - marginY, next.y));
    return { x, y, w, h };
  };

  const goTo = (target: View, animate = true) => {
    const next = clamp(target);
    cancelAnimationFrame(anim);
    if (!animate || reduceMotion()) {
      view = next;
      apply();
      return;
    }
    const from = { ...view };
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 280);
      const e = 1 - (1 - t) ** 3;
      view = {
        x: from.x + (next.x - from.x) * e,
        y: from.y + (next.y - from.y) * e,
        w: from.w + (next.w - from.w) * e,
        h: from.h + (next.h - from.h) * e,
      };
      apply();
      if (t < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  };

  const clientToSvg = (clientX: number, clientY: number) => {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const matrix = svg.getScreenCTM();
    if (!matrix) return { x: view.x + view.w / 2, y: view.y + view.h / 2 };
    const mapped = point.matrixTransform(matrix.inverse());
    return { x: mapped.x, y: mapped.y };
  };

  const zoomAt = (clientX: number, clientY: number, factor: number) => {
    const anchor = clientToSvg(clientX, clientY);
    const nextW = view.w * factor;
    const next = clamp({ x: view.x, y: view.y, w: nextW, h: nextW * (base.h / base.w) });
    const sx = (anchor.x - view.x) / view.w;
    const sy = (anchor.y - view.y) / view.h;
    next.x = anchor.x - sx * next.w;
    next.y = anchor.y - sy * next.h;
    goTo(clamp(next), false);
  };

  const showMarket = (link: SVGAElement) => {
    const name = link.dataset.name ?? '';
    const region = link.dataset.region ?? '';
    const must = link.dataset.must ?? '0';
    flag.hidden = false;
    flag.src = link.dataset.flag ?? '';
    copy.replaceChildren();
    const strong = document.createElement('strong');
    strong.textContent = name;
    const meta = document.createElement('span');
    meta.textContent = `${region} · ${must} 项必办`;
    copy.append(strong, meta);
    go.hidden = false;
    go.href = link.getAttribute('href') ?? '';
    go.textContent = '进入';
  };

  const mark = (link: SVGAElement) => {
    for (const other of svg.querySelectorAll<SVGAElement>('.cc-map-link')) {
      other.classList.toggle('is-selected', other === link);
    }
    showMarket(link);
  };

  const clearSelection = () => {
    armed = null;
    for (const other of svg.querySelectorAll<SVGAElement>('.cc-map-link')) other.classList.remove('is-selected');
  };

  const setRegion = (id: string) => {
    const stage = root.querySelector('.cc-map-stage');
    const focusing = id !== 'all';
    stage?.classList.toggle('is-region', focusing);
    for (const link of svg.querySelectorAll<SVGAElement>('.cc-map-link')) {
      link.classList.toggle('is-in-region', focusing && link.dataset.region === id);
    }
    for (const button of root.querySelectorAll<HTMLButtonElement>('[data-cc-region]')) {
      button.setAttribute('aria-pressed', button.dataset.ccRegion === id ? 'true' : 'false');
    }
  };

  viewport.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    cancelAnimationFrame(anim);
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const mid = clientToSvg((a!.x + b!.x) / 2, (a!.y + b!.y) / 2);
      pinch = {
        dist: Math.hypot(a!.x - b!.x, a!.y - b!.y),
        view: { ...view },
        ax: mid.x,
        ay: mid.y,
      };
      pan = null;
      for (const id of pointers.keys()) viewport.setPointerCapture(id);
      return;
    }
    pan = { x: event.clientX, y: event.clientY, moved: false, id: event.pointerId };
  });

  viewport.addEventListener('pointermove', (event) => {
    const current = pointers.get(event.pointerId);
    if (!current) return;
    current.x = event.clientX;
    current.y = event.clientY;
    if (pointers.size >= 2 && pinch) {
      const [a, b] = [...pointers.values()];
      const dist = Math.hypot(a!.x - b!.x, a!.y - b!.y);
      if (pinch.dist > 0 && dist > 0) {
        const factor = pinch.dist / dist;
        const nextW = pinch.view.w * factor;
        const sx = (pinch.ax - pinch.view.x) / pinch.view.w;
        const sy = (pinch.ay - pinch.view.y) / pinch.view.h;
        const next = clamp({ x: 0, y: 0, w: nextW, h: nextW * (base.h / base.w) });
        next.x = pinch.ax - sx * next.w;
        next.y = pinch.ay - sy * next.h;
        view = clamp(next);
        apply();
      }
      suppressClick = true;
      viewport.classList.add('is-panning');
      return;
    }
    if (!pan) return;
    const dx = event.clientX - pan.x;
    const dy = event.clientY - pan.y;
    if (!pan.moved) {
      if (Math.hypot(dx, dy) < 6) return;
      pan.moved = true;
      suppressClick = true;
      viewport.classList.add('is-panning');
      viewport.setPointerCapture(pan.id);
    }
    const rect = svg.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    view = clamp({
      ...view,
      x: view.x - dx * (view.w / rect.width),
      y: view.y - dy * (view.h / rect.height),
    });
    pan.x = event.clientX;
    pan.y = event.clientY;
    apply();
  });

  const endPointer = (event: PointerEvent) => {
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 0) {
      pan = null;
      viewport.classList.remove('is-panning');
    }
  };
  viewport.addEventListener('pointerup', endPointer);
  viewport.addEventListener('pointercancel', endPointer);

  viewport.addEventListener(
    'click',
    (event) => {
      if (suppressClick) {
        suppressClick = false;
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const link = event.target instanceof Element ? event.target.closest<SVGAElement>('a.cc-map-link') : null;
      if (!link) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      if (!coarse() || event.detail === 0) return;
      if (armed === link) return;
      event.preventDefault();
      armed = link;
      mark(link);
      if (link.dataset.small === 'true') {
        const frame = readView(link);
        if (frame) goTo(frame);
      }
    },
    true,
  );

  svg.addEventListener('mouseover', (event) => {
    if (coarse()) return;
    const link = event.target instanceof Element ? event.target.closest<SVGAElement>('a.cc-map-link') : null;
    if (link) mark(link);
  });

  svg.addEventListener('focusin', (event) => {
    const link = event.target instanceof Element ? event.target.closest<SVGAElement>('a.cc-map-link') : null;
    if (!link) return;
    mark(link);
    if (!coarse() && link.dataset.small === 'true') {
      const frame = readView(link);
      if (frame) goTo(frame);
    }
  });

  viewport.addEventListener('keydown', (event) => {
    if (event.target !== viewport) return;
    const stepX = view.w * 0.12;
    const stepY = view.h * 0.12;
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    if (event.key === '+' || event.key === '=') zoomAt(cx, cy, 0.75);
    else if (event.key === '-' || event.key === '_') zoomAt(cx, cy, 1.33);
    else if (event.key === '0' || event.key === 'Home') {
      setRegion('all');
      goTo(base);
    } else if (event.key === 'ArrowLeft') goTo({ ...view, x: view.x - stepX }, false);
    else if (event.key === 'ArrowRight') goTo({ ...view, x: view.x + stepX }, false);
    else if (event.key === 'ArrowUp') goTo({ ...view, y: view.y - stepY }, false);
    else if (event.key === 'ArrowDown') goTo({ ...view, y: view.y + stepY }, false);
    else if (event.key === 'Escape') clearSelection();
    else return;
    event.preventDefault();
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') clearSelection();
  });

  viewport.addEventListener(
    'wheel',
    (event) => {
      event.preventDefault();
      const factor = event.deltaY > 0 ? 1.12 : 0.88;
      zoomAt(event.clientX, event.clientY, factor);
    },
    { passive: false },
  );

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-cc-zoom]')) {
    button.addEventListener('click', () => {
      const rect = svg.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (button.dataset.ccZoom === 'in') zoomAt(cx, cy, 0.72);
      else if (button.dataset.ccZoom === 'out') zoomAt(cx, cy, 1.4);
      else {
        setRegion('all');
        goTo(base);
      }
    });
  }

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-cc-region]')) {
    button.addEventListener('click', () => {
      const id = button.dataset.ccRegion ?? 'all';
      setRegion(id);
      if (id === 'all') goTo(base);
      else {
        const frame = readView(button);
        if (frame) goTo(frame);
      }
    });
  }

  jump?.addEventListener('change', () => {
    if (jump.value) window.location.assign(jump.value);
  });

  window.addEventListener('resize', apply);
  apply();
}
