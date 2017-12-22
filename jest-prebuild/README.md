# `jest-prebuild`

In my experience from the last years it is often more stable and flexible to prebuild tests (when you have a more complex build setup) instead of using test framework specific plugins (e.g. `ts-jest` for `jest` or use something like `ts-node/register` for `mocha` and so on). This also makes switching between test frameworks easier, because you can keep your build setup most of the time. You also don't need to learn test framework specific configs regarding build steps (e.g. `transform` in `jest`).

Run the tests with `$ yarn && yarn test`.