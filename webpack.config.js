const { merge } = require('webpack-merge');
const baseConfigs = require('./webpack.conf.base');
const devConfig = require('./webpack.conf.dev');
const prodConfig = require('./webpack.conf.prod');
const envConfig = process.env.NODE_ENV == 'production' ? prodConfig : devConfig;

module.exports = baseConfigs.map(baseConfig => merge(baseConfig, envConfig));
