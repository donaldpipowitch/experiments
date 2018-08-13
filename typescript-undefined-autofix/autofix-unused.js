// @ts-check
const {
  createLanguageService,
  ScriptSnapshot,
  readConfigFile,
  parseJsonConfigFileContent,
  sys
} = require('typescript');

// get options
const { config } = readConfigFile('tsconfig.json', sys.readFile);
const host = {
  useCaseSensitiveFileNames: false,
  readDirectory: sys.readDirectory,
  fileExists: sys.fileExists,
  readFile: sys.readFile
};
const { options } = parseJsonConfigFileContent(config, host, process.cwd());

// create language server
const filePaths = ['src/index.ts'];
/** @type {import('typescript').LanguageServiceHost} */
const lshost = {
  getCompilationSettings: () => options,
  getScriptFileNames: () => filePaths,
  getScriptVersion: () => '',
  getScriptSnapshot: (name) => ScriptSnapshot.fromString(name),
  getDefaultLibFileName: () => 'lib.d.ts',
  getCurrentDirectory: () => '.'
};
const ls = createLanguageService(lshost);
const result = ls.getSuggestionDiagnostics(filePaths[0]);

console.log(result);
