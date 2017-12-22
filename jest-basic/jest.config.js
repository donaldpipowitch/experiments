module.exports = {
  // don't automatically use babel-jest, in case of a local babel config
  transform: {},
  // testRegex: 'tests/.*\\.(js|jsx|ts|tsx)$'
  testMatch: ['<rootDir>/tests/**/*.(js|jsx|ts|tsx)']
};
