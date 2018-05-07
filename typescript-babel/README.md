# `typescript-babel`

Just run TypeScript first and Babel after that. No bundling, no webpack/rollup/whatever.

Motivation: Have an easy build step without bundling. Makes it a little bit easier to use both compilers add once (and similar motivations why `prettier-eslint` was created).

Note: We only transpile the source code with TypeScript here. The type checker is not used.