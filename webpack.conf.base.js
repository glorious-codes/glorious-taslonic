const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const project = require('./project.json');

module.exports = {
  entry: project.scripts.source.modules,
  output: {
    filename: ({ chunk }) => {
      return chunk.name == 'index' ? 'taslonic.js': '[name]/index.js';
    }
  },
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
      '@mocks': `${__dirname}/${project.mocks.source.root}`,
      '@scripts': `${__dirname}/${project.scripts.source.root}`,
      '@styles': `${__dirname}/${project.styles.source.root}`
    }
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: project.images.source.files,
      to: project.images.dist.root
    }]),
    new MiniCssExtractPlugin({
      filename: project.styles.dist.filename
    })
  ],
  context: path.resolve(__dirname)
}
