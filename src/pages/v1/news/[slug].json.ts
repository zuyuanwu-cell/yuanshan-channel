import type { APIRoute } from 'astro';
import { json } from '../../../lib/endpoint';
import { newsDocument, newsSlugs } from '../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return newsSlugs().map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug;
  if (!slug) throw new Error('缺少 slug');
  return json(newsDocument(slug));
};
