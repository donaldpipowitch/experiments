const { createLanguageService, ScriptSnapshot, sys } = require('typescript');

// create language server
const filePaths = [];
const lshost = {
  getCompilationSettings: () => {},
  getScriptFileNames: () => filePaths,
  getScriptVersion: () => '',
  getScriptSnapshot: (name) =>
    ScriptSnapshot.fromString(sys.readFile(name) || ''),
  getDefaultLibFileName: () => 'lib.d.ts',
  getCurrentDirectory: () => '.'
};
const ls = createLanguageService(lshost);

// see https://github.com/Microsoft/TypeScript/blob/master/src/compiler/diagnosticMessages.json
const codes = [
  6133, // '{0}' is declared but its value is never read.
  6196 // '{0}' is declared but never used.
];

// when the `--fix` param is used, this seems to run multiple times
// not sure why, probably an eslint thing
let firstRun = true;

module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code'
  },
  create(context) {
    if (!firstRun) return {};
    firstRun = false;

    const name = context.getFilename();
    if (!filePaths.includes(name)) filePaths.push(name);

    const suggestionDiagnostics = ls
      .getSuggestionDiagnostics(context.getFilename())
      .filter(({ code }) => codes.includes(code));

    suggestionDiagnostics.forEach((diagnostic) => {
      const pos = ls.toLineColumnOffset(name, diagnostic.start);

      const line = pos.line + 1;
      const column = pos.character;

      context.report({
        message: diagnostic.messageText,
        loc: {
          start: { line, column },
          end: { line, column: column + diagnostic.length }
        },
        fix(fixer) {
          // should be VariableDeclaration
          const node = context.getNodeByRangeIndex(diagnostic.start).parent
            .parent;

          const fixes = [
            ...context
              .getCommentsBefore(node)
              .map((comment) => fixer.remove(comment)),
            fixer.remove(node)
          ];

          return fixes;
        }
      });
    });

    return {};
  }
};
