const styles = `
[class*=t-row] span {
  padding: 20px;
  width: 100%;
  color: #6772FF;
  text-align: center;
  border-radius: 3px;
  box-sizing: border-box;
  border: 1px dashed #6772FF;
}`;

module.exports = {
  name: 'Row',
  description: 'Specific container for columns.',
  properties: [
    {
      name: 'align',
      type: 'String',
      values: 'center, right'
    },
    {
      name: 'offset',
      type: 'String, Number',
      values: '1 to 10'
    },
    {
      name: 'vertical-align',
      type: 'String',
      values: 'middle, bottom'
    }
  ],
  examples: [
    {
      title: 'Default Row',
      template: `
      <t-row>
        <span>Default row</span>
      </t-row>
      `,
      styles
    },
    {
      title: 'Offset Row',
      template: `
      <div>
        <t-row>
          <span>Default row</span>
        </t-row>
        <t-row offset="5">
          <span>Offset row</span>
        </t-row>
      </div>
      `,
      styles
    }
  ]
};
