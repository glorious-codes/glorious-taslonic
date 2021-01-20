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
            <div className="example-loader-theme">
              <Loader theme="light" />
            </div>
          )
        }
      },
      styles: `
        .example-loader-theme { height: 80px; background-color: #6772FF; }
      `
    }
  ]
};
