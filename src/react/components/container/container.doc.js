const styles = `
[class*=t-container] div {
  padding: 20px;
  color: #627380;
  text-align: center;
  border-radius: 3px;
  box-sizing: border-box;
  border: 1px dashed #627380;
}
[data-wrapper]:not(:first-child) {
  margin-top: 20px;
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
      title: 'Container size',
      description: 'You can optionally make container narrower or wider.',
      controller: function(){
        const { Container } = taslonicReact;

        return function(){
          return (
            <>
              {/* The following div has been created for documentation purpose only */}
              <div data-wrapper>
                <Container size="sm">
                  <div>Small container streches up to 960px</div>
                </Container>
              </div>
              {/* The following div has been created for documentation purpose only */}
              <div data-wrapper>
                <Container size="lg">
                  <div>Large container streches up to 960px</div>
                </Container>
              </div>
            </>
          );
        }
      },
      styles
    }
  ]
};
