const { readFileSync } = require('fs');
const { join } = require('path');

const src = join(process.cwd(), 'src');
const filename = join(src, 'index.tsx');
const data = readFileSync(filename, 'utf8');

const {
  transpile,
  convertCompilerOptionsFromJson,
  findConfigFile,
  readConfigFile,
  sys
} = require('typescript');

const configPath = findConfigFile(src, sys.fileExists); // can be undefined!
const { config } = readConfigFile(configPath, sys.readFile);
const { options } = convertCompilerOptionsFromJson(config.compilerOptions);
const tsTranspiled = transpile(data, options, filename);

const { transformSync } = require('@babel/core');
const babelTranspiled = transformSync(tsTranspiled, { filename }).code;

console.log(babelTranspiled);
// TODO: Source Maps?
