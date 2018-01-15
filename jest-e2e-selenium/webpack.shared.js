const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports.rules = [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /(node_modules)/,
    use: ['babel-loader']
  }
];

module.exports.extensions = ['.ts', '.tsx', '.js', '.jsx'];

module.exports.clean = (dirs) =>
  new CleanWebpackPlugin(dirs, { verbose: false });
