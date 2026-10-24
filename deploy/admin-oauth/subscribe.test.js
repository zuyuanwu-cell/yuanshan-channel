import assert from 'node:assert/strict';
import test from 'node:test';
import { buildSubscribeBody, createSubscribeHandler, readPackage } from './subscribe.js';

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
  markets: ['us', 'sg'],
  types: ['rules', 'regulation'],
  since: '2026-10-01',
  page: 'https://ys.tongzhoukuajing.com/subscribe/?markets=sg,us',
};

test('package reader sorts markets and rejects junk', () => {
  const parsed = readPackage({ ...sample, markets: ['sg', 'us', 'us'] });
  assert.deepEqual(parsed.value.markets, ['sg', 'us']);
  assert.equal(readPackage({ markets: ['US'], types: ['rules'] }).ok, false);
  assert.equal(readPackage({ markets: ['us'], types: ['nope'] }).ok, false);
});

test('markdown names the package and does not include a webhook', () => {
  const body = buildSubscribeBody({ ...sample, markets: ['sg', 'us'], at: new Date('2026-10-23T07:30:45Z') });
  assert.match(body.markdown.content, /市场：sg、us/);
  assert.match(body.markdown.content, /平台规则、市场法规/);
  assert.match(body.markdown.content, /2026-10-23 15:30:45/);
  assert.match(body.markdown.content, /\n>市场：/);
  assert.doesNotMatch(body.markdown.content, /qyapi|key=/);
});

test('empty webhook is 503 and the response hides the url', async () => {
  let called = false;
  const handler = createSubscribeHandler({
    webhookUrl: '',
    fetchImpl: async () => {
      called = true;
      return { ok: true, json: async () => ({ errcode: 0 }) };
    },
  });
  const res = mockRes();
  await handler({ body: sample, headers: {}, socket: {} }, res);
  assert.equal(res.statusCode, 503);
  assert.equal(called, false);
  assert.equal(JSON.stringify(res.body).includes('qyapi'), false);
});

test('valid package posts markdown', async () => {
  let sent;
  const handler = createSubscribeHandler({
    webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=secret',
    now: () => new Date('2026-10-23T07:30:45Z'),
    fetchImpl: async (url, init) => {
      sent = { url, init };
      return { ok: true, json: async () => ({ errcode: 0 }) };
    },
  });
  const res = mockRes();
  await handler({ body: sample, headers: { 'x-real-ip': '203.0.113.9' }, socket: {} }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(JSON.stringify(res.body).includes('secret'), false);
  assert.equal(sent.url.includes('secret'), true);
  const posted = JSON.parse(sent.init.body);
  assert.match(posted.markdown.content, /市场订阅/);
});

test('honeypot skips the webhook', async () => {
  let called = false;
  const handler = createSubscribeHandler({
    webhookUrl: 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=secret',
    fetchImpl: async () => {
      called = true;
      return { ok: true, json: async () => ({ errcode: 0 }) };
    },
  });
  const res = mockRes();
  await handler({ body: { ...sample, ys_leave_blank: 'bot' }, headers: {}, socket: {} }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(called, false);
});
