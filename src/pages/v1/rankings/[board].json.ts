import type { APIRoute } from 'astro';
import { json } from '../../../lib/endpoint';
import { getBoards } from '../../../lib/content';
import { rankingDocument } from '../../../lib/read-api';

export const prerender = true;

export function getStaticPaths() {
  return getBoards().map((board) => ({ params: { board: board.id } }));
}

export const GET: APIRoute = ({ params }) => {
  const board = params.board;
  if (!board) throw new Error('缺少榜位');
  return json(rankingDocument(board));
};
