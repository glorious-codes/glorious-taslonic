module.exports = {
  name: 'Button',
  description: 'Abstraction of a native button',
  properties: [
    {
      name: 'blocked',
      type: 'Boolean, String',
      values: 'true, false'
    },
    {
      name: 'theme',
      type: 'String',
      values: 'primary, secondary'
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
      title: 'Button blocked',
      description: 'Blocked buttons behave like a block.',
      template: `
      <t-row>
        <t-col sm="6">
          <t-button blocked>
            Blocked Button
          </t-button>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Button theme',
      template: `
      <t-row>
        <t-col xs="6" sm="3">
          <t-button theme="primary" blocked>
            Primary
          </t-button>
        </t-col>
        <t-col xs="6" sm="3">
          <t-button theme="secondary" blocked>
            Secondary
          </t-button>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Button disabled',
      template: `
      <t-row>
        <t-col sm="3">
          <t-button theme="primary" blocked disabled>
            Primary
          </t-button>
        </t-col>
        <t-col sm="3">
          <t-button theme="secondary" blocked disabled>
            Secondary
          </t-button>
        </t-col>
        <t-col sm="3">
          <t-button blocked disabled>
            Default
          </t-button>
        </t-col>
      </t-row>
      `
    }
  ]
};
