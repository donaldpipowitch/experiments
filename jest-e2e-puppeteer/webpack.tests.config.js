const { resolve } = require('path');
const { rules, extensions, clean } = require('./webpack.shared');

const distDir = 'dist-tests';

module.exports = {
  entry: {
    // could be automated later... maybe with globby
    add: './tests/add.ts',
    subtract: './tests/subtract.ts'
  },
  output: {
    filename: '[name].js',
    path: resolve(process.cwd(), distDir),
    // needed for sources to be loadable by `jest-message-util`?
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  module: { rules },
  plugins: [clean([distDir])],
  devtool: 'inline-source-map',
  mode: 'development',
  resolve: { extensions }
};
