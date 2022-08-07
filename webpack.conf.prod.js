const webpack = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const project = require('./project.json');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: {
            warnings: false,
          }
        }
      })
    ]
  }
}
