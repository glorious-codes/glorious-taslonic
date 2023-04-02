const fs = require('fs');
const path = require('path');

const _public = {};

_public.format = project => {
  const basePath = `packages/${project}`;
  const lcovFilepath = path.join(__dirname, `../${basePath}/coverage/lcov.info`);
  const lcov = fs.readFileSync(lcovFilepath, 'utf-8');
  fs.writeFileSync(lcovFilepath, lcov.replace(/SF:src\//g, `SF:${basePath}/src/`));
}

module.exports = _public;
