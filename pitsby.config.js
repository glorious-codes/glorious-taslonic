module.exports = {
  projects: [
    {
      engine: 'vanilla',
      collectDocsFrom: './src'
    }
  ],
  styles: [
    './dist/index/index.css'
  ],
  scripts: [
    './dist/taslonic.js'
  ],
  other: [
    './dist/images/'
  ],
  custom: {
    favicon: {
      filepath: './dist/images/favicon_taslonic_32x32.png'
    },
    logo: {
      filepath: './dist/images/logo.svg',
      width: '165px',
      height: '30px'
    },
    windowTitle: 'taslonic',
    styles: `
      .p-components-menu-item {
        border-left-color: transparent;
        border-radius: 6px 0 0 6px;
      }
      .p-external-component-heading-container + p-paragraph {
        display: block;
        margin-top: 30px;
      }
    `
  },
  outputDirectory: './docs'
}
