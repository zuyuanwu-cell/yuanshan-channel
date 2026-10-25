/**
 * Directory pages use a trailing slash. Files (images, JSON, XML) do not.
 * Query and hash stay after the slash: `/news?tag=fees` → `/news/?tag=fees`.
 *
 * @param {string} path
 */
export function withTrailingSlash(path) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const hashAt = path.indexOf('#');
  const hash = hashAt >= 0 ? path.slice(hashAt) : '';
  const beforeHash = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const queryAt = beforeHash.indexOf('?');
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : '';
  const pathname = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash;
  if (pathname === '' || pathname === '/') return `/${query}${hash}`;
  if (/\.[a-z0-9]{1,8}$/i.test(pathname)) return `${pathname}${query}${hash}`;
  const slashed = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${slashed}${query}${hash}`;
}
