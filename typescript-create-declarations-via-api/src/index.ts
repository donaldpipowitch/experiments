import { createProgram } from 'typescript';
import globby from 'globby';

const filePatterns = ['example/**/*.ts'];
const filePaths = globby.sync(filePatterns);

const options = {
  declaration: true,
  declarationDir: 'example/typings'
};

const result = createProgram(filePaths, options).emit(
  undefined, // targetSourceFile
  undefined, // writeFile
  undefined, // cancellationToken
  true // emitOnlyDtsFiles
);

if (result.diagnostics.length) {
  // uncomment the `Foo` example in src/index.ts to see this
  console.log('Found problems!');
  result.diagnostics.forEach(({ messageText, file }) =>
    console.log(`- ${file!.fileName}: ${messageText}`)
  );
}

// typings are always generated (at least partially),
// even when there are problems
console.log('Generated typings in ./example/typings.');
