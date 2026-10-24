import type { APIRoute } from 'astro';
import { json } from '../../../../lib/endpoint';
import { getComplianceCountry } from '../../../../lib/content';
import { CONTENT_TYPES, feedDocument, marketIds } from '../../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return marketIds().map((id) => ({ params: { id } }));
}

export const GET: APIRoute = ({ params }) => {
  const id = params.id;
  if (!id) throw new Error('缺少市场');
  const country = getComplianceCountry(id);
  if (!country) throw new Error(`未知市场 ${id}`);
  return json(feedDocument([id], [...CONTENT_TYPES], { id, title: country.name_zh }));
};
