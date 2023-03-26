module.exports = {
  projects: [
    {
      engine: 'react',
      collectDocsFrom: './packages/react/src',
      version: '16.14.0'
    },
    {
      engine: 'vue',
      collectDocsFrom: './packages/vue/src',
      libraryName: 'taslonicVue',
      version: '2.6.11'
    }
  ],
  styles: [
    './packages/base/dist/taslonic.css'
  ],
  scripts: [
    'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
    './packages/react/dist/index.js',
    './packages/vue/dist/plugin.js'
  ],
  other: [
    './packages/base/src/data/',
    './packages/base/src/images/'
  ],
  custom: {
    favicon: {
      filepath: './packages/base/src/images/favicon_taslonic_32x32.png'
    },
    logo: {
      filepath: './packages/base/src/images/logo.svg',
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
      input {
        font-family: sans-serif;
      }
    `,
    windowTitle: 'Taslonic',
  },
  outputDirectory: './docs'
};
