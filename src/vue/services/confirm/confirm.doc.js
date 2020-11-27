module.exports = {
  name: 'Confirm',
  description: 'Service to open confirmation dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, cancelButtonText, confirmButtonText, onCancel, onConfirm })',
      params: [
        {
          name: 'content',
          type: 'String, Vue Component',
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
      controller: {
        methods: {
          confirm(){
            const { confirm } = taslonicVue;
            confirm.open({
              content: 'Are you sure?',
              onConfirm: () => setTimeout(this.popConfirmation, 300)
            });
          },
          popConfirmation(){
            const { toaster } = taslonicVue;
            toaster.pop({
              theme: 'success',
              title: 'Confirmed!',
              message: 'You have confirmed.'
            })
          }
        }
      },
      template: '<t-button @click="confirm">Confirm</t-button>'
    },
    {
      title: 'Confirm with Title',
      controller: {
        methods: {
          confirm(){
            const { confirm } = taslonicVue;
            confirm.open({
              content: 'Are you sure you want to delete your account?',
              title: 'Delete Account',
              onConfirm: () => setTimeout(this.popConfirmation, 300)
            });
          },
          popConfirmation(){
            const { toaster } = taslonicVue;
            toaster.pop({
              theme: 'success',
              title: 'Confirmed!',
              message: 'You have confirmed.'
            })
          }
        }
      },
      template: '<t-button @click="confirm">Confirm</t-button>'
    },
    {
      title: 'Confirm with custom width',
      description: 'Default confirm stretches up to 400px, but you can optionally set how wide it can be.',
      controller: {
        methods: {
          confirm(){
            const { confirm } = taslonicVue;
            confirm.open({
              content: `
              <p>
                This Confirm stretches up to <strong>700px</strong>.
                On narrower screens it will fit properly.
              </p>`,
              title: 'Ther Wider Confirm',
              width: '700px',
              onConfirm: () => setTimeout(this.popConfirmation, 300)
            });
          },
          popConfirmation(){
            const { toaster } = taslonicVue;
            toaster.pop({
              theme: 'success',
              title: 'Confirmed!',
              message: 'You have confirmed.'
            })
          }
        }
      },
      template: '<t-button @click="confirm">Confirm</t-button>'
    },
    {
      title: 'Confirm with custom button texts',
      controller: {
        methods: {
          confirm(){
            const { confirm } = taslonicVue;
            confirm.open({
              content: 'Are you sure you want to send those invites?',
              title: 'Invitation',
              confirmButtonText: 'Yes, send them all!',
              cancelButtonText: 'No, wait.',
              onConfirm: () => setTimeout(this.popConfirmation, 300)
            });
          },
          popConfirmation(){
            const { toaster } = taslonicVue;
            toaster.pop({
              theme: 'success',
              title: 'Confirmed!',
              message: 'You have confirmed.'
            })
          }
        }
      },
      template: '<t-button @click="confirm">Confirm</t-button>'
    },
    {
      title: 'Confirm with cancel listener',
      controller: {
        methods: {
          confirm(){
            const { confirm } = taslonicVue;
            confirm.open({
              content: 'Are you sure?',
              onConfirm: () => setTimeout(() => {
                this.popConfirmation('Confirmed!', 'You have confirmed.', 'success')
              }, 300),
              onCancel: () => setTimeout(() => {
                this.popConfirmation('Cancelled', 'You have cancelled.')
              }, 300)
            });
          },
          popConfirmation(title, message, theme){
            const { toaster } = taslonicVue;
            toaster.pop({ theme, title, message })
          }
        }
      },
      template: '<t-button @click="confirm">Confirm</t-button>'
    }
  ]
}
