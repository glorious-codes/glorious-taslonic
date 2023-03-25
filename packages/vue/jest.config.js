const project = require('./project.json');

module.exports = {
  collectCoverageFrom: project.tests.source.files,
  coverageReporters: ['html', 'text-summary'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  moduleNameMapper: {
    'vue$': 'vue/dist/vue.common.js',
    '@vue\/(?!test-utils)(.*)$': `<rootDir>/${project.source.root}/$1`,
    '@base\/(.*)$': '@glorious/taslonic-base/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/**.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': 'html-loader-jest'
  },
  transformIgnorePatterns: [
    "/node_modules/(?!\@glorious/taslonic-base).+\\.js$"
  ]
};
