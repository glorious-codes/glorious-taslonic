const project = require('./project.json');

function buildConfig(bundleType){
  const { entry, output } = project.source.libs[bundleType];
  const config = { ...getBaseConfig(), entry, output };
  return bundleType == getBundleTypes().REACT_STYLED ? appendCssConfig(config) : config;
}

function getBaseConfig() {
  return {
    externals: {
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
      rules: [{
        test: /\.js$/,
        exclude: /node_modules\/(?!\@glorious\/taslonic-base)/,
        use: 'babel-loader'
      }]
    },
    resolve: {
      alias: {
        '@react': `${__dirname}/${project.source.root}/`,
        '@base': '@glorious/taslonic-base/src'
      }
    }
  };
}

function appendCssConfig(config){
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader', options: { injectType: 'singletonStyleTag' } },
            'css-loader'
          ]
        }
      ]
    }
  };
}

function getBundleTypes(){
  return {
    REACT: 'react',
    REACT_STYLED: 'react-styled'
  };
}

module.exports = Object.values(getBundleTypes()).map(type => buildConfig(type));
