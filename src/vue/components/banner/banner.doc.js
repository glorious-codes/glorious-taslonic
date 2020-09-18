module.exports = {
  name: 'Banner',
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
      title: 'Default Banner',
      template: `
      <t-banner>
        Welcome onboard!
      </t-banner>
      `
    },
    {
      title: 'Banner theme',
      template: `
      <t-row>
        <t-col md="4">
          <t-banner theme="warning">
            We found security vulnerabilities.
          </t-banner>
        </t-col>
        <t-col md="4">
          <t-banner theme="danger">
            Sorry, something went wrong.
          </t-banner>
        </t-col>
        <t-col md="4">
          <t-banner theme="success">
            You’re all set up!
          </t-banner>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Banner trigger',
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
          <t-banner
            theme="warning"
            trigger-text="See Vulnerabilities"
            :on-trigger-click="viewVulnerabilities"
          >
            We found security vulnerabilities.
          </t-banner>
        </t-col>
        <t-col md="4">
          <t-banner
            theme="danger"
            trigger-text="Retry"
            :on-trigger-click="retry"
          >
            Sorry, something went wrong.
          </t-banner>
        </t-col>
        <t-col md="4">
          <t-banner
            theme="success"
            trigger-text="View Profile"
            :on-trigger-click="viewProfile"
          >
            You’re all set up!
          </t-banner>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Banner close listener',
      description: 'You can optionally execute some action at the moment user closes a Banner.',
      controller: {
        methods: {
          onClose(){
            alert('Clicked on "Close Button"!');
          }
        }
      },
      template: `
      <t-banner theme="danger" :on-close="onClose">
        Sorry, something went wrong.
      </t-banner>
      `
    }
  ]
};
