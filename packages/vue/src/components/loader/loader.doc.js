module.exports = {
  name: 'Loader',
  description: 'Loader is an animated element to be shown during async operations.',
  properties: [
    {
      name: 'theme',
      type: 'String',
      values: 'light'
    }
  ],
  examples: [
    {
      title: 'Default Loader',
      template: `
      <t-loader />
      `
    },
    {
      title: 'Loader theme',
      description: 'A loader is dark by default, but you can optionally make it light.',
      template: `
      <div class="example-loader-theme">
        <t-loader theme="light" />
      </div\>
      `,
      styles: `
        .example-loader-theme { height: 80px; background-color: #6772FF; }
      `
    }
  ]
};
