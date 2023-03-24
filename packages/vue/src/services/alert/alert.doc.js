module.exports = {
  name: 'Alert',
  description: 'Service to open alert dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, dismissButtonText, onDismiss })',
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
          name: 'dismissButtonText',
          type: 'String',
          values: 'Any',
          description: 'Text to be used as dismiss button text'
        },
        {
          name: 'onDismiss',
          type: 'Function',
          values: 'Any',
          description: 'Listener to be executed on dismiss button click'
        }
      ]
    }
  ],
  examples: [
    {
      title: 'Default Alert',
      controller: {
        methods: {
          alert(){
            const { alert } = taslonicVue;
            alert.open({
              content: 'Welcome!'
            });
          }
        }
      },
      template: '<t-button @click="alert">Alert</t-button>'
    },
    {
      title: 'Alert with Title',
      controller: {
        methods: {
          alert(){
            const { alert } = taslonicVue;
            alert.open({
              content: `Enjoy your ${this.getWeekDay()}!`,
              title: 'Daily Reminder'
            });
          },
          getWeekDay(){
            const date = new Date();
            return this.getWeekDays()[date.getDay()];
          },
          getWeekDays(){
            return [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ];
          }
        }
      },
      template: '<t-button @click="alert">Alert</t-button>'
    },
    {
      title: 'Alert with custom width',
      description: 'Default alert stretches up to 400px, but you can optionally set how wide it can be.',
      controller: {
        methods: {
          alert(){
            const { alert } = taslonicVue;
            alert.open({
              content: `
              <p>
                This Alert stretches up to <strong>700px</strong>.
                On narrower screens it will fit properly.
              </p>`,
              title: 'Ther Wider Alert',
              width: '700px'
            });
          }
        }
      },
      template: '<t-button @click="alert">Alert</t-button>'
    },
    {
      title: 'Alert with custom dismiss button text',
      controller: {
        methods: {
          alert(){
            const { alert } = taslonicVue;
            alert.open({
              content: 'The world is changing.',
              title: 'Heads up!',
              dismissButtonText: 'Yes, I got it.',
            });
          }
        }
      },
      template: '<t-button @click="alert">Alert</t-button>'
    },
    {
      title: 'Alert with dismiss listener',
      controller: {
        methods: {
          alert(){
            const { alert, toaster } = taslonicVue;
            alert.open({
              content: 'Art is always an opportunity.',
              onDismiss: () => setTimeout(() => {
                toaster.pop({ theme: 'info', title: 'Good!', message: 'You are nice.' })
              }, 300)
            });
          }
        }
      },
      template: '<t-button @click="alert">Alert</t-button>'
    }
  ]
}
