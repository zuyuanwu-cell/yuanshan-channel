import type { APIRoute } from 'astro';
import { xml } from '../../../lib/endpoint';
import { packageDocument, packageSlugs, rssForDocument } from '../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return packageSlugs().map((slug) => ({ params: { slug } }));
}

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug;
  if (!slug) throw new Error('缺少订阅包');
  const doc = packageDocument(slug);
  return xml(rssForDocument(doc, `/v1/packages/${slug}.xml`));
};
