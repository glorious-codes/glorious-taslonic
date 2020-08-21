module.exports = {
  name: 'Button',
  description: 'Abstraction of a native button',
  properties: [
    {
      name: 'blocked',
      type: 'Boolean, String',
      values: 'true, false'
    },
    {
      name: 'theme',
      type: 'String',
      values: 'primary, secondary'
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
      title: 'Button blocked',
      description: 'Blocked buttons behave like a block.',
      controller: function(){
        const { Button, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col sm="6">
                <Button blocked>
                  Blocked Button
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
            <Row>
              <Col xs="6" sm="3">
                <Button theme="primary" blocked>
                  Primary
                </Button>
              </Col>
              <Col xs="6" sm="3">
                <Button theme="secondary" blocked>
                  Secondary
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
            <Row>
              <Col sm="3">
                <Button theme="primary" blocked disabled>
                  Primary
                </Button>
              </Col>
              <Col sm="3">
                <Button theme="secondary" blocked disabled>
                  Secondary
                </Button>
              </Col>
              <Col sm="3">
                <Button blocked disabled>
                  Default
                </Button>
              </Col>
            </Row>
          );
        }
      }
    }
  ]
};
