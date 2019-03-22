const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const project = require('./project.json');

module.exports = {
  entry: [`${__dirname}/${project.scripts.source.index}`],
  module: {
    rules: [{
      test: /\.(styl|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { minimize: true } },
        'stylus-loader'
      ]
    }, {
      test: /\.html$/,
      include: [`${__dirname}/${project.scripts.source.root}`],
      use: 'html-loader'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|external)/,
      use: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      '@scripts': `${__dirname}/${project.scripts.source.root}`,
      '@styles': `${__dirname}/${project.styles.source.root}`
    }
  },
  plugins: [],
  context: path.resolve(__dirname)
}
