module.exports = {
  name: 'Alert',
  description: 'Service to open alert dialogs.',
  methods: [
    {
      name: 'open({ title, content, width, dismissButtonText, onDismiss })',
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
    }
  ]
}
