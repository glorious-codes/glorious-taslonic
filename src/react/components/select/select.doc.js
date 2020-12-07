module.exports = {
  name: 'Select',
  description: 'Abstration of a native select.',
  properties: [
    {
      name: 'validations',
      type: 'Array',
      values: '[{ isValid: <Boolean> Function, errorMessage: String }]'
    },
    {
      name: 'blocked',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'autoFocus',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'disabled',
      type: 'Boolean/String',
      values: 'true, false, disabled'
    },
    {
      name: 'required',
      type: 'Boolean/String',
      values: 'true, false, required'
    }
  ],
  examples: [
    {
      title: 'Default Select',
      controller: function(){
        const { Select } = taslonicReact;

        return function(){
          return (
            <Select>
              <option value="">Select</option>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="banana">Banana</option>
            </Select>
          )
        }
      }
    },
    {
      title: 'Select with custom validations',
      description: 'Validations should be an Array of objects containing a function isValid that returns a Boolean and an errorMessage.',
      controller: function(){
        const { useState } = React;
        const { Select } = taslonicReact;

        return function(){
          const validations = [{
            isValid: data => (!data || data.toLowerCase() == 'javascript'),
            errorMessage: 'Please, enter a cooler one'
          }]

          return (
            <Select validations={validations}>
              <option value="">Select</option>
              <option value="java">Java</option>
              <option value="javascript">Javascript</option>
              <option value="go">Go</option>
            </Select>
          )
        }
      },
      styles: `
        p-external-component-examples-list p-list-item:nth-child(2) .t-form-control { max-width: 100%; }
        p-external-component-examples-list p-list-item:nth-child(2) select { width: 200px; max-width: 100%; }
      `
    },
    {
      title: 'Blocked Select',
      description: 'Blocked selects behave like a block.',
      controller: function(){
        const { Row, Col, Select } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col xs="4">
                <Select blocked>
                  <option value="">Select</option>
                  <option value="apple">Apple</option>
                  <option value="orange">Orange</option>
                  <option value="banana">Banana</option>
                </Select>
              </Col>
              <Col xs="4">
                <Select blocked>
                  <option value="">Select</option>
                  <option value="rock">Rock</option>
                  <option value="punk">Punk</option>
                  <option value="samba">Samba</option>
                </Select>
              </Col>
              <Col xs="4">
                <Select blocked>
                  <option value="">Select</option>
                  <option value="football">Football</option>
                  <option value="basketball">Basketball</option>
                  <option value="baseboll">Baseboll</option>
                </Select>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Select with autofocus',
      controller: function(){
        const { Select } = taslonicReact;

        return function(){
          return (
            <Select autoFocus>
              <option value="">Select</option>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="banana">Banana</option>
            </Select>
          )
        }
      }
    },
    {
      title: 'Disabled Select',
      controller: function(){
        const { Select } = taslonicReact;

        return function(){
          return (
            <Select disabled>
              <option value="">Select</option>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="banana">Banana</option>
            </Select>
          )
        }
      }
    },
    {
      title: 'Required Select',
      controller: function(){
        const { Select } = taslonicReact;

        return function(){
          return (
            <Select required>
              <option value="">Select</option>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="banana">Banana</option>
            </Select>
          )
        }
      }
    },
    {
      title: 'Listening Select changes',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Select } = taslonicReact;

        return function(){
          const [data, setData] = useState({ fruit: null });
          const handleDataChange = ({ target: { name, value } }) => {
            setData({ [name]: value });
          }

          return (
            <>
              <Row verticalAlign="middle">
                <Col md="3">
                  <Select name="fruit" onChange={handleDataChange}>
                    <option value="">Select</option>
                    <option value="apple">Apple</option>
                    <option value="orange">Orange</option>
                    <option value="banana">Banana</option>
                  </Select>
                </Col>
                {
                  data.fruit !== null &&
                  <Col md="3">
                    Fruit: { data.fruit }
                  </Col>
                }
              </Row>
            </>
          )
        }
      }
    },
  ]
};
