'use strict';

const path = require('path');

const ci = require('../lib/compiler-interface');
const testCommand = ci.prepareElmCommand('elm', path.join(__dirname, 'Main.elm'));

console.log(testCommand);
