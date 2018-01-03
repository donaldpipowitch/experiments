const { resolve } = require('path');
const { rules, extensions, clean } = require('./webpack.shared');

const distDir = 'dist-e2e';

module.exports = {
  entry: './e2e/index.ts',
  output: {
    filename: 'index.js',
    path: resolve(process.cwd(), distDir),
    // needed for sources to be loadable by `jest-message-util`?
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  module: { rules },
  plugins: [clean([distDir])],
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'node',
  resolve: { extensions },
  externals: ['spawn-sync']
};
