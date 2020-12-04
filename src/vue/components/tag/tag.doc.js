module.exports = {
  name: 'Tag',
  description: 'Commonly attached to or placed close to an element bringing further information about that.',
  properties: [
    {
      name: 'theme',
      type: 'String',
      values: 'primary, secondary, success, danger, warning, info'
    }
  ],
  examples: [
    {
      title: 'Default Tag',
      template: `
      <t-tag>
        Default Tag
      </t-tag>
      `
    },
    {
      title: 'Tag with theme',
      template: `
      <div>
        <t-tag theme="primary">
          Primary
        </t-tag>
        <t-tag theme="secondary">
          Secondary
        </t-tag>
        <t-tag theme="info">
          Info
        </t-tag>
        <t-tag theme="success">
          Success
        </t-tag>
        <t-tag theme="warning">
          Warning
        </t-tag>
        <t-tag theme="danger">
          Danger
        </t-tag>
      </div>
      `
    }
  ]
};
