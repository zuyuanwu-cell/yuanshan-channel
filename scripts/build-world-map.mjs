/**
 * Rebuild src/data/world-polygons.json from Natural Earth via world-atlas.
 *
 *   WORLD_MAP_MODULES=/path/to/package.json node scripts/build-world-map.mjs
 *
 * The package.json directory must have d3-geo, topojson-client, and world-atlas
 * installed. Natural Earth is public domain. world-atlas topology is
 * © Mike Bostock, BSD-3-Clause. 1:110m countries, plus 1:50m where 110m omits
 * a state (Singapore, Hong Kong, and other small markets).
 */
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(process.env.WORLD_MAP_MODULES ?? import.meta.url);
const { feature } = require('topojson-client');
const world110 = require('world-atlas/countries-110m.json');
const world50 = require('world-atlas/countries-50m.json');

const isoList = await fetch(
  'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json',
).then((res) => {
  if (!res.ok) throw new Error(`ISO list ${res.status}`);
  return res.json();
});

/** @type {Map<number, string>} */
const alpha2 = new Map(
  isoList.map((row) => [Number(row['country-code']), String(row['alpha-2']).toLowerCase()]),
);

function numId(id) {
  if (id == null || id === '') return null;
  const n = Number(id);
  return Number.isFinite(n) ? n : null;
}

function asFeatures(topology) {
  return feature(topology, topology.objects.countries).features;
}

const features110 = asFeatures(world110).filter((feat) => numId(feat.id) !== 10);
const have = new Set(features110.map((feat) => numId(feat.id)).filter((id) => id != null));
const extras = asFeatures(world50).filter((feat) => {
  const id = numId(feat.id);
  return id != null && id !== 10 && !have.has(id);
});

function round1(n) {
  return Math.round(n * 100) / 100;
}

/** Keep a ring continuous across the antimeridian so triangles do not wrap the globe. */
function unwind(ring) {
  if (!ring?.length) return [];
  const out = [[ring[0][0], ring[0][1]]];
  for (let i = 1; i < ring.length; i += 1) {
    let lon = ring[i][0];
    const prev = out[out.length - 1][0];
    while (lon - prev > 180) lon -= 360;
    while (lon - prev < -180) lon += 360;
    out.push([lon, ring[i][1]]);
  }
  return out;
}

function clean(ring) {
  const out = [];
  for (const [lon, lat] of ring) {
    const point = [round1(lon), round1(lat)];
    const prev = out[out.length - 1];
    if (prev && prev[0] === point[0] && prev[1] === point[1]) continue;
    out.push(point);
  }
  if (out.length > 2) {
    const first = out[0];
    const last = out[out.length - 1];
    if (first[0] === last[0] && first[1] === last[1]) out.pop();
  }
  return out.length >= 3 ? out : null;
}

function ringArea(ring) {
  let area = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2;
}

function ringCentroid(ring) {
  let x = 0;
  let y = 0;
  let area = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[(i + 1) % ring.length];
    const cross = x1 * y2 - x2 * y1;
    area += cross;
    x += (x1 + x2) * cross;
    y += (y1 + y2) * cross;
  }
  area *= 0.5;
  if (Math.abs(area) < 1e-6) {
    const avg = ring.reduce((sum, point) => [sum[0] + point[0], sum[1] + point[1]], [0, 0]);
    return [avg[0] / ring.length, avg[1] / ring.length];
  }
  let lon = x / (6 * area);
  const lat = y / (6 * area);
  while (lon > 180) lon -= 360;
  while (lon < -180) lon += 360;
  return [lon, lat];
}

function span(ring) {
  let min = Infinity;
  let max = -Infinity;
  for (const [lon] of ring) {
    min = Math.min(min, lon);
    max = Math.max(max, lon);
  }
  return max - min;
}

function polygonsOf(feat) {
  const geometry = feat.geometry;
  if (!geometry) return [];
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.type === 'MultiPolygon' ? geometry.coordinates : [];
  const parts = [];
  for (const polygon of polygons) {
    const rings = polygon.map((ring) => clean(unwind(ring))).filter(Boolean);
    if (!rings.length || span(rings[0]) > 300) continue;
    parts.push(rings);
  }
  return parts;
}

const countries = [];
for (const feat of [...features110, ...extras]) {
  const parts = polygonsOf(feat);
  if (!parts.length) continue;
  let best = parts[0][0];
  let bestArea = -1;
  for (const rings of parts) {
    const area = ringArea(rings[0]);
    if (area > bestArea) {
      bestArea = area;
      best = rings[0];
    }
  }
  const [lon, lat] = ringCentroid(best);
  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;
  for (const [x, y] of best) {
    minLon = Math.min(minLon, x);
    minLat = Math.min(minLat, y);
    maxLon = Math.max(maxLon, x);
    maxLat = Math.max(maxLat, y);
  }
  const idNum = numId(feat.id);
  countries.push({
    id: idNum == null ? '' : (alpha2.get(idNum) ?? ''),
    lon: round1(lon),
    lat: round1(lat),
    small: Math.max(maxLon - minLon, maxLat - minLat) < 4,
    parts,
  });
}

const out = {
  notice:
    'Country shapes from Natural Earth (public domain) via world-atlas (© Mike Bostock, BSD-3-Clause). 1:110m, plus 1:50m where 110m omits a country.',
  countries,
};
const dest = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/world-polygons.json');
writeFileSync(dest, JSON.stringify(out));
const bytes = Buffer.byteLength(JSON.stringify(out));
console.log(`wrote ${dest} (${(bytes / 1024).toFixed(0)} KB, ${countries.length} countries)`);
const wanted = ['us', 'gb', 'cn', 'sg', 'hk', 'mo', 'de', 'fr', 'jp', 'br', 'ru', 'ae', 'bh', 'mt', 'qa'];
for (const code of wanted) {
  const row = countries.find((country) => country.id === code);
  console.log(code, row ? `${row.small ? 'small' : 'land'} ${row.lon},${row.lat} parts ${row.parts.length}` : 'MISSING');
}
