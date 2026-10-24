/** China Standard Time is UTC+8 all year. Avoid ICU so a slim Node 16 build still formats dates. */

const SHIFT_MS = 8 * 60 * 60 * 1000;

export function formatShanghai(date) {
  const shifted = new Date(date.getTime() + SHIFT_MS);
  const iso = shifted.toISOString();
  return `${iso.slice(0, 10)} ${iso.slice(11, 19)}`;
}

/** Unix ms of 00:00:00 at Asia/Shanghai on the calendar day that contains `ms`. */
export function shanghaiStartOfDay(ms) {
  const shifted = new Date(ms + SHIFT_MS).toISOString();
  const day = shifted.slice(0, 10);
  return Date.parse(`${day}T00:00:00+08:00`);
}
