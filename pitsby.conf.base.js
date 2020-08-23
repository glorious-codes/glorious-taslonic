module.exports = {
  projects: [
    {
      engine: 'vue',
      collectDocsFrom: './src/vue',
      importFrom: './dist/vue',
      libraryName: 'taslonicVue'
    },
    {
      engine: 'react',
      collectDocsFrom: './src/react'
    }
  ],
  styles: [
    './dist/taslonic.css'
  ],
  scripts: [
    './dist/react/index.js',
    './dist/vue/index.js'
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
      width: '150px',
      height: '25px'
    },
    styles: `
      body {
        color: #183055;
      }
      .p-topbar .p-logo {
        max-height: 20px;
      }
    `,
    windowTitle: 'Taslonic',
  },
  outputDirectory: './docs'
};
