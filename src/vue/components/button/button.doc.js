module.exports = {
  name: 'Button',
  description: 'Abstraction of a native button.',
  properties: [
    {
      name: 'block',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'tag',
      type: 'String',
      values: 'a'
    },
    {
      name: 'theme',
      type: 'String',
      values: 'primary, secondary, lookless'
    }
  ],
  examples: [
    {
      title: 'Default Button',
      template: `
      <t-row>
        <t-col>
          <t-button>
            Default Button
          </t-button>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Block Button',
      description: 'Block property makes buttons behave like a block.',
      template: `
      <t-row>
        <t-col sm="6">
          <t-button block>
            Blocked Button
          </t-button>
        </t-col>
        <t-col sm="6">
          <t-button tag="a" block>
            Blocked Button
          </t-button>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Button tag',
      description: 'You can optionally render a button as anchor.',
      template: `
      <t-row>
        <t-col sm="6">
          <t-button tag="a" href="https://github.com/glorious-codes/glorious-taslonic" target="_blank">
            Anchor Button
          </t-button>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Button theme',
      template: `
      <t-row vertical-align="middle">
        <t-col sm="4">
          <t-button theme="primary" block>
            Primary
          </t-button>
        </t-col>
        <t-col sm="4">
          <t-button theme="secondary" block>
            Secondary
          </t-button>
        </t-col>
        <t-col sm="4" align-xs="center">
          <t-button theme="lookless">
            Lookless
          </t-button>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Button disabled',
      template: `
      <t-row vertical-align="middle">
        <t-col sm="3">
          <t-button theme="primary" block disabled>
            Primary
          </t-button>
        </t-col>
        <t-col sm="3">
          <t-button theme="secondary" block disabled>
            Secondary
          </t-button>
        </t-col>
        <t-col sm="3">
          <t-button block disabled>
            Default
          </t-button>
        </t-col>
        <t-col sm="3" align-xs="center">
          <t-button theme="lookless" disabled>
            Lookless
          </t-button>
        </t-col>
      </t-row>
      `
    }
  ]
};
