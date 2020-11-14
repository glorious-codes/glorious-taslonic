module.exports = {
  name: 'Dialog',
  description: 'Service to open dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, onClose })',
      params: [
        {
          name: 'content',
          type: 'String, React Node',
          values: 'Any',
          description: 'Content to be shown in the dialog.',
          required: true
        },
        {
          name: 'title',
          type: 'String, React Node',
          values: 'Any',
          description: 'Text to be used as dialog title.'
        },
        {
          name: 'width',
          type: 'String',
          values: 'Any',
          description: 'Sets how wide dialog can be.'
        },
        {
          name: 'onClose',
          type: 'Function',
          values: 'Any',
          description: 'Listens dialog close.'
        }
      ]
    }
  ],
  examples: [
    {
      title: 'Default Dialog',
      controller: function(){
        const { Button, dialog } = taslonicReact;

        return function(){
          const openDialog = () => {
            dialog.open({
              content: 'This is a default dialog.'
            });
          };

          return <Button onClick={openDialog}>Open Dialog</Button>;
        }
      }
    },
    {
      title: 'Dialog with Title',
      controller: function(){
        const { Button, dialog } = taslonicReact;

        return function(){
          const openDialog = () => {
            dialog.open({
              content: 'This is a dialog containing a title.',
              title: 'Hey!'
            });
          };

          return <Button onClick={openDialog}>Open Dialog</Button>;
        }
      }
    },
    {
      title: 'Dialog with custom width',
      description: 'Default dialog stretches up to 600px, but you can optionally set how wide it can be.',
      controller: function(){
        const { Button, dialog } = taslonicReact;

        return function(){
          const openDialog = () => {
            dialog.open({
              content: (
                <p>
                  This Dialog stretches up to <strong>800px</strong>.
                  On narrower screens it will fit properly.
                </p>
              ),
              title: 'Ther Wider Dialog',
              width: '800px'
            });
          };

          return <Button onClick={openDialog}>Open Dialog</Button>;
        }
      }
    },
    {
      title: 'Dialog with close listener',
      controller: function(){
        const { useState } = React;
        const { Row, Col, Button, dialog } = taslonicReact;

        return function(){
          const [closeCount, setCloseCount] = useState(0);
          const onCloseDialog = () => setCloseCount(prevCount => prevCount + 1);
          const openDialog = () => {
            dialog.open({
              content: 'Close this dialog to increment the counter.',
              title: 'Count Dialog',
              onClose: onCloseDialog
            });
          };

          return (
            <>
              <Row>
                <Col>
                  <Button onClick={openDialog}>Open Dialog</Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  { closeCount > 0 && <p>Dialog closed {closeCount}x.</p> }
                </Col>
              </Row>
            </>
          )
        }
      }
    },
    {
      title: 'Dialog closed programmatically',
      controller: function(){
        const { useState } = React;
        const { Button, dialog } = taslonicReact;

        return function(){
          const openDialog = () => {
            const selfClosingDialog = dialog.open({
              content: 'This dialog will close in 3 seconds...',
              title: 'Self Closing Dialog',
            });
            setTimeout(() => selfClosingDialog.close(), 3000);
          };

          return <Button onClick={openDialog}>Open Dialog</Button>;
        }
      }
    }
  ]
}
