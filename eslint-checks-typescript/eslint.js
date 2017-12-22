const { readFileSync, writeFileSync } = require('fs');
const { CLIEngine } = require('eslint');

const patterns = ['./src/index.ts'];

const options = require('./.eslintrc.json');
options.fix = true;
const engine = new CLIEngine(options);

const formatter = engine.getFormatter('codeframe');

// interface Message {
//   ruleId: string;
//   severity: 0 | 1 | 2;
//   message: string;
//   line: number;
//   column: number;
//   nodeType: string;
//   source: string;
//   endLine: number;
//   endColumn: number;
// }

// interface Stats {
//   results: Array<{
//     filePath: string;
//     messages: Array<Message>;
//     errorCount: number;
//     warningCount: number;
//     fixableErrorCount: number;
//     fixableWarningCount: number;
//     output: string;
//   }>;
//   errorCount: number;
//   warningCount: number;
//   fixableErrorCount: number;
//   fixableWarningCount: number;
// }
const stats = engine.executeOnFiles(patterns);

// fixes
let fixCount = 0;
stats.results.forEach(result => {
  const wasFixed = result.output !== undefined;
  if (wasFixed) {
    writeFileSync(result.filePath, result.output);
    fixCount += 1;
  }
});
if (fixCount) {
  console.log(`Applied fixes to ${fixCount} file(s).`);
}

// errors
if (stats.errorCount) {
  console.log(formatter(stats.results));
}
