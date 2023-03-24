const styles = `
[data-row-container] {
  padding: 5px;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px dashed #6772FF;
}
[data-row-container] + [data-row-container] {
  margin-top: 20px;
}
[class*=t-row] p {
  margin: 0;
  padding: 20px;
  width: 100%;
  color: #6772FF;
  text-align: center;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px dashed #6772FF;
}
[class*=t-row] span {
  display: block;
  margin: 0;
  padding: 20px;
  width: 100%;
  background-color: #E1E5FA;
  color: #6772FF;
  text-align: center;
  border-radius: 3px;
  box-sizing: border-box;
}`;

module.exports = {
  name: 'Row',
  description: 'Specific container for columns.',
  properties: [
    {
      name: 'align-xs',
      type: 'String',
      values: 'left, center, right'
    },
    {
      name: 'align-sm',
      type: 'String',
      values: 'left, center, right'
    },
    {
      name: 'align-md',
      type: 'String',
      values: 'left, center, right'
    },
    {
      name: 'align-lg',
      type: 'String',
      values: 'left, center, right'
    },
    {
      name: 'offset-xs',
      type: 'String, Number',
      values: '0-10'
    },
    {
      name: 'offset-sm',
      type: 'String, Number',
      values: '0-10'
    },
    {
      name: 'offset-md',
      type: 'String, Number',
      values: '0-10'
    },
    {
      name: 'offset-lg',
      type: 'String, Number',
      values: '0-10'
    },
    {
      name: 'vertical-align-xs',
      type: 'String',
      values: 'top, middle, bottom'
    },
    {
      name: 'vertical-align-sm',
      type: 'String',
      values: 'top, middle, bottom'
    },
    {
      name: 'vertical-align-md',
      type: 'String',
      values: 'top, middle, bottom'
    },
    {
      name: 'vertical-align-lg',
      type: 'String',
      values: 'top, middle, bottom'
    }
  ],
  examples: [
    {
      title: 'Default Row',
      description: 'A row behaves like a block and requires columns as immediate children. Sibling rows have a default spacing of 20px each other.',
      template: `
      <div>
        <t-row>
          <t-col>
            <p>Default Row</p>
          </t-col>
        </t-row>
        <t-row>
          <t-col>
            <p>Default Row</p>
          </t-col>
        </t-row>
      </div>
      `,
      styles
    },
    {
      title: 'Row alignment',
      description: 'You can optionally align columns at left, center or right of a row.',
      template: `
      <div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-row-container>
          <t-row>
            <t-col xs="2">
              <span>2 cols</span>
            </t-col>
            <t-col xs="4">
              <span>4 cols</span>
            </t-col>
            <t-col xs="3">
              <span>3 cols</span>
            </t-col>
          </t-row>
        </div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-row-container>
          <t-row align-xs="center">
            <t-col xs="2">
              <span>2 cols</span>
            </t-col>
            <t-col xs="4">
              <span>4 cols</span>
            </t-col>
            <t-col xs="3">
              <span>3 cols</span>
            </t-col>
          </t-row>
        </div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-row-container>
          <t-row align-xs="right">
            <t-col xs="2">
              <span>2 cols</span>
            </t-col>
            <t-col xs="4">
              <span>4 cols</span>
            </t-col>
            <t-col xs="3">
              <span>3 cols</span>
            </t-col>
          </t-row>
        </div>
      </div>
      `,
      styles
    },
    {
      title: 'Offset Row',
      description: 'You can optionally offset a row.',
      template: `
      <div>
        <t-row>
          <t-col>
            <p>Default Row</p>
          </t-col>
        </t-row>
        <t-row offset-xs="5">
          <t-col>
            <p>Offset Row</p>
          </t-col>
        </t-row>
      </div>
      `,
      styles
    },
    {
      title: 'Row vertical alignment',
      description: 'You can optionally vertically align columns at top, middle or bottom of a row.',
      template: `
      <div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-row-container>
          <t-row>
            <t-col xs="4">
              <span style="height: 200px">4 cols</span>
            </t-col>
            <t-col xs="4">
              <span style="height: 75px">4 cols</span>
            </t-col>
            <t-col xs="4">
              <span style="height: 100px">4 cols</span>
            </t-col>
          </t-row>
        </div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-row-container>
          <t-row vertical-align-xs="middle">
            <t-col xs="4">
              <span style="height: 200px">4 cols</span>
            </t-col>
            <t-col xs="4">
              <span style="height: 75px">4 cols</span>
            </t-col>
            <t-col xs="4">
              <span style="height: 100px">4 cols</span>
            </t-col>
          </t-row>
        </div>
        <!-- The following div has been created for documentation purpose only -->
        <div data-row-container>
          <t-row vertical-align-xs="bottom">
            <t-col xs="4">
              <span style="height: 200px">4 cols</span>
            </t-col>
            <t-col xs="4">
              <span style="height: 75px">4 cols</span>
            </t-col>
            <t-col xs="4">
              <span style="height: 100px">4 cols</span>
            </t-col>
          </t-row>
        </div>
      </div>
      `,
      styles
    }
  ]
};
