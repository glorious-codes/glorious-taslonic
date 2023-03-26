module.exports = {
  name: 'Banner',
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
      title: 'Default Banner',
      controller: function(){
        const { Banner } = taslonicReact;

        return function(){
          return (
            <Banner>Welcome onboard!</Banner>
          );
        }
      }
    },
    {
      title: 'Banner theme',
      controller: function(){
        const { Banner, Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col md="4">
                <Banner theme="warning">
                  We found security vulnerabilities.
                </Banner>
              </Col>
              <Col md="4">
                <Banner theme="danger">
                  Sorry, something went wrong.
                </Banner>
              </Col>
              <Col md="4">
                <Banner theme="success">
                  You're all set up!
                </Banner>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Banner trigger',
      controller: function(){
        const { Banner, Col, Row } = taslonicReact;
        const viewVulnerabilities = () => alert('Clicked on "View Vulnerabilities"!');
        const retry = () => alert('Clicked on "Retry"!');
        const viewProfile = () => alert('Clicked on "View Profile"!');

        return function(){
          return (
            <Row>
              <Col md="4">
                <Banner
                  theme="warning"
                  triggerText="View Vulnerabilities"
                  onTriggerClick={viewVulnerabilities}
                >
                  We found security vulnerabilities.
                </Banner>
              </Col>
              <Col md="4">
                <Banner
                  theme="danger"
                  triggerText="Retry"
                  onTriggerClick={retry}
                >
                  Sorry, something went wrong.
                </Banner>
              </Col>
              <Col md="4">
                <Banner
                  theme="success"
                  triggerText="View Profile"
                  onTriggerClick={viewProfile}
                >
                  You're all set up!
                </Banner>
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Banner close listener',
      description: 'You can optionally execute some action at the moment user closes a Banner.',
      controller: function(){
        const { Banner } = taslonicReact;
        const handleClose = () => alert('Clicked on "Close Button"!');

        return function(){
          return (
            <Banner theme="danger" onClose={handleClose}>
              Sorry, something went wrong.
            </Banner>
          );
        }
      }
    }
  ]
};
