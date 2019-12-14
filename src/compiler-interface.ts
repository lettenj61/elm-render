import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import elmReferenceJson from './elm-reference.json'

type ElmMakeOptions = {
  command: string;
  elmBinary: string;
  elmVersion?: string; // not used
  sourceDirectory: string;
  outputJs: string;
  workingDirectory: string;
};

export default function run(elmBinary: string, source: string): {
  options: ElmMakeOptions,
  buffer: Buffer
 } {
  const options = prepareElmCommand(elmBinary, source);

  return {
    options,
    buffer: execSync(options.command, {
      cwd: options.workingDirectory,
    })
  };
}

export function prepareElmCommand(elmBinary: string, source: string): ElmMakeOptions {
  const workingDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), 'elm-render-')
  );
  const sourceDirectory = path.join(workingDirectory, 'src');
  const elmScript = path.basename(source);
  const outputJs = path.join(workingDirectory, 'elm-render.out.js');

  fs.mkdirSync(sourceDirectory);
  fs.copyFileSync(source, path.join(sourceDirectory, elmScript));
  fs.writeFileSync(
    path.join(workingDirectory, 'elm.json'),
    JSON.stringify(elmReferenceJson, null, 4)
  );

  const command = [
    elmBinary,
    'make',
    '--optimize',
    '--output=' + outputJs,
    path.join(sourceDirectory, elmScript)
  ].join(' ');

  return {
    command,
    elmBinary,
    sourceDirectory,
    outputJs,
    workingDirectory,
  };
}
