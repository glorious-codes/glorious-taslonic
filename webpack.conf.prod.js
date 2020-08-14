const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const project = require('./project.json');

module.exports = {
  mode: 'production',
  devtool: 'cheap-source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: {
            warnings: false,
          },
          sourceMap: true
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin()
  ]
}
