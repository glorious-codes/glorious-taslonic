module.exports = {
  name: 'Input',
  description: 'Abstration of a native input, but not supporting all native types.',
  properties: [
    {
      name: 'type',
      type: 'String',
      values: 'color, date, datetime-local, email, file, hidden, number, password, range, search, tel, text, time, url'
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
      values: 'any'
    },
    {
      name: 'readOnly',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'block',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'required',
      type: 'Boolean',
      values: 'any'
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
      title: 'Input with type',
      description: 'If you not pass a type, it will be set as text.',
      controller: function(){
        const { Input, Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <Col md="4">
                  <Input type="search" placeholder="Search" aria-label="search" block />
                </Col>
                <Col md="4">
                  <Input type="password" placeholder="Password" aria-label="password" block />
                </Col>
                <Col md="4">
                  <Input type="number" placeholder="Number" aria-label="number" block />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Input type="email" placeholder="Email" aria-label="email" block />
                </Col>
                <Col md="4">
                  <Input type="url" placeholder="URL" aria-label="url" block />
                </Col>
                <Col md="4">
                  <Input type="tel" placeholder="Phone" aria-label="phone" block />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Input type="file" aria-label="File" block />
                </Col>
                <Col md="4">
                  <Input type="range" value="90" min="0" max="100" aria-label="range" block />
                </Col>
                <Col md="4">
                  <Input type="color" value="#6772FF" aria-label="color" block />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Input type="datetime-local" aria-label="date and time" block />
                </Col>
                <Col md="4">
                  <Input type="date" aria-label="date" block />
                </Col>
                <Col md="4">
                  <Input type="time" aria-label="time" block />
                </Col>
              </Row>
              <div>
                <Input type="hidden" />
              </div>
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
        const { Row, Col, Input } = taslonicReact;

        return function(){
          const validations = [{
            isValid: data => (!data || data.toLowerCase() == 'javascript'),
            errorMessage: 'Please, enter a funnier one'
          }];

          return (
            <Row>
              <Col md="4">
                <Input validations={validations} placeholder="Enter a programming language" block />
              </Col>
            </Row>
          );
        }
      }
    },
    {
      title: 'Input with custom file validations',
      description: 'You can read the selected files by inspecting the event passed as second argument to the validation function.',
      controller: function(){
        const { Row, Col, Input } = taslonicReact;

        return function(){
          const validations = [{
            isValid: (data, evt) => (!data || evt.target.files[0].size <= 2048),
            errorMessage: 'File must not exceed 2kb'
          }];

          return (
            <Row>
              <Col md="4">
                <Input type="file" validations={validations} block />
              </Col>
            </Row>
          );
        }
      }
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
      title: 'Input block',
      description: 'Block property makes inputs behave like a block.',
      controller: function(){
        const { Input, Row, Col } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col sm="4">
                <Input block />
              </Col>
              <Col sm="4">
                <Input block />
              </Col>
              <Col sm="4">
                <Input block />
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
                  block
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
