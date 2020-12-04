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
      name: 'titleTagName',
      type: 'String',
      values: 'Any'
    }
  ],
  examples: [
    {
      title: 'Default Card',
      controller: function(){
        const { Card } = taslonicReact;

        return function(){
          return (
            <Card>Default Card</Card>
          )
        }
      }
    },
    {
      title: 'Card with title',
      controller: function(){
        const { Card } = taslonicReact;

        return function(){
          return (
            <Card title="Settings">
              This card might accommodate the application settings.
            </Card>
          )
        }
      }
    },
    {
      title: 'Card with custom title tag name',
      description: 'Title will be rendered inside a H3 tag by default, but you can optionally customize it.',
      controller: function(){
        const { Card } = taslonicReact;

        return function(){
          return (
            <Card title="Settings" titleTagName="h2">
              This card show its title inside an H2 tag.
            </Card>
          )
        }
      }
    }
  ]
};
