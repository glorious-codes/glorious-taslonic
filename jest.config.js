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
    '@mocks\/(.*)$': `<rootDir>/${project.mocks.source.root}$1`,
    '@scripts\/(.*)$': `<rootDir>/${project.scripts.source.root}$1`,
    '@styles\/(.*)$': `<rootDir>/${project.styles.source.root}$1`,
    '^.+\\.css$': '<rootDir>/src/scripts/mocks/raw-files.js'
  },
  'setupTestFrameworkScriptFile': '<rootDir>/src/scripts/mocks/global.js',
  'testMatch': ['**/**.test.js'],
  'transform': {
    '^.+\\.styl$': '<rootDir>/src/scripts/mocks/raw-files.js',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': 'html-loader-jest'
  }
};
