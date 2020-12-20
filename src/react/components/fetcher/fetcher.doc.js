module.exports = {
  name: 'Fetcher',
  description: 'A wrapper for async data that needs to be fetched.',
  properties: [
    {
      name: 'onFetch',
      type: '<Promise> Function',
      values: 'Any',
      required: true
    },
    {
      name: 'onFetchSuccess',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'onFetchError',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'fetchErrorMessage',
      type: 'String',
      values: 'Any'
    }
  ],
  examples: [
    {
      title: 'Default Fetcher',
      controller: function(){
        const { useState } = React;
        const { Col, Row, Card, Fetcher } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({ greeting: 'Hello!' })
              }, 2000);
            });
          }
          const onFetchSuccess = data => {
            // onFetchSuccess receives the response sent by the server.
            setData(data);
          }

          return (
            <Row align="center">
              <Col md="6">
                <Card>
                  <Fetcher
                    onFetch={onFetch}
                    onFetchSuccess={onFetchSuccess}
                  >
                    <span>{ data.greeting }</span>
                  </Fetcher>
                </Card>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling fetch error',
      controller: function(){
        const { Col, Row, Fetcher } = taslonicReact;

        return function(){
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise((resolve, reject) => {
              setTimeout(() => reject(), 2000);
            });
          }
          const onFetchError = err => {
            // onFetchError receives the error sent by the server.
          }

          return (
            <Row align="center">
              <Col md="6">
                <Fetcher onFetch={onFetch} onFetchError={onFetchError}>
                  <span>Content to be shown on fetch success only.</span>
                </Fetcher>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Custom fetch error message',
      description: 'You can optionally show a custom error message when fetch fails.',
      controller: function(){
        const { Col, Row, Fetcher } = taslonicReact;

        return function(){
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise((resolve, reject) => {
              setTimeout(() => reject(), 2000);
            });
          }
          const onFetchError = err => {
            // onFetchError receives the error sent by the server.
          }

          return (
            <Row align="center">
              <Col md="6">
                <Fetcher
                  onFetch={onFetch}
                  onFetchError={onFetchError}
                  fetchErrorMessage="Ops, we're facing some issues. Please, try again."
                >
                  <span>Content to be shown on fetch success only.</span>
                </Fetcher>
              </Col>
            </Row>
          )
        }
      }
    }
  ]
};
