const STORAGE_KEY = 'yuanshan-theme';

export type ThemeName = 'light' | 'dark';

const THEME_COLOR: Record<ThemeName, string> = {
  light: '#f3efe6',
  dark: '#09090b',
};

export function readTheme(): ThemeName {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

function paint(theme: ThemeName): void {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  const color = document.querySelector('meta[name="theme-color"]');
  if (color) color.setAttribute('content', THEME_COLOR[theme]);
  const scheme = document.querySelector('meta[name="color-scheme"]');
  if (scheme) scheme.setAttribute('content', theme);
  const light = theme === 'light';
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-value]')) {
    const on = button.dataset.themeValue === theme;
    button.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (button.dataset.themeValue === 'light') {
      button.setAttribute('aria-label', light ? '亮色模式，当前使用' : '切换为亮色模式');
    } else {
      button.setAttribute('aria-label', light ? '切换为暗色模式' : '暗色模式，当前使用');
    }
  }
}

export function initTheme(): void {
  paint(readTheme());

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest<HTMLButtonElement>('[data-theme-value]');
    const next = button?.dataset.themeValue;
    if (next !== 'light' && next !== 'dark') return;
    if (next === readTheme()) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode or blocked storage */
    }
    paint(next);
  });

  const media = window.matchMedia('(prefers-color-scheme: light)');
  media.addEventListener('change', (event) => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    paint(event.matches ? 'light' : 'dark');
  });
}
