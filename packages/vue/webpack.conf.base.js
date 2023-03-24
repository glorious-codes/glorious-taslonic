const project = require('./project.json');

function buildConfig(type){
  const { entry, output } = project.source.libs[type];
  return {
    entry,
    output,
    externals: {
      'vue': {
        commonjs: 'vue/dist/vue.common',
        commonjs2: 'vue/dist/vue.common',
        amd: 'vue/dist/vue.common',
        root: 'Vue'
      }
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules\/(?!\@glorious\/taslonic-base)/,
        use: 'babel-loader'
      }, {
        test: /\.html$/,
        include: [`${__dirname}/${project.source.root}/`],
        use: 'html-loader'
      }]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        '@vue': `${__dirname}/${project.source.root}/`,
        '@base': '@glorious/taslonic-base/src'
      }
    }
  };
}

module.exports = Object.keys(project.source.libs).map(libType => buildConfig(libType));
