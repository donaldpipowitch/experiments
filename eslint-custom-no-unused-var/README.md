In some projects I use ESLint _and_ TSLint and I'd like to only use _one_ linter. It looks like ESLint covers most things I need, but what I really want is a fixable `no-unused-vars` rule. TSLint had this for a long time, but it is currently deprecated. AFAIK there is no real replacement currently, so I try to create one.

This is a proof of concept. I use a custom ESLint rule which you can find inside `custom-rules/no-unused-vars-ts.js`. I never created an ESLint rule before, so this one is probably really buggy and slow. But it seems to work.
