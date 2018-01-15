const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { rules, extensions, clean } = require('./webpack.shared');

const distDir = 'dist';

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: resolve(process.cwd(), distDir),
    libraryTarget: 'umd'
  },
  module: { rules },
  plugins: [
    clean([distDir]),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  mode: 'development',
  resolve: { extensions }
};
