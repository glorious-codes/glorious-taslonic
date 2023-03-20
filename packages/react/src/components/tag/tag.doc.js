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
      controller: function(){
        const { Tag } = taslonicReact;

        return function(){
          return (
            <Tag>Default Tag</Tag>
          )
        }
      }
    },
    {
      title: 'Tag with theme',
      controller: function(){
        const { Tag } = taslonicReact;

        return function(){
          return (
            <div className="example-tag-theme">
              <Tag theme="primary">Primary</Tag>
              <Tag theme="secondary">Secondary</Tag>
              <Tag theme="info">Info</Tag>
              <Tag theme="success">Success</Tag>
              <Tag theme="warning">Warning</Tag>
              <Tag theme="danger">Danger</Tag>
            </div>
          )
        }
      },
      styles: `
        .example-tag-theme .t-tag:not(:first-child) { margin-left: 5px; }
      `
    }
  ]
};
