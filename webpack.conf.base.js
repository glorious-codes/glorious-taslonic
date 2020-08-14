const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const project = require('./project.json');
const env = process.env.NODE_ENV || 'development';

function buildEntries(){
  const entries = {}
  const libs = getProjectLibs();
  Object.keys(libs).forEach(lib => {
    entries[lib] = `${__dirname}/${libs[lib].entry}`;
  });
  return entries;
}

function buildFilename({ chunk }){
  const { name } = chunk;
  const libs = getProjectLibs();
  return libs[name] ? libs[name].output : name;
}

function getProjectLibs(){
  return project.scripts.source.libs;
}

module.exports = {
  entry: buildEntries(),
  output: {
    library: '[name]',
    libraryExport: 'default',
    libraryTarget: 'umd',
    filename: buildFilename
  },
  externals: {
    '@vue': 'Vue',
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.(styl|css)$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader' ]
      },
      {
        test: /\.html$/,
        include: [
          path.resolve(__dirname, project.scripts.source.root.vue)
        ],
        use: 'html-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  resolve: {
    alias: {
      '@base': `${__dirname}/${project.scripts.source.root.base}`,
      '@react': `${__dirname}/${project.scripts.source.root.react}`,
      '@vue': `${__dirname}/${project.scripts.source.root.vue}`,
      '@vue$': 'vue/dist/vue.esm.js'
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
  ]
}
