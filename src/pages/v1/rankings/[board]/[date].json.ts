import type { APIRoute } from 'astro';
import { json } from '../../../../lib/endpoint';
import { rankingDocument, rankingPaths } from '../../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return rankingPaths().map((entry) => ({ params: { board: entry.board, date: entry.date } }));
}

export const GET: APIRoute = ({ params }) => {
  const board = params.board;
  const date = params.date;
  if (!board || !date) throw new Error('缺少榜位或日期');
  return json(rankingDocument(board, date));
};
