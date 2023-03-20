module.exports = {
  name: 'Confirm',
  description: 'Service to open confirmation dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, cancelButtonText, confirmButtonText, onCancel, onConfirm })',
      params: [
        {
          name: 'content',
          type: 'String',
          values: 'Any',
          description: 'Content to be shown in the dialog.',
          required: true
        },
        {
          name: 'title',
          type: 'String',
          values: 'Any',
          description: 'Text to be used as confirm title.'
        },
        {
          name: 'width',
          type: 'String',
          values: 'Any',
          description: 'Sets how wide dialog can be.'
        },
        {
          name: 'cancelButtonText',
          type: 'String',
          values: 'Any',
          description: 'Text to be used as cancel button text'
        },
        {
          name: 'confirmButtonText',
          type: 'String',
          values: 'Any',
          description: 'Text to be used as confirm button text'
        },
        {
          name: 'onCancel',
          type: 'Function',
          values: 'Any',
          description: 'Listener to be executed on cancel button click'
        },
        {
          name: 'onConfirm',
          type: 'Function',
          values: 'Any',
          description: 'Listener to be executed on confirm button click',
          required: true
        }
      ]
    }
  ],
  examples: [
    {
      title: 'Default Confirm',
      controller: function(){
        const { Button, confirm, toaster } = taslonicReact;

        return function(){
          const openConfirmation = () => {
            confirm.open({
              content: 'Are you sure?',
              onConfirm: () => setTimeout(() => toaster.pop({
                theme: 'success',
                title: 'Confirmed!',
                message: 'You have confirmed.'
              }), 300)
            });
          };

          return (
            <Button onClick={openConfirmation}>
              Confirm
            </Button>
          );
        }
      }
    },
    {
      title: 'Confirm with Title',
      controller: function(){
        const { Button, confirm, toaster } = taslonicReact;

        return function(){
          const openConfirmation = () => {
            confirm.open({
              content: 'Are you sure you want to delete your account?',
              title: 'Delete Account',
              onConfirm: () => setTimeout(() => toaster.pop({
                theme: 'success',
                title: 'Confirmed!',
                message: 'You have confirmed.'
              }), 300)
            });
          };

          return (
            <Button onClick={openConfirmation}>
              Confirm
            </Button>
          );
        }
      }
    },
    {
      title: 'Confirm with custom width',
      description: 'Default confirm stretches up to 400px, but you can optionally set how wide it can be.',
      controller: function(){
        const { Button, confirm, toaster } = taslonicReact;

        return function(){
          const openConfirmation = () => {
            confirm.open({
              content: (
               <p>
                 This Confirm stretches up to <strong>700px</strong>.
                 On narrower screens it will fit properly.
               </p>
              ),
              title: 'Ther Wider Confirm',
              width: '700px',
              onConfirm: () => setTimeout(() => toaster.pop({
                theme: 'success',
                title: 'Confirmed!',
                message: 'You have confirmed.'
              }), 300)
            });
          };

          return (
            <Button onClick={openConfirmation}>
              Confirm
            </Button>
          );
        }
      }
    },
    {
      title: 'Confirm with custom button texts',
      controller: function(){
        const { Button, confirm, toaster } = taslonicReact;

        return function(){
          const openConfirmation = () => {
            confirm.open({
              content: 'Are you sure you want to send those invites?',
              title: 'Invitation',
              confirmButtonText: 'Yes, send them all!',
              cancelButtonText: 'No, wait.',
              onConfirm: () => setTimeout(() => toaster.pop({
                theme: 'success',
                title: 'Confirmed!',
                message: 'You have confirmed.'
              }), 300)
            });
          };

          return (
            <Button onClick={openConfirmation}>
              Confirm
            </Button>
          );
        }
      }
    },
    {
      title: 'Confirm with cancel listener',
      controller: function(){
        const { Button, confirm, toaster } = taslonicReact;

        return function(){
          const openConfirmation = () => {
            confirm.open({
              content: 'Are you sure?',
              onCancel: () => popToast('Cancelled', 'You have cancelled.'),
              onConfirm: () => popToast('Confirmed!', 'You have confirmed.', 'success')
            });
          };
          const popToast = (title, message, theme) => {
            setTimeout(() => toaster.pop({ theme, title, message }), 300)
          }

          return (
            <Button onClick={openConfirmation}>
              Confirm
            </Button>
          );
        }
      }
    }
  ]
}
