const styles = `
[class*=t-container] div {
  padding: 20px;
  color: #627380;
  text-align: center;
  border-radius: 3px;
  box-sizing: border-box;
  border: 1px dashed #627380;
}`;

module.exports = {
  name: 'Container',
  description: 'General container. You can use it to contain a grid or anything else.',
  properties: [
    {
      name: 'size',
      type: 'String',
      values: 'sm, lg'
    }
  ],
  examples: [
    {
      title: 'Default Container',
      controller: function(){
        const { Container } = taslonicReact;

        return function(){
          return (
            <Container>
              <div>Default container streches up to 1024px</div>
            </Container>
          );
        }
      },
      styles
    },
    {
      title: 'Small Container',
      controller: function(){
        const { Container } = taslonicReact;

        return function(){
          return (
            <Container size="sm">
              <div>Default container streches up to 960px</div>
            </Container>
          );
        }
      },
      styles
    },
    {
      title: 'Large Container',
      controller: function(){
        const { Container } = taslonicReact;

        return function(){
          return (
            <Container size="lg">
              <div>Default container streches up to 1200px</div>
            </Container>
          );
        }
      },
      styles
    }
  ]
};
