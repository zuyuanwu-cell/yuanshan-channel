import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/seo';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://ys.tongzhoukuajing.com');
  const admin = new URL(absoluteUrl('/admin/', origin)).pathname;
  const consolePath = new URL(absoluteUrl('/console/', origin)).pathname;
  const disallow = [...new Set([admin, consolePath, '/console/'])];
  const body = [
    'User-agent: *',
    'Allow: /',
    ...disallow.map((path) => `Disallow: ${path}`),
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml', origin)}`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
