import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWecomBody, createContactHandler, formatShanghai, resolveWebhook } from './contact.js';

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

const sample = {
  name: '林远',
  contact: 'wechat: yuan',
  message: '想谈美妆供货',
  page: 'https://ys.tongzhoukuajing.com/about',
};

test('formatShanghai uses Asia/Shanghai', () => {
  assert.equal(formatShanghai(new Date('2026-10-23T07:30:45Z')), '2026-10-23 15:30:45');
});

test('markdown body keeps fields and strips mention markup', () => {
  const body = buildWecomBody({
    ...sample,
    name: '林<@all>远',
    message: '下一行\n不要',
    at: new Date('2026-10-23T07:30:45Z'),
  });
  assert.equal(body.msgtype, 'markdown');
  assert.match(body.markdown.content, /姓名：林＜@all＞远/);
  assert.match(body.markdown.content, /联系方式：wechat: yuan/);
  assert.match(body.markdown.content, /留言：下一行 不要/);
  assert.match(body.markdown.content, /页面：https:\/\/ys\.tongzhoukuajing\.com\/about/);
  assert.match(body.markdown.content, /2026-10-23 15:30:45（Asia\/Shanghai）/);
  assert.doesNotMatch(body.markdown.content, /<@/);
});

test('resolveWebhook rejects empty and non-https', () => {
  assert.equal(resolveWebhook('').state, 'empty');
  assert.equal(resolveWebhook('   ').state, 'empty');
  assert.equal(resolveWebhook('http://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=x').state, 'bad');
  assert.equal(resolveWebhook('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=x').state, 'ok');
});

test('empty webhook returns 503 and does not call upstream', async () => {
  let called = false;
  const handler = createContactHandler({
    webhookUrl: '',
    fetchImpl: async () => {
      called = true;
      return { ok: true, json: async () => ({ errcode: 0 }) };
    },
  });
  const res = mockRes();
  await handler({ body: sample, headers: {}, socket: {} }, res);
  assert.equal(res.statusCode, 503);
  assert.deepEqual(res.body, { ok: false, error: 'unconfigured' });
  assert.equal(called, false);
});

test('valid submission posts markdown and hides the webhook', async () => {
  let sent;
  const handler = createContactHandler({
    webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=secret',
    now: () => new Date('2026-10-23T07:30:45Z'),
    fetchImpl: async (url, init) => {
      sent = { url, init };
      return { ok: true, json: async () => ({ errcode: 0, errmsg: 'ok' }) };
    },
  });
  const res = mockRes();
  await handler({ body: sample, headers: { 'x-real-ip': '203.0.113.8' }, socket: {} }, res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { ok: true });
  assert.equal(sent.url.includes('secret'), true);
  assert.equal(JSON.stringify(res.body).includes('secret'), false);
  const posted = JSON.parse(sent.init.body);
  assert.match(posted.markdown.content, /林远/);
  assert.match(posted.markdown.content, /15:30:45/);
});

test('invalid body is 400', async () => {
  const handler = createContactHandler({ webhookUrl: '' });
  const res = mockRes();
  await handler({ body: { name: '林' }, headers: {}, socket: {} }, res);
  assert.equal(res.statusCode, 400);
  assert.equal(res.body.error, 'invalid');
});

test('honeypot skips the webhook', async () => {
  let called = false;
  const handler = createContactHandler({
    webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=secret',
    fetchImpl: async () => {
      called = true;
      return { ok: true, json: async () => ({ errcode: 0 }) };
    },
  });
  const res = mockRes();
  await handler({ body: { ...sample, ys_leave_blank: 'https://spam.example' }, headers: {}, socket: {} }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(called, false);
});

test('upstream errcode is 502 without leaking details', async () => {
  const handler = createContactHandler({
    webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=secret',
    fetchImpl: async () => ({ ok: true, json: async () => ({ errcode: 93000, errmsg: 'invalid key' }) }),
  });
  const res = mockRes();
  await handler({ body: sample, headers: {}, socket: {} }, res);
  assert.equal(res.statusCode, 502);
  assert.deepEqual(res.body, { ok: false, error: 'upstream' });
});

test('rate limit returns 429', async () => {
  const handler = createContactHandler({
    webhookUrl: '',
    maxPerWindow: 2,
    windowMs: 60_000,
    now: () => new Date('2026-10-23T07:30:45Z'),
  });
  const req = { body: sample, headers: { 'x-real-ip': '198.51.100.4' }, socket: {} };
  const first = mockRes();
  const second = mockRes();
  const third = mockRes();
  await handler(req, first);
  await handler(req, second);
  await handler(req, third);
  assert.equal(first.statusCode, 503);
  assert.equal(second.statusCode, 503);
  assert.equal(third.statusCode, 429);
  assert.equal(third.body.error, 'rate_limited');
});
