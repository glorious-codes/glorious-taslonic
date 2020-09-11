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
      controller: function(){
        const { Loader } = taslonicReact;

        return function(){
          return (
            <Loader />
          )
        }
      }
    },
    {
      title: 'Loader theme',
      description: 'A loader is dark by default, but you can optionally make it light.',
      controller: function(){
        const { Loader } = taslonicReact;

        return function(){
          return (
            <Loader theme="light" />
          )
        }
      },
      styles: `
        p-external-component-examples-list p-list-item:nth-child(2) .p-external-component-preview { height: 100% }
        p-external-component-examples-list p-list-item:nth-child(2) .p-tabs-content [data-name="Preview"] .p-tab {
          margin: -30px;
          height: 80px;
          background-color: #6772FF;
        }
      `
    }
  ]
};
