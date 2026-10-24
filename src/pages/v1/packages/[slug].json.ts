import type { APIRoute } from 'astro';
import { json } from '../../../lib/endpoint';
import { packageDocument, packageSlugs } from '../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return packageSlugs().map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug;
  if (!slug) throw new Error('缺少订阅包');
  return json(packageDocument(slug));
};
