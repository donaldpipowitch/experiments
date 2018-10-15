// @ts-check
const { join } = require('path');
const { spawn } = require('child_process');

// const tsserver = spawn('node_modules/.bin/tsserver');
const tsserver = spawn('node_modules/.bin/tsserver', [
  // '--useSingleInferredProject',
  // '--logVerbosity',
  // 'verbose',
  '--logFile',
  'tsserver.log'
]);

tsserver.stdout.on('data', (chunk) => {
  const [header, ...bodies] = chunk.toString().split('\r\n');

  const message = JSON.parse(bodies.join(''));

  switch (message.type) {
    case 'response':
      /** @type {import('typescript/lib/protocol').Response} */
      const response = message;
      if (!response.success) return console.error('ERROR!', response.message);

      console.log('TODO', message);
      return;
    case 'event':
      console.log('event', message);
      return;
  }
});

const request = {
  command: 'suggestionDiagnosticsSync',
  arguments: {
    file: join(process.cwd(), 'src/index.ts'),
    projectFileName: join(process.cwd(), 'tsconfig.json'),
    includeLinePosition: true
  }
};
tsserver.stdin.write(JSON.stringify(request) + '\r\n', 'utf8');
