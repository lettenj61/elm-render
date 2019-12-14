"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const elm_reference_json_1 = __importDefault(require("./elm-reference.json"));
function run(elmBinary, source) {
    const options = prepareElmCommand(elmBinary, source);
    return {
        options,
        buffer: child_process_1.execSync(options.command, {
            cwd: options.workingDirectory,
        })
    };
}
exports.default = run;
function prepareElmCommand(elmBinary, source) {
    const workingDirectory = fs_1.default.mkdtempSync(path_1.default.join(os_1.default.tmpdir(), 'elm-render-'));
    const sourceDirectory = path_1.default.join(workingDirectory, 'src');
    const elmScript = path_1.default.basename(source);
    const outputJs = path_1.default.join(workingDirectory, 'elm-render.out.js');
    fs_1.default.mkdirSync(sourceDirectory);
    fs_1.default.copyFileSync(source, path_1.default.join(sourceDirectory, elmScript));
    fs_1.default.writeFileSync(path_1.default.join(workingDirectory, 'elm.json'), JSON.stringify(elm_reference_json_1.default, null, 4));
    const command = [
        elmBinary,
        'make',
        '--optimize',
        '--output=' + outputJs,
        path_1.default.join(sourceDirectory, elmScript)
    ].join(' ');
    return {
        command,
        elmBinary,
        sourceDirectory,
        outputJs,
        workingDirectory,
    };
}
exports.prepareElmCommand = prepareElmCommand;
