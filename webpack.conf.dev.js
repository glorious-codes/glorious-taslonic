const webpack = require('webpack');
const project = require('./project.json');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.SourceMapDevToolPlugin()
  ]
}
