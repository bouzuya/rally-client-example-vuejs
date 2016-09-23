import * as assert from 'power-assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import beater from 'beater';

const { test } = beater();

test('add', () => {
  assert(proxyquire);
  assert(sinon);
});
