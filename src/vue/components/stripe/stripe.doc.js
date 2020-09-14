module.exports = {
  name: 'Stripe',
  description: 'Element to be shown usually at the top of screen containing useful information - feedback about the completion of an async process, for example.',
  properties: [
    {
      name: 'theme',
      type: 'String',
      values: 'warning, danger, success'
    },
    {
      name: 'trigger-text',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'on-trigger-click',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'on-close',
      type: 'Function',
      values: 'Any'
    }
  ],
  examples: [
    {
      title: 'Default Stripe',
      template: `
      <t-stripe>
        Welcome onboard!
      </t-stripe>
      `
    },
    {
      title: 'Stripe theme',
      template: `
      <t-row>
        <t-col md="4">
          <t-stripe theme="warning">
            We found security vulnerabilities.
          </t-stripe>
        </t-col>
        <t-col md="4">
          <t-stripe theme="danger">
            Sorry, something went wrong.
          </t-stripe>
        </t-col>
        <t-col md="4">
          <t-stripe theme="success">
            You’re all set up!
          </t-stripe>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Stripe trigger',
      controller: {
        methods: {
          viewVulnerabilities(){
            alert('Clicked on "View Vulnerabilities"!');
          },
          retry(){
            alert('Clicked on "Retry"!');
          },
          viewProfile(){
            alert('Clicked on "View Profile"!');
          }
        }
      },
      template: `
      <t-row>
        <t-col md="4">
          <t-stripe
            theme="warning"
            trigger-text="See Vulnerabilities"
            :on-trigger-click="viewVulnerabilities"
          >
            We found security vulnerabilities.
          </t-stripe>
        </t-col>
        <t-col md="4">
          <t-stripe
            theme="danger"
            trigger-text="Retry"
            :on-trigger-click="retry"
          >
            Sorry, something went wrong.
          </t-stripe>
        </t-col>
        <t-col md="4">
          <t-stripe
            theme="success"
            trigger-text="View Profile"
            :on-trigger-click="viewProfile"
          >
            You’re all set up!
          </t-stripe>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Stripe close listener',
      description: 'You can optionally execute some action at the moment user closes a Stripe.',
      controller: {
        methods: {
          onClose(){
            alert('Clicked on "Close Button"!');
          }
        }
      },
      template: `
      <t-stripe theme="danger" :on-close="onClose">
        Sorry, something went wrong.
      </t-stripe>
      `
    }
  ]
};
