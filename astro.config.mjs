// @ts-check
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

const root = fileURLToPath(new URL('.', import.meta.url));
const assetsDir = path.join(root, 'content', 'assets');

// GitHub Pages serves this project under /yuanshan-channel/. Hosts that serve from the
// domain root (Vercel, Cloudflare Pages, a custom domain) should set BASE_PATH=/.
const SITE = process.env.SITE_URL ?? 'https://zuyuanwu-cell.github.io';
const BASE = process.env.BASE_PATH ?? '/yuanshan-channel/';

const MEDIA_TYPES = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

/**
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 * @param {() => void} next
 */
function sendAsset(req, res, next) {
  let url = req.url ?? '';
  const basePrefix = BASE.replace(/\/$/, '');
  if (basePrefix && url.startsWith(`${basePrefix}/`)) url = url.slice(basePrefix.length);
  if (!url.startsWith('/media/')) return next();
  const rel = decodeURIComponent(url.slice('/media/'.length).split('?')[0] ?? '');
  if (!rel || rel.includes('..') || path.isAbsolute(rel)) return next();
  const file = path.resolve(assetsDir, rel);
  if (!file.startsWith(assetsDir + path.sep) && file !== assetsDir) return next();
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return next();
  const type = MEDIA_TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
  res.setHeader('Content-Type', type);
  fs.createReadStream(file).pipe(res);
}

function copyAssets(outDir) {
  if (!fs.existsSync(assetsDir)) return;
  const dest = path.join(outDir, 'media');
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(assetsDir)) {
    if (entry.startsWith('.')) continue;
    fs.cpSync(path.join(assetsDir, entry), path.join(dest, entry), { recursive: true });
  }
}

function validateContent() {
  execSync('node scripts/validate-content.mjs', { cwd: root, stdio: 'inherit' });
}

export default defineConfig({
  site: SITE,
  base: BASE,
  server: { host: true, port: 4477 },
  preview: { host: true, port: 4477 },
  vite: {
    server: { allowedHosts: true },
    plugins: [
      {
        name: 'yuanshan-content-watch',
        configureServer(server) {
          const contentRoot = path.join(root, 'content') + path.sep;
          server.watcher.add(path.join(root, 'content'));
          let ready = false;
          const timer = setTimeout(() => {
            ready = true;
          }, 1200);
          server.httpServer?.once('close', () => clearTimeout(timer));
          server.watcher.on('all', (event, file) => {
            if (!ready) return;
            if (event !== 'change' && event !== 'add' && event !== 'unlink') return;
            if (!file.startsWith(contentRoot)) return;
            try {
              validateContent();
            } catch {
              return;
            }
            ready = false;
            server.restart();
          });
        },
      },
    ],
  },
  integrations: [
    {
      name: 'yuanshan-content-assets',
      hooks: {
        'astro:server:setup': ({ server }) => {
          server.middlewares.use(sendAsset);
        },
        'astro:build:done': ({ dir }) => {
          copyAssets(fileURLToPath(dir));
        },
      },
    },
  ],
});
