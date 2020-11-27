module.exports = {
  name: 'Dialog',
  description: 'Service to open dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, hideCloseButton, onClose })',
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
          name: 'hideCloseButton',
          type: 'Boolean',
          values: 'true, false',
          description: 'Hides dialog close button.'
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
      description: 'You can optionally hide the dialog close button and take full control on how and when to close the dialog.',
      controller: function(){
        const { useState, useEffect } = React;
        const { Button, dialog } = taslonicReact;

        return function(){
          let selfClosingDialog;

          const DialogContent = () => {
            const [count, setCount] = useState(5);

            useEffect(() => {
              const interval = window.setInterval(() => {
                const newCount = count - 1;
                if(newCount === 0) selfClosingDialog.close();
                else setCount(newCount)
              }, 1000);
              return () => window.clearInterval(interval);
            }, [count, setCount])

            return (
              <span>
                This dialog will close in <strong>{count}</strong> seconds...
              </span>
            );
          }

          const openDialog = () => {
            selfClosingDialog = dialog.open({
              content: <DialogContent />,
              title: 'Self Closing Dialog',
              hideCloseButton: true
            });
          };

          return <Button onClick={openDialog}>Open Dialog</Button>;
        }
      }
    }
  ]
}
