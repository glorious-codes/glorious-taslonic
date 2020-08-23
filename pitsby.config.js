const { isArray, mergeWith } = require('lodash');
const baseConfig = require('./pitsby.conf.base');
const devConfig = require('./pitsby.conf.dev');
const prodConfig = require('./pitsby.conf.prod');
const specificConfig = process.env.NODE_ENV == 'production' ? prodConfig : devConfig;

module.exports = mergeWith(
  baseConfig,
  specificConfig,
  (baseValue, specificValue) => {
    if (isArray(baseValue)) return baseValue.concat(specificValue);
  }
);
