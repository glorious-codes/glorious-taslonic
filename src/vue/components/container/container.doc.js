const styles = `
[class*=t-container] p {
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
      template: `
      <t-container>
        <p>Default container streches up to 1024px</p>
      </t-container>
      `,
      styles
    },
    {
      title: 'Small Container',
      template: `
      <t-container size="sm">
        <p>Default container streches up to 960px</p>
      </t-container>
      `,
      styles
    },
    {
      title: 'Large Container',
      template: `
      <t-container size="lg">
        <p>Default container streches up to 1200px</p>
      </t-container>
      `,
      styles
    }
  ]
};
