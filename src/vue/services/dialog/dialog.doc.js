module.exports = {
  name: 'Dialog',
  description: 'Service to open dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, hideCloseButton, onClose })',
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
      controller: {
        methods: {
          openDialog(){
            const { dialog } = taslonicVue;
            dialog.open({
              content: 'This is a default dialog.'
            });
          }
        }
      },
      template: '<t-button @click="openDialog">Open Dialog</t-button>'
    },
    {
      title: 'Dialog with Title',
      controller: {
        methods: {
          openDialog(){
            const { dialog } = taslonicVue;
            dialog.open({
              content: 'This is a dialog containing a title.',
              title: 'Hey!'
            });
          }
        }
      },
      template: '<t-button @click="openDialog">Open Dialog</t-button>'
    },
    {
      title: 'Dialog with custom width',
      description: 'Default dialog stretches up to 600px, but you can optionally set how wide it can be.',
      controller: {
        methods: {
          openDialog(){
            const { dialog } = taslonicVue;
            dialog.open({
              content: {
                template: `
                <p>
                  This Dialog stretches up to <strong>800px</strong>.
                  On narrower screens it will fit properly.
                </p>`
              },
              title: 'Ther Wider Dialog',
              width: '800px'
            });
          }
        }
      },
      template: '<t-button @click="openDialog">Open Dialog</t-button>'
    },
    {
      title: 'Dialog with close listener',
      controller: {
        data(){
          return {
            closeCount: 0
          };
        },
        methods: {
          onCloseDialog(){
            this.closeCount++;
          },
          openDialog(){
            const { dialog } = taslonicVue;
            dialog.open({
              content: 'Close this dialog to increment the counter.',
              title: 'Count Dialog',
              onClose: () => this.onCloseDialog()
            });
          }
        }
      },
      template: `
        <div>
          <t-row>
            <t-col>
              <t-button @click="openDialog">Open Dialog</t-button>
            </t-col>
          </t-row>
          <t-row>
            <t-col>
              <span v-if="closeCount > 0">
                Dialog closed {{ closeCount }}x.
              </span>
            </t-col>
          </t-row>
        </div>
      `
    },
    {
      title: 'Dialog closed programmatically',
      description: 'You can optionally hide the dialog close button and take full control on how and when to close the dialog.',
      controller: {
        methods: {
          openDialog(){
            const { dialog } = taslonicVue;
            const selfClosingDialog = dialog.open({
              content: {
                data(){
                  return {
                    interval: null,
                    count: 5
                  };
                },
                mounted(){
                  this.interval = window.setInterval(() => {
                    --this.count;
                    if(this.count === 0) selfClosingDialog.close()
                  }, 1000);
                },
                beforeDestroy(){
                  window.clearInterval(this.interval);
                },
                template: `
                <span>
                  This dialog will close in <strong>{{ count }}</strong> seconds...
                </span>
                `
              },
              title: 'Self Closing Dialog',
              hideCloseButton: true
            });
          }
        }
      },
      template: '<t-button @click="openDialog">Open Dialog</t-button>'
    }
  ]
}
