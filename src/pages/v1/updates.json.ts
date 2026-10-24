import type { APIRoute } from 'astro';
import { json } from '../../lib/endpoint';
import { updatesDocument } from '../../lib/read-api';

export const prerender = true;

export const GET: APIRoute = () => json(updatesDocument());
