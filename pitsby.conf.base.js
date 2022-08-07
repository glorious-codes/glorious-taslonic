module.exports = {
  projects: [
    {
      engine: 'react',
      collectDocsFrom: './src/react',
      version: '16.14.0'
    },
    {
      engine: 'vue',
      collectDocsFrom: './src/vue',
      libraryName: 'taslonicVue',
      version: '2.6.11'
    }
  ],
  styles: [
    './dist/taslonic.css'
  ],
  scripts: [
    'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    './dist/react/index.js',
    './dist/vue/plugin.js'
  ],
  other: [
    './dist/data/',
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
