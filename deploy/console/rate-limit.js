export function createRateLimiter({ now = () => Date.now() } = {}) {
  const buckets = new Map();
  let checks = 0;

  function hit(key, limit, windowMs) {
    const t = now();
    checks += 1;
    if (checks % 200 === 0 || buckets.size > 2000) {
      for (const [name, stamps] of buckets) {
        const live = stamps.filter((ts) => t - ts < 60 * 60 * 1000);
        if (live.length === 0) buckets.delete(name);
        else buckets.set(name, live);
      }
    }
    const fresh = (buckets.get(key) || []).filter((ts) => t - ts < windowMs);
    if (fresh.length >= limit) {
      buckets.set(key, fresh);
      const retryAfterMs = Math.max(0, windowMs - (t - fresh[0]));
      return { ok: false, retryAfterMs };
    }
    fresh.push(t);
    buckets.set(key, fresh);
    return { ok: true, retryAfterMs: 0 };
  }

  return { hit };
}
