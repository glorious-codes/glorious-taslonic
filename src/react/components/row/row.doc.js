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
      name: 'align',
      type: 'String',
      values: 'center, right'
    },
    {
      name: 'offset',
      type: 'String, Number',
      values: '1-10'
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
      description: 'A row behaves like a block and requires columns as immediate children. Sibling rows have a default spacing of 20px each other.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <Col>
                  <p>Default Row</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Default Row</p>
                </Col>
              </Row>
            </>
          );
        }
      },
      styles
    },
    {
      title: 'Row alignment',
      description: 'You can optionally align columns inside a row at left, center or right.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              {/* The following div has been created for documentation purpose only */}
              <div data-row-container>
                <Row>
                  <Col xs="2">
                    <span>2 cols</span>
                  </Col>
                  <Col xs="4">
                    <span>4 cols</span>
                  </Col>
                  <Col xs="3">
                    <span>3 cols</span>
                  </Col>
                </Row>
              </div>
              {/* The following div has been created for documentation purpose only */}
              <div data-row-container>
                <Row align="center">
                  <Col xs="2">
                    <span>2 cols</span>
                  </Col>
                  <Col xs="4">
                    <span>4 cols</span>
                  </Col>
                  <Col xs="3">
                    <span>3 cols</span>
                  </Col>
                </Row>
              </div>
              {/* The following div has been created for documentation purpose only */}
              <div data-row-container>
                <Row align="right">
                  <Col xs="2">
                    <span>2 cols</span>
                  </Col>
                  <Col xs="4">
                    <span>4 cols</span>
                  </Col>
                  <Col xs="3">
                    <span>3 cols</span>
                  </Col>
                </Row>
              </div>
            </>
          );
        }
      },
      styles
    },
    {
      title: 'Offset Row',
      description: 'You can optionally offset a row.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <Col>
                  <p>Default Row</p>
                </Col>
              </Row>
              <Row offset="5">
                <Col>
                  <p>Offset Row</p>
                </Col>
              </Row>
            </>
          );
        }
      },
      styles
    },
    {
      title: 'Row vertical alignment',
      description: 'You can optionally vertically align columns inside a row at top, middle or bottom.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              {/* The following div has been created for documentation purpose only */}
              <div data-row-container>
                <Row>
                  <Col xs="4">
                    <span style={{ height: '200px' }}>4 cols</span>
                  </Col>
                  <Col xs="4">
                    <span style={{ height: '75px' }}>4 cols</span>
                  </Col>
                  <Col xs="4">
                    <span style={{ height: '100px' }}>4 cols</span>
                  </Col>
                </Row>
              </div>
              {/* The following div has been created for documentation purpose only */}
              <div data-row-container>
                <Row verticalAlign="middle">
                  <Col xs="4">
                    <span style={{ height: '200px' }}>4 cols</span>
                  </Col>
                  <Col xs="4">
                    <span style={{ height: '75px' }}>4 cols</span>
                  </Col>
                  <Col xs="4">
                    <span style={{ height: '100px' }}>4 cols</span>
                  </Col>
                </Row>
              </div>
              {/* The following div has been created for documentation purpose only */}
              <div data-row-container>
                <Row verticalAlign="bottom">
                  <Col xs="4">
                    <span style={{ height: '200px' }}>4 cols</span>
                  </Col>
                  <Col xs="4">
                    <span style={{ height: '75px' }}>4 cols</span>
                  </Col>
                  <Col xs="4">
                    <span style={{ height: '100px' }}>4 cols</span>
                  </Col>
                </Row>
              </div>
            </>
          );
        }
      },
      styles
    }
  ]
};
