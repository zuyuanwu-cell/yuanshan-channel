import type { APIRoute } from 'astro';
import { json } from '../../../../lib/endpoint';
import { complianceDocument, marketIds } from '../../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return marketIds().map((id) => ({ params: { id } }));
}

export const GET: APIRoute = ({ params }) => {
  const id = params.id;
  if (!id) throw new Error('缺少市场');
  return json(complianceDocument(id));
};
