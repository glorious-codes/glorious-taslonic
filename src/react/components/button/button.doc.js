module.exports = {
  name: 'Button',
  description: 'Abstraction of a native button.',
  properties: [
    {
      name: 'block',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'tag',
      type: 'String',
      values: 'a'
    },
    {
      name: 'theme',
      type: 'String',
      values: 'primary, secondary, lookless'
    }
  ],
  examples: [
    {
      title: 'Default Button',
      controller: function(){
        const { Button, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col>
                <Button>
                  Default Button
                </Button>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Block Button',
      description: 'Block property makes buttons behave like a block.',
      controller: function(){
        const { Button, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col sm="6">
                <Button block>
                  Blocked Button
                </Button>
              </Col>
              <Col sm="6">
                <Button tag="a" block>
                  Blocked Button
                </Button>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Button tag',
      description: 'You can optionally render a button as anchor.',
      controller: function(){
        const { Button, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col sm="6">
                <Button tag="a" href="https://github.com/glorious-codes/glorious-taslonic" target="_blank">
                  Anchor Button
                </Button>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Button theme',
      controller: function(){
        const { Button, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row verticalAlign="middle">
              <Col sm="4">
                <Button theme="primary" block>
                  Primary
                </Button>
              </Col>
              <Col sm="4">
                <Button theme="secondary" block>
                  Secondary
                </Button>
              </Col>
              <Col sm="4" alignXs="center">
                <Button theme="lookless">
                  Lookless
                </Button>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Button disabled',
      controller: function(){
        const { Button, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row verticalAlign="middle">
              <Col sm="3">
                <Button theme="primary" block disabled>
                  Primary
                </Button>
              </Col>
              <Col sm="3">
                <Button theme="secondary" block disabled>
                  Secondary
                </Button>
              </Col>
              <Col sm="3">
                <Button block disabled>
                  Default
                </Button>
              </Col>
              <Col sm="3" alignXs="center">
                <Button theme="lookless" disabled>
                  Lookless
                </Button>
              </Col>
            </Row>
          );
        }
      }
    }
  ]
};
