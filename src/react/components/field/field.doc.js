module.exports = {
  name: 'Field',
  description: 'Container for form controls like input, select or textarea.',
  properties: [
    {
      name: 'label',
      type: 'String',
      values: 'Any',
      required: true
    },
    {
      name: 'required',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'block',
      type: 'Boolean',
      values: 'any'
    }
  ],
  examples: [
    {
      title: 'Default Field',
      controller: function(){
        const { Field, Input } = taslonicReact;

        return function(){
          return (
            <Field label="Name">
              <Input />
            </Field>
          );
        }
      }
    },
    {
      title: 'Required Field',
      description: 'If you pass a required form control to the field, it will automatically show an asterisk mark.',
      controller: function(){
        const { Field, Input } = taslonicReact;

        return function(){
          return (
            <Field label="Name">
              <Input required />
            </Field>
          );
        }
      }
    },
    {
      title: 'Dynamic Required Field',
      description: 'You can optionally control the asterisk mark visibility regardless of the form control passed to the field.',
      controller: function(){
        const { useState } = React;
        const { Field, Input, Row, Col, Button } = taslonicReact;

        return function(){
          const [required, setRequired] = useState(true);

          return (
            <>
              <Row>
                <Col>
                  <Field label="Name" required={required}>
                    <Input required={required} />
                  </Field>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button onClick={() => setRequired(!required)}>
                    Toggle Required
                  </Button>
                </Col>
              </Row>
            </>
          );
        }
      }
    },
    {
      title: 'Block Field',
      description: 'Block property makes fields behave like a block.',
      controller: function(){
        const { useState } = React;
        const { Field, Input, Row, Col } = taslonicReact;

        return function(){
          const [required, setRequired] = useState(true);

          return (
            <Row>
              <Col md="6">
                <Field label="First Name" block>
                  <Input block />
                </Field>
              </Col>
              <Col md="6">
                <Field label="Last Name" block>
                  <Input block />
                </Field>
              </Col>
            </Row>
          );
        }
      }
    }
  ]
};
