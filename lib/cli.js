'use strict';

const fs = require('fs');
const path = require('path');
const cac = require('cac');
const thisPackage = require('../package.json');
const compiler = require('./compiler-interface').default;
const render = require('./render');

function main() {
  const cli = cac('elm-render')
    .help()
    .version(thisPackage.version)
    .option('--elm-binary [PATH]', 'Custom elm compiler path');

  const { args, options } = cli.parse();

  if (options.elmBinary == null) {
    options.elmBinary = 'elm';
  }

  if (options.elmBinary !== 'elm') {
    options.elmBinary = path.normalize(options.elmBinary);
  }

  let source = args[0];
  if (source == null || source === '') {
    console.error('specify elm file to run');
    process.exit(1);
  }

  if (!path.isAbsolute(source)) {
    source = path.join(process.cwd(), source);
  }

  if (!fs.existsSync(source)) {
    console.error('file not found: ' + source);
    process.exit(1);
  }

  try {
    const elmMain = path.parse(source).name;
    const results = compiler(options.elmBinary, source);
    const output = render(results.options.outputJs, elmMain);

    console.log(output);

    fs.rmdirSync(results.options.workingDirectory, { recursive: true });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = main;
