import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/seo';

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://ys.tongzhoukuajing.com');
  const admin = new URL(absoluteUrl('/admin/', origin)).pathname;
  const body = [
    'User-agent: *',
    'Allow: /',
    `Disallow: ${admin}`,
    '',
    `Sitemap: ${absoluteUrl('/sitemap.xml', origin)}`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
