module.exports = {
  name: 'Textarea',
  description: 'Abstration of a native textarea.',
  properties: [
    {
      name: 'value',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'placeholder',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'name',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'cols',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'rows',
      type: 'String',
      values: 'Any'
    },
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
      name: 'readOnly',
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
      title: 'Default Textarea',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea />
          )
        }
      }
    },
    {
      title: 'Textarea with placeholder',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea placeholder="Type anything..." />
          )
        }
      }
    },
    {
      title: 'Textarea with name',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea name="bio" />
          )
        }
      }
    },
    {
      title: 'Textarea with cols and rows',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea cols="15" rows="2" />
          )
        }
      }
    },
    {
      title: 'Textarea with validations',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          const validations = [{
            isValid: data => (!data || data.length <= 140),
            errorMessage: 'Enter a content no longer than 140 chars'
          }];

          return (
            <Textarea validations={validations} cols="25" rows="8" />
          )
        }
      }
    },
    {
      title: 'Blocked Textarea',
      description: 'Blocked textareas behave like a block.',
      controller: function(){
        const { Row, Col, Textarea } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col md="6">
                <Textarea blocked />
              </Col>
              <Col md="6">
                <Textarea blocked />
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Textarea with autofocus',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea autoFocus />
          )
        }
      }
    },
    {
      title: 'Textarea read-only',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea readOnly value="Taslonic" />
          )
        }
      }
    },
    {
      title: 'Disabled Textarea',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea disabled />
          )
        }
      }
    },
    {
      title: 'Required Textarea',
      controller: function(){
        const { Textarea } = taslonicReact;

        return function(){
          return (
            <Textarea required />
          )
        }
      }
    },
    {
      title: 'Listening Textarea changes',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Textarea } = taslonicReact;

        return function(){
          const [counter, setCounter] = useState(0);

          return (
            <Row verticalAlign="middle">
              <Col md="6">
                <Textarea onBlur={() => setCounter(counter + 1)} blocked />
              </Col>
              {
                counter > 0 &&
                <Col md="6">
                  Blurred { counter }x
                </Col>
              }
            </Row>
          );
        }
      }
    }
  ]
};
