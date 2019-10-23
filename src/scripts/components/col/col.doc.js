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
  name: 'Column',
  description: 'Abstraction of a grid cloumn to be used inside a row.',
  properties: [
    {
      name: 'size',
      type: 'String',
      values: '1 to 12',
      required: 'No',
    },
    {
      name: 'offset',
      type: 'String',
      values: '1 to 11',
      required: 'No',
    }
  ],
  examples: [
    {
      title: 'Default Column',
      template: `
      <tas-row>
        <tas-col><p>Default Column</p></tas-col>
      </tas-row>`,
      styles
    },
    {
      title: 'Sized Columns',
      template: `
      <tas-row>
        <tas-col data-size="12"><p>12 cols</p></tas-col>
      </tas-row>
      <tas-row>
        <tas-col data-size="6"><p>6 cols</p></tas-col>
        <tas-col data-size="6"><p>6 cols</p></tas-col>
      </tas-row>
      <tas-row>
        <tas-col data-size="3"><p>3 cols</p></tas-col>
        <tas-col data-size="3"><p>3 cols</p></tas-col>
        <tas-col data-size="3"><p>3 cols</p></tas-col>
        <tas-col data-size="3"><p>3 cols</p></tas-col>
      </tas-row>
      <tas-row>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
        <tas-col data-size="1"><p>1 col</p></tas-col>
      </tas-row>`,
      styles
    },
    {
      title: 'Offset Columns',
      template: `
      <tas-row>
        <tas-col data-size="6" data-offset="6"><p>6 cols</p></tas-col>
      </tas-row>
      <tas-row>
        <tas-col data-size="6"><p>6 cols</p></tas-col>
      </tas-row>
      <tas-row>
        <tas-col data-size="3" data-offset="6"><p>3 cols</p></tas-col>
        <tas-col data-size="1" data-offset="2"><p>1 col</p></tas-col>
      </tas-row>`,
      styles
    },
    {
      title: 'Nested Columns',
      template: `
      <tas-row>
        <tas-col data-size="6"><p>6 cols</p></tas-col>
        <tas-col data-size="6">
          <tas-row>
            <tas-col data-size="8"><p>8 cols</p></tas-col>
            <tas-col data-size="4"><p>4 cols</p></tas-col>
          </tas-row>
          <tas-row>
            <tas-col data-size="4"><p>4 cols</p></tas-col>
            <tas-col data-size="4"><p>4 cols</p></tas-col>
            <tas-col data-size="4"><p>4 cols</p></tas-col>
          </tas-row>
        </tas-col>
      </tas-row>`,
      styles
    },
  ],
};
