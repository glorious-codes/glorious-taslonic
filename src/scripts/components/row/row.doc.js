const styles = `
[class*=tas-col] p {
  padding: 0 10px;
  background-color: #EFFEF6;
  color: #52C783;
  text-align: center;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  border: 1px solid #98EFBB;
  border-radius: 3px;
  box-sizing: border-box;
}`;

module.exports = {
  name: 'Row',
  description: 'A container for grid columns.',
  properties: [
    {
      name: 'data-offset',
      type: 'String',
      values: '1 to 11',
      required: 'No'
    }
  ],
  examples: [
    {
      title: 'Default Row',
      template: `
      <tas-row>
        <tas-col data-size="12">
          <p>Default Row</p>
        </tas-col>
      </tas-row>`,
      styles
    },
    {
      title: 'Offset Row',
      template: `
      <tas-row>
        <tas-col data-size="12">
          <p>Row</p>
        </tas-col>
      </tas-row>
      <tas-row data-offset="5">
        <tas-col data-size="12">
          <p>Offset Row</p>
        </tas-col>
      </tas-row>`,
      styles
    }
  ]
};
