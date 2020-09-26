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
      values: 'true, false'
    },
    {
      name: 'blocked',
      type: 'Boolean',
      values: 'true, false'
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
      title: 'Blocked Field',
      description: 'Blocked fields behave like a block.',
      controller: function(){
        const { useState } = React;
        const { Field, Input, Row, Col } = taslonicReact;

        return function(){
          const [required, setRequired] = useState(true);

          return (
            <Row>
              <Col md="6">
                <Field label="First Name" blocked>
                  <Input blocked />
                </Field>
              </Col>
              <Col md="6">
                <Field label="Last Name" blocked>
                  <Input blocked />
                </Field>
              </Col>
            </Row>
          );
        }
      }
    }
  ]
};
