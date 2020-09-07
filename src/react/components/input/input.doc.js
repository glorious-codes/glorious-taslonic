module.exports = {
  name: 'Input',
  description: 'Abstration of a native input, but not supporting all native types.',
  properties: [
    {
      name: 'type',
      type: 'String',
      values: 'email, number, password, search, tel, text, url'
    },
    {
      name: 'name',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'value',
      type: 'String/Number',
      values: 'Any'
    },
    {
      name: 'placeholder',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'validations',
      type: 'Array',
      values: '[{ isValid: <Boolean> Function, errorMessage: String }]'
    },
    {
      name: 'autoFocus',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'readOnly',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'blocked',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'required',
      type: 'Boolean',
      values: 'true, false'
    }
  ],
  examples: [
    {
      title: 'Default Input',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input />
          );
        }
      }
    },
    {
      title: 'Input with custom type',
      description: 'If you not pass a type, input type will be set as text by default.',
      controller: function(){
        const { Input, Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <Col md="4">
                  <Input type="email" placeholder="Email" blocked />
                </Col>
                <Col md="4">
                  <Input type="number" placeholder="Number" blocked />
                </Col>
                <Col md="4">
                  <Input type="password" placeholder="Password" blocked />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Input type="search" placeholder="Search" blocked />
                </Col>
                <Col md="4">
                  <Input type="tel" placeholder="Phone" blocked />
                </Col>
                <Col md="4">
                  <Input type="url" placeholder="URL" blocked />
                </Col>
              </Row>
            </>
          );
        }
      }
    },
    {
      title: 'Input with name',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input name="city" />
          );
        }
      }
    },
    {
      title: 'Input with initial value',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input value="Taslonic" />
          );
        }
      }
    },
    {
      title: 'Input with placeholder',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input placeholder="Enter your name" />
          );
        }
      }
    },
    {
      title: 'Input with custom validations',
      description: 'Validations should be an Array of objects containing a function isValid that returns a Boolean and an errorMessage.',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          const validations = [{
            isValid: data => (!data || data.toLowerCase() == 'javascript'),
            errorMessage: 'Please, enter a cooler one'
          }];

          return (
            <Input validations={validations} placeholder="Enter a programming language" />
          );
        }
      },
      styles: `
        p-external-component-examples-list p-list-item:nth-child(6) .t-form-control { max-width: 100%; }
        p-external-component-examples-list p-list-item:nth-child(6) input { width: 300px; max-width: 100%; }
      `
    },
    {
      title: 'Input with autofocus',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input autoFocus />
          );
        }
      }
    },
    {
      title: 'Input read-only',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input value="Taslonic" readOnly />
          );
        }
      }
    },
    {
      title: 'Input blocked',
      description: 'Blocked inputs behave like a block.',
      controller: function(){
        const { Input, Row, Col } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col xs="4">
                <Input blocked />
              </Col>
              <Col xs="4">
                <Input blocked />
              </Col>
              <Col xs="4">
                <Input blocked />
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Disabled Input',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input value="Rafael" disabled />
          );
        }
      }
    },
    {
      title: 'Required Input',
      controller: function(){
        const { Input } = taslonicReact;

        return function(){
          return (
            <Input required />
          );
        }
      }
    },
    {
      title: 'Listening Input changes',
      controller: function(){
        const { useState } = React;
        const { Input, Col, Row } = taslonicReact;

        return function(){
          const [data, setData] = useState();
          const handleChange = ({ target }) => {
            const { name, value } = target;
            setData({ [name]: value });
          }

          return (
            <Row verticalAlign="middle">
              <Col md="6">
                <Input
                  name="city"
                  placeholder="Enter your city name"
                  onChange={handleChange}
                  blocked
                />
              </Col>
              <Col md="6">
                { JSON.stringify(data) }
              </Col>
            </Row>
          );
        }
      }
    }
  ]
};
