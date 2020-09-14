module.exports = {
  name: 'Stripe',
  description: 'Element to be shown usually at the top of screen containing useful information - feedback about the completion of an async process, for example.',
  properties: [
    {
      name: 'theme',
      type: 'String',
      values: 'warning, danger, success'
    },
    {
      name: 'triggerText',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'onTriggerClick',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'onClose',
      type: 'Function',
      values: 'Any'
    }
  ],
  examples: [
    {
      title: 'Default Stripe',
      controller: function(){
        const { Stripe } = taslonicReact;

        return function(){
          return (
            <Stripe>Welcome onboard!</Stripe>
          );
        }
      }
    },
    {
      title: 'Stripe theme',
      controller: function(){
        const { Stripe, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col md="4">
                <Stripe theme="warning">
                  We found security vulnerabilities.
                </Stripe>
              </Col>
              <Col md="4">
                <Stripe theme="danger">
                  Sorry, something went wrong.
                </Stripe>
              </Col>
              <Col md="4">
                <Stripe theme="success">
                  You’re all set up!
                </Stripe>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Stripe trigger',
      controller: function(){
        const { Stripe, Col, Row } = taslonicReact;
        const viewVulnerabilities = () => alert('Clicked on "View Vulnerabilities"!');
        const retry = () => alert('Clicked on "Retry"!');
        const viewProfile = () => alert('Clicked on "View Profile"!');

        return function(){
          return (
            <Row>
              <Col md="4">
                <Stripe
                  theme="warning"
                  triggerText="See Vulnerabilities"
                  onTriggerClick={viewVulnerabilities}
                >
                  We found security vulnerabilities.
                </Stripe>
              </Col>
              <Col md="4">
                <Stripe
                  theme="danger"
                  triggerText="Retry"
                  onTriggerClick={retry}
                >
                  Sorry, something went wrong.
                </Stripe>
              </Col>
              <Col md="4">
                <Stripe
                  theme="success"
                  triggerText="View Profile"
                  onTriggerClick={viewProfile}
                >
                  You’re all set up!
                </Stripe>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Stripe close listener',
      description: 'You can optionally execute some action at the moment user closes a Stripe.',
      controller: function(){
        const { Stripe } = taslonicReact;
        const onClose = () => alert('Clicked on "Close Button"!');

        return function(){
          return (
            <Stripe theme="danger" onClose={onClose}>
              Sorry, something went wrong.
            </Stripe>
          );
        }
      }
    }
  ]
};
