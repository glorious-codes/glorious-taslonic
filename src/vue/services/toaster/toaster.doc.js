module.exports = {
  name: 'Toaster',
  description: 'Service to pop toasts.',
  methods: [
    {
      name: 'pop({ title, message, theme })',
      params: [
        {
          name: 'message',
          type: 'String',
          values: 'Any',
          description: 'Text to be used as toast content.',
          required: true
        },
        {
          name: 'title',
          type: 'String',
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
      controller: {
        methods: {
          pop(){
            const { toaster } = taslonicVue;
            toaster.pop({
              message: 'This is a default Toast!'
            });
          }
        }
      },
      template: `
      <t-button @click="pop">Default Toast</t-button>
      `
    },
    {
      title: 'Toast with title',
      description: 'You can optionally pop a toast containing a title.',
      controller: {
        methods: {
          pop(){
            const { toaster } = taslonicVue;
            toaster.pop({
              title: 'Enjoy!',
              message: 'This is a message right after a title.'
            });
          }
        }
      },
      template: `
      <t-button @click="pop">Toast with Title</t-button>
      `
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
      template: `
      <t-row>
        <t-col md="3">
          <t-button @click="() => pop('info')" block>Info Toast</t-button>
        </t-col>
        <t-col md="3">
          <t-button @click="() => pop('warning')" block>Warning Toast</t-button>
        </t-col>
        <t-col md="3">
          <t-button @click="() => pop('danger')" block>Danger Toast</t-button>
        </t-col>
        <t-col md="3">
          <t-button @click="() => pop('success')" block>Success Toast</t-button>
        </t-col>
      </t-row>

      `
    }
  ]
};
