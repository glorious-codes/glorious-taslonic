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
      name: 'verticalAlign',
      type: 'String',
      values: 'middle, bottom'
    }
  ],
  examples: [
    {
      title: 'Default Row',
      controller: function(){
        const { Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <span>Default Row</span>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Offset Row',
      controller: function(){
        const { Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <span>Default Row</span>
              </Row>
              <Row offset="5">
                <span>Offset Row</span>
              </Row>
            </>
          );
        }
      },
      styles
    }
  ]
};
