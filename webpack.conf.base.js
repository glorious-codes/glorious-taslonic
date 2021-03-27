const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const project = require('./project.json');
const env = process.env.NODE_ENV || 'development';

function getBaseConfig() {
  return {
    externals: {
      'vue': {
        commonjs: 'vue/dist/vue.common',
        commonjs2: 'vue/dist/vue.common',
        amd: 'vue/dist/vue.common',
        root: 'Vue'
      },
      'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React'
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM'
      }
    },
    module: {
      rules: [
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
        'vue$': 'vue/dist/vue.common.js'
      }
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: project.images.source.files,
        to: project.images.dist.root
      }, {
        from: project.data.source.files,
        to: project.data.dist.root
      }])
    ]
  };
}

function getCSSConfig(cssType){
  const config = {
    rule: {
      test: /\.(styl|css)$/,
      use: [ 'css-loader', 'stylus-loader' ]
    }
  };
  if(cssType == 'inline') {
    config.rule.use.unshift({ loader: 'style-loader', options: { injectType: 'singletonStyleTag' } });
  } else {
    config.rule.use.unshift(MiniCssExtractPlugin.loader);
    config.plugin = new MiniCssExtractPlugin({
      filename: project.styles.dist.filename
    })
  }
  return config;
}

function buildConfig(type, cssType){
  const base = getBaseConfig();
  const cssConfig = getCSSConfig(cssType);
  const { entry, output } = project.scripts.source.libs[type];
  return {
    ...base,
    entry,
    output,
    module: {
      ...base.module,
      rules: [
        ...base.module.rules,
        cssConfig.rule
      ]
    },
    plugins: [
      ...base.plugins,
      cssConfig.plugin
    ].filter(plugin => !!plugin)
  };
}

module.exports = [
  buildConfig('react'),
  buildConfig('react-styled', 'inline'),
  buildConfig('vue'),
  buildConfig('vue-plugin')
];
