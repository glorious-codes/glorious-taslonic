const project = require('./project.json');

module.exports = {
  'collectCoverageFrom': project.tests.source.files,
  'coverageReporters': ['html'],
  'coverageThreshold': {
    'global': {
      'statements': 100,
      'branches': 100,
      'functions': 100,
      'lines': 100
    }
  },
  'moduleNameMapper': {
    '@scripts\/(.*)$': `<rootDir>/${project.scripts.source.root}$1`,
    '@styles\/(.*)$': `<rootDir>/${project.styles.source.root}$1`,
    '^.+\\.css$': '<rootDir>/src/mocks/raw-files.js'
  },
  'setupTestFrameworkScriptFile': '<rootDir>/src/mocks/global.js',
  'transform': {
    '^.+\\.styl$': '<rootDir>/src/mocks/raw-files.js',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': 'html-loader-jest'
  }
};
