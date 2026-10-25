import assert from 'node:assert/strict';
import { withTrailingSlash } from './trailing-slash.mjs';

assert.equal(withTrailingSlash('/news'), '/news/');
assert.equal(withTrailingSlash('/news/'), '/news/');
assert.equal(withTrailingSlash('/compliance/us'), '/compliance/us/');
assert.equal(withTrailingSlash('/news?category=regulation'), '/news/?category=regulation');
assert.equal(withTrailingSlash('/news/?tag=fees'), '/news/?tag=fees');
assert.equal(withTrailingSlash('/hs-codes?country=us'), '/hs-codes/?country=us');
assert.equal(withTrailingSlash('/about#channel'), '/about/#channel');
assert.equal(withTrailingSlash('/'), '/');
assert.equal(withTrailingSlash('/v1/updates.json'), '/v1/updates.json');
assert.equal(withTrailingSlash('/sitemap.xml'), '/sitemap.xml');
assert.equal(withTrailingSlash('/brand/yuanshan-mark.png'), '/brand/yuanshan-mark.png');
assert.equal(withTrailingSlash('/media/hero/rules.webp'), '/media/hero/rules.webp');
assert.equal(withTrailingSlash('https://example.com/news'), 'https://example.com/news');

console.log('trailing-slash ok');
