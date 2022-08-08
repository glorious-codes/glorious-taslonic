module.exports = {
  name: 'Form',
  description: 'Abstration of a native form.',
  properties: [
    {
      name: 'onSubmit',
      type: '<Promise> Function',
      values: 'Any',
      required: true
    },
    {
      name: 'onSubmitSuccess',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'onSubmitError',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'onFetch',
      type: '<Promise> Function',
      values: 'Any'
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
      name: 'submitSuccessMessage',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'submitSuccessTitle',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'submitErrorMessage',
      type: 'String',
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
      title: 'Default Form',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Form, Field, Input, Button } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const onDataChange = ({ target: { name, value } }) => {
            const newData = { ...data, [name]: value };
            setData(newData);
          }
          const onSubmit = () => {
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => resolve({ statusCode: 200 }), 2000));
          }
          const onSubmitSuccess = response => {
            // onSubmitSuccess receives the response sent by the server.
            setData({ name: '', surname: '' });
          }

          return (
            <Row align="center">
              <Col md="4">
                <Form
                  onSubmit={onSubmit}
                  onSubmitSuccess={onSubmitSuccess}
                  submitSuccessTitle="Good job!"
                  submitSuccessMessage="Form successfully sent.">
                  <Row>
                    <Col>
                      <Field label="Name" block>
                        <Input name="name" value={data.name} onChange={onDataChange} block required />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field label="Surname" block>
                        <Input name="surname" value={data.surname} onChange={onDataChange} block />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" theme="primary" block>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling with submit sucess',
      description: 'By default, submit success fires a toast. You can optionally set a custom submit feedback by not passing a submit success message.',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Form, Banner, Field, Input, Button } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const [isSuccessBannerVisible, setSuccessBannerVisibility] = useState(false);
          const onDataChange = ({ target: { name, value } }) => {
            const newData = { ...data, [name]: value };
            setData(newData);
          }
          const onSubmit = () => {
            setSuccessBannerVisibility(false);
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => resolve({ statusCode: 200 }), 2000));
          }
          const onSubmitSuccess = response => {
            // onSubmitSuccess receives the response sent by the server.
            setSuccessBannerVisibility(true);
          }

          return (
            <Row align="center">
              <Col md="4">
                <Form
                  onSubmit={onSubmit}
                  onSubmitSuccess={onSubmitSuccess}>
                  {
                    isSuccessBannerVisible &&
                    <Row>
                      <Col>
                        <Banner theme="success" onClose={() => setSuccessBannerVisibility(false)}>
                          Form successfully sent!
                        </Banner>
                      </Col>
                    </Row>
                  }
                  <Row>
                    <Col>
                      <Field label="Name" block>
                        <Input name="name" value={data.name} onChange={onDataChange} block required />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field label="Surname" block>
                        <Input name="surname" value={data.surname} onChange={onDataChange} block />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" theme="primary" block>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling with submit error',
      description: 'You can optionally set a submit error message.',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Form, Field, Input, Button } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const onDataChange = ({ target: { name, value } }) => {
            const newData = { ...data, [name]: value };
            setData(newData);
          }
          const onSubmit = () => {
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise((resolve, reject) => setTimeout(() => reject({ statusCode: 503 }), 2000));
          }
          const onSubmitError = err => {
            // onSubmitError receives the error sent by the server.
          }

          return (
            <Row align="center">
              <Col md="4">
                <Form
                  onSubmit={onSubmit}
                  onSubmitError={onSubmitError}>
                  <Row>
                    <Col>
                      <Field label="Name" block>
                        <Input name="name" value={data.name} onChange={onDataChange} block required />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field label="Surname" block>
                        <Input name="surname" value={data.surname} onChange={onDataChange} block />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" theme="primary" block>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling with fetch success',
      description: 'For the cases in which form is editing an existing resource, you can fetch it using the fetch properties.',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Form, Field, Input, Button } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const onDataChange = ({ target: { name, value } }) => {
            const newData = { ...data, [name]: value };
            setData(newData);
          };
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise(resolve => {
              setTimeout(() => resolve({
                data: {
                  name: 'John',
                  surname: 'Duo'
                }
              }), 2000);
            });
          };
          const onFetchSuccess = ({ data }) => {
            // onFetchSuccess receives the response sent by the server.
            setData(data);
          };
          const onSubmit = () => {
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => resolve({ statusCode: 200 }), 2000));
          };
          const onSubmitSuccess = () => {

          };

          return (
            <Row align="center">
              <Col md="4">
                <Form
                  onFetch={onFetch}
                  onFetchSuccess={onFetchSuccess}
                  onSubmit={onSubmit}
                  onSubmitSuccess={onSubmitSuccess}
                  submitSuccessTitle="Good job!"
                  submitSuccessMessage="Form successfully sent.">
                  <Row>
                    <Col>
                      <Field label="Name" block>
                        <Input name="name" value={data.name} onChange={onDataChange} block required />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field label="Surname" block>
                        <Input name="surname" value={data.surname} onChange={onDataChange} block />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" theme="primary" block>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling with fetch error',
      description: 'You can optionally set a fetch error message.',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Form, Field, Input, Button } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const onDataChange = ({ target: { name, value } }) => {
            const newData = { ...data, [name]: value };
            setData(newData);
          };
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise((resolve, reject) => {
              setTimeout(() => reject({ statusCode: 503 }), 2000);
            });
          };
          const onFetchError = err => {
            // onFetchError receives the error sent by the server.
          };

          return (
            <Row align="center">
              <Col md="4">
                <Form
                  onFetch={onFetch}
                  onFetchError={onFetchError}>
                  <Row>
                    <Col>
                      <Field label="Name" block>
                        <Input name="name" value={data.name} onChange={onDataChange} block required />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field label="Surname" block>
                        <Input name="surname" value={data.surname} onChange={onDataChange} block />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" theme="primary" block>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling dynamic Form Controls',
      description: 'When a form control is removed from a form, its validation errors are automatically cleared.',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Form, Banner, Field, Input, Button } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const [shouldOmitSurname, setSurnameOmission] = useState(false);
          const surnameValidations = [{
            isValid(value){
              return value.length >= 3;
            },
            errorMessage: 'Surname must be at least 3 chars long.'
          }];
          const onDataChange = ({ target: { name, value } }) => {
            const newData = { ...data, [name]: value };
            setData(newData);
          }
          const onSubmit = () => {
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => resolve({ status: 'OK' }), 2000));
          }
          const onSubmitSuccess = () => {
            // onSubmitSuccess receives the response sent by the server.
            setData({ name: '', surname: '' });
          }

          return (
            <Row align="center">
              <Col md="4">
                <Form
                  onSubmit={onSubmit}
                  onSubmitSuccess={onSubmitSuccess}
                  submitSuccessTitle="Good job!"
                  submitSuccessMessage="Form successfully sent.">
                  <Row>
                    <Col>
                      <Field label="Name" block>
                        <Input name="name" value={data.name} onChange={onDataChange} block required />
                      </Field>
                    </Col>
                  </Row>
                  {
                    !shouldOmitSurname &&
                    <Row>
                      <Col>
                        <Field label="Surname" block>
                          <Input name="surname" value={data.surname} validations={surnameValidations} onChange={onDataChange} block required />
                        </Field>
                      </Col>
                    </Row>
                  }
                  <Row>
                    <Col>
                      <input
                        type="checkbox"
                        checked={shouldOmitSurname}
                        onChange={({ target: { checked } }) => setSurnameOmission(checked)}
                        id="surname-omission" />
                        <label htmlFor="surname-omission">Omit surname</label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" theme="primary" block>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling very specific validations',
      description: 'If submit listener does not return a Promise, nothing is gonna happen. So you can put very specific validations in there.',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Form, Banner, Field, Input, Button } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const [banner, setBanner] = useState();
          const onDataChange = ({ target: { name, value } }) => {
            const newData = { ...data, [name]: value };
            setData(newData);
          }
          const onSubmit = () => {
            const errors = getFormErros();
            if(errors.length) {
              setBanner({ theme: 'danger', message: errors[0] })
            } else {
              // Make the request and returns its Promise.
            }
          }
          const getFormErros = () => {
            const errors = [];
            if(isLateSubmission()) errors.push(buildLateSubmissionErrorMessage())
            return errors;
          }
          const isLateSubmission = () => {
            // Forcing an invalid situation for documentation purposes.
            return new Date().getTime() > buildTwoDaysBeforeNowDate().getTime();
          }
          const buildLateSubmissionErrorMessage = () => {
            const [weekDay, day, month, year] = buildTwoDaysBeforeNowDate().toUTCString().split(' ');
            const dateString = [weekDay, day, month, year].join(' ');
            return `Sorry, we have stopped accepting submissions on ${dateString}.`
          }
          const buildTwoDaysBeforeNowDate = () => new Date(new Date().getTime() - 172800000);

          return (
            <Row align="center">
              <Col md="4">
                <Form onSubmit={onSubmit}>
                  {
                    banner &&
                    <Row>
                      <Col>
                        <Banner theme={banner.theme} onClose={() => setBanner(null)}>
                          {banner.message}
                        </Banner>
                      </Col>
                    </Row>
                  }
                  <Row>
                    <Col>
                      <Field label="Name" block>
                        <Input name="name" value={data.name} onChange={onDataChange} block required />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Field label="Surname" block>
                        <Input name="surname" value={data.surname} onChange={onDataChange} block />
                      </Field>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button type="submit" theme="primary" block>
                        Send
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          )
        }
      }
    }
  ]
};
