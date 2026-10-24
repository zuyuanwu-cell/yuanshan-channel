/**
 * Rebuild src/data/world-countries.json from Natural Earth via world-atlas.
 *
 *   npm install --no-save d3-geo topojson-client world-atlas
 *   node scripts/build-world-map.mjs
 *
 * Data: Natural Earth 1:110m (admin 0), with 1:50m shapes for countries the
 * 110m set omits (Singapore and other small states). Natural Earth is public
 * domain. world-atlas topology © Mike Bostock, BSD-3-Clause.
 */
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(process.env.WORLD_MAP_MODULES ?? import.meta.url);
const { geoArea, geoGraticule, geoNaturalEarth1, geoPath } = require('d3-geo');
const { feature } = require('topojson-client');
const world110 = require('world-atlas/countries-110m.json');
const world50 = require('world-atlas/countries-50m.json');

const W = 1000;
const H = 500;
const NEAR = 190;

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

const features110 = asFeatures(world110);
const have = new Set(features110.map((f) => numId(f.id)).filter((id) => id != null && id !== 10));
const extras = asFeatures(world50).filter((f) => {
  const id = numId(f.id);
  return id != null && id !== 10 && !have.has(id);
});

const features = [...features110.filter((f) => numId(f.id) !== 10), ...extras];

const projection = geoNaturalEarth1().precision(0.4);
const path = geoPath(projection);
const land = { type: 'FeatureCollection', features };
projection.fitExtent(
  [
    [8, 8],
    [W - 8, H - 8],
  ],
  land,
);
path.digits(1);

function partsOf(feat) {
  const geom = feat.geometry;
  if (!geom) return [];
  const polygons = geom.type === 'Polygon' ? [geom.coordinates] : geom.type === 'MultiPolygon' ? geom.coordinates : [];
  return polygons.map((coordinates) => {
    const part = { type: 'Feature', geometry: { type: 'Polygon', coordinates } };
    const bounds = path.bounds(part);
    return {
      area: geoArea(part),
      d: path(part),
      centroid: path.centroid(part),
      bounds,
    };
  }).filter((part) => part.d);
}

const countries = [];
for (const feat of features) {
  const parts = partsOf(feat).sort((a, b) => b.area - a.area);
  if (!parts.length) continue;
  const primary = parts[0];
  const [px, py] = primary.centroid;
  const near = parts.filter((part) => Math.hypot(part.centroid[0] - px, part.centroid[1] - py) <= NEAR);
  const far = parts.filter((part) => !near.includes(part));
  const boxes = near.map((part) => part.bounds);
  const minX = Math.min(...boxes.map((b) => b[0][0]));
  const minY = Math.min(...boxes.map((b) => b[0][1]));
  const maxX = Math.max(...boxes.map((b) => b[1][0]));
  const maxY = Math.max(...boxes.map((b) => b[1][1]));
  const idNum = numId(feat.id);
  const code = idNum == null ? '' : alpha2.get(idNum) ?? '';
  const fw = maxX - minX;
  const fh = maxY - minY;
  countries.push({
    id: code,
    d: near.map((part) => part.d).join(' '),
    cx: round(px),
    cy: round(py),
    x: round(minX),
    y: round(minY),
    w: round(fw),
    h: round(fh),
    small: Math.max(fw, fh) < 8,
  });
  if (far.length) {
    countries.push({
      id: '',
      d: far.map((part) => part.d).join(' '),
      cx: 0,
      cy: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      small: false,
    });
  }
}

const sphere = path({ type: 'Sphere' });
const graticule = path(geoGraticule().step([20, 20])());

const out = {
  w: W,
  h: H,
  notice:
    'Country shapes from Natural Earth (public domain) via world-atlas (© Mike Bostock, BSD-3-Clause). 1:110m, plus 1:50m where 110m omits a country.',
  sphere,
  graticule,
  countries,
};

const here = dirname(fileURLToPath(import.meta.url));
const dest = resolve(here, '../src/data/world-countries.json');
writeFileSync(dest, JSON.stringify(out));

const bytes = Buffer.byteLength(JSON.stringify(out));
const wanted = ['us', 'gb', 'br', 'sg', 'ae', 'sa', 'id', 'my', 'th', 'vn', 'ph', 'jp', 'kr', 'ru', 'de', 'fr', 'cn'];
console.log(`wrote ${dest} (${(bytes / 1024).toFixed(0)} KB, ${countries.length} shapes)`);
for (const code of wanted) {
  const row = countries.find((c) => c.id === code);
  console.log(code, row ? `${row.small ? 'small' : 'shape'} ${row.w}x${row.h} @${row.cx},${row.cy}` : 'MISSING');
}
const blank = countries.filter((c) => !c.id).length;
console.log('unmapped shapes', blank);

function round(n) {
  return Math.round(n * 10) / 10;
}
