const project = require('./project.json');

module.exports = {
  collectCoverageFrom: project.tests.source.files,
  coverageReporters: ['html'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/src/base/mocks/raw-files.js',
    '@base\/(.*)$': `<rootDir>/${project.scripts.source.root.base}$1`,
    '@react\/(.*)$': `<rootDir>/${project.scripts.source.root.react}$1`,
    '@vue\/test-utils$': `<rootDir>/node_modules/@vue/test-utils`,
    '@vue\/(.*)$': `<rootDir>/${project.scripts.source.root.vue}$1`,
    '@vue$': 'vue/dist/vue.common.js'
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.js'
  ],
  testMatch: ['**/**.test.js'],
  transform: {
    '^.+\\.styl$': '<rootDir>/src/base/mocks/raw-files.js',
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': 'html-loader-jest'
  }
};
