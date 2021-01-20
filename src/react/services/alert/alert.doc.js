module.exports = {
  name: 'Alert',
  description: 'Service to open alert dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, dismissButtonText, onDismiss })',
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
      controller: function(){
        const { Button, alert } = taslonicReact;

        return function(){
          const showAlert = () => {
            alert.open({
              content: 'Welcome!',
              onDismiss: () => console.log('Dismissed')
            });
          }

          return (
            <Button onClick={showAlert}>Alert</Button>
          )
        }
      }
    },
    {
      title: 'Alert with Title',
      controller: function(){
        const { Button, alert } = taslonicReact;

        return function(){
          const getWeekDay = () => {
            const date = new Date();
            return getWeekDays()[date.getDay()];
          };
          const getWeekDays = () => [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ];
          const showAlert = () => {
            alert.open({
              content: `Enjoy your ${getWeekDay()}!`,
              title: 'Daily Reminder'
            });
          }

          return (
            <Button onClick={showAlert}>Alert</Button>
          )
        }
      }
    },
    {
      title: 'Alert with custom width',
      description: 'Default alert stretches up to 400px, but you can optionally set how wide it can be.',
      controller: function(){
        const { Button, alert } = taslonicReact;

        return function(){
          const showAlert = () => {
            alert.open({
              content: (
                <p>
                  This Alert stretches up to <strong>700px</strong>.
                  On narrower screens it will fit properly.
                </p>
              ),
              title: 'Ther Wider Alert',
              width: '700px'
            });
          }

          return (
            <Button onClick={showAlert}>Alert</Button>
          )
        }
      }
    },
    {
      title: 'Alert with custom dismiss button text',
      controller: function(){
        const { Button, alert } = taslonicReact;

        return function(){
          const showAlert = () => {
            alert.open({
              content: 'The world is changing.',
              title: 'Heads up!',
              dismissButtonText: 'Yes, I got it.',
            });
          }

          return (
            <Button onClick={showAlert}>Alert</Button>
          )
        }
      }
    },
    {
      title: 'Alert with dismiss listener',
      controller: function(){
        const { Button, alert, toaster } = taslonicReact;

        return function(){
          const showAlert = () => {
            alert.open({
              content: 'Art is always an opportunity.',
              onDismiss: () => setTimeout(() => {
                toaster.pop({ theme: 'info', title: 'Good!', message: 'You are nice.' })
              }, 300)
            });
          }

          return (
            <Button onClick={showAlert}>Alert</Button>
          )
        }
      }
    }
  ]
}
