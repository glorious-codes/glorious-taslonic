const styles = `
[class*=t-container] p {
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
      template: `
      <t-container>
        <p>Default container streches up to 1024px</p>
      </t-container>
      `,
      styles
    },
    {
      title: 'Container size',
      description: 'You can optionally make container narrower or wider.',
      template: `
      <div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-wrapper>
          <t-container size="sm">
            <p>Small container streches up to 960px</p>
          </t-container>
        </div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-wrapper>
          <t-container size="lg">
            <p>Large container streches up to 1200px</p>
          </t-container>
        </div>
      </div>
      `,
      styles
    }
  ]
};
