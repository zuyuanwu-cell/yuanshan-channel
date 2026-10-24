import type { APIRoute } from 'astro';
import { json } from '../../../../../lib/endpoint';
import { getComplianceCountry } from '../../../../../lib/content';
import { comboId, feedDocument, marketIds, typeSubsets } from '../../../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return marketIds().flatMap((id) =>
    typeSubsets().map((types) => ({
      params: { id, combo: comboId(types) },
      props: { types },
    })),
  );
}

export const GET: APIRoute = ({ params, props }) => {
  const id = params.id;
  const types = props.types as string[] | undefined;
  if (!id || !types) throw new Error('缺少市场或内容类型');
  const country = getComplianceCountry(id);
  if (!country) throw new Error(`未知市场 ${id}`);
  return json(feedDocument([id], types, { id: `${id}/${comboId(types)}`, title: country.name_zh }));
};
