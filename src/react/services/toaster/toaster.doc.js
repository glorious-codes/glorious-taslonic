module.exports = {
  name: 'Toaster',
  description: 'Service to pop toasts.',
  methods: [
    {
      name: 'pop({ title, message, theme })',
      params: [
        {
          name: 'message',
          type: 'String, React Node',
          values: 'Any',
          description: 'Text to be used as toast content.',
          required: true
        },
        {
          name: 'title',
          type: 'String, React Node',
          values: 'Any',
          description: 'Text to be used as toast title.'
        },
        {
          name: 'theme',
          type: 'String',
          values: 'info, warning, danger, success',
          description: 'Theme to be used on toast.'
        }
      ]
    }
  ],
  examples: [
    {
      title: 'Default Toast',
      controller: function(){
        const { Button, toaster } = taslonicReact;

        return function(){
          const pop = () => {
            toaster.pop({
              message: 'This is a default Toast!'
            });
          };

          return <Button onClick={pop}>Default Toast</Button>;
        }
      }
    },
    {
      title: 'Toast with title',
      description: 'You can optionally pop a toast containing a title.',
      controller: function(){
        const { Button, toaster } = taslonicReact;

        return function(){
          const pop = () => {
            toaster.pop({
              title: 'Enjoy!',
              message: 'This is a default Toast!'
            });
          };

          return <Button onClick={pop}>Toast with Title</Button>;
        }
      }
    },
    {
      title: 'Toast with theme',
      description: 'You can optionally set a theme to the toast.',
      controller: {
        methods: {
          pop(theme){
            const { toaster } = taslonicVue;
            toaster.pop({
              title: this.capitalize(theme),
              message: `This is a <i>${theme}</i> toast.`,
              theme
            });
          },
          capitalize([ firstLetter, ...rest ]){
            return [firstLetter.toUpperCase(), ...rest].join('');
          }
        }
      },
      controller: function(){
        const { Button, Col, Row, toaster } = taslonicReact;

        return function(){
          const pop = theme => {
            toaster.pop({
              title: capitalize(theme),
              message: <>This is a <i>{theme}</i> toast.</>,
              theme
            });
          };

          const capitalize = ([ firstLetter, ...rest ]) => {
            return [firstLetter.toUpperCase(), ...rest].join('');
          };

          return (
            <Row>
              <Col md="3">
                <Button onClick={() => pop('info')} block>Info Toast</Button>
              </Col>
              <Col md="3">
                <Button onClick={() => pop('warning')} block>Warning Toast</Button>
              </Col>
              <Col md="3">
                <Button onClick={() => pop('danger')} block>Danger Toast</Button>
              </Col>
              <Col md="3">
                <Button onClick={() => pop('success')} block>Success Toast</Button>
              </Col>
            </Row>
          );
        }
      }
    }
  ]
};
