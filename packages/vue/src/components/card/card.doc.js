module.exports = {
  name: 'Card',
  description: 'A visual box to accommodate a group of data.',
  properties: [
    {
      name: 'title',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'title-tag-name',
      type: 'String',
      values: 'Any'
    }
  ],
  examples: [
    {
      title: 'Default Card',
      template: `
      <t-card>
        Default Card
      </t-card>
      `
    },
    {
      title: 'Card with title',
      template: `
      <t-card title="Settings">
        This card might accommodate the application settings.
      </t-card>
      `
    },
    {
      title: 'Card with custom title tag name',
      description: 'Title will be rendered inside a H3 tag by default, but you can optionally customize it.',
      template: `
      <t-card title="Settings" title-tag-name="h2">
        This card show its title inside an H2 tag.
      </t-card>
      `
    }
  ]
};
