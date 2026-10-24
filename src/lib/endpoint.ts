export function json(data: unknown): Response {
  return new Response(`${JSON.stringify(data, null, 2)}\n`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export function xml(body: string): Response {
  return new Response(body.endsWith('\n') ? body : `${body}\n`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}
