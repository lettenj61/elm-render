'use strict';

const assert = require('assert');
const render = require('../lib/render');

const testModule = process.env.ELM_RENDER_TEST;

assert.ok(testModule != null, 'no test source specified');

const result = render(testModule, 'Main');
console.log(result);
assert.notEqual(result, '', 'failed to get result');

