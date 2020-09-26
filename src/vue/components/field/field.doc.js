module.exports = {
  name: 'Field',
  description: 'Container for form controls like input, select or textarea.',
  properties: [
    {
      name: 'label',
      type: 'String',
      values: 'Any',
      required: true
    },
    {
      name: 'required',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'blocked',
      type: 'Boolean',
      values: 'true, false'
    }
  ],
  examples: [
    {
      title: 'Default Field',
      template: `
      <t-field label="Name">
        <t-input />
      </t-field>
      `
    },
    {
      title: 'Required Field',
      description: 'If you pass a required form control to the field, it will automatically show an asterisk mark.',
      template: `
      <t-field label="Name">
        <t-input required />
      </t-field>
      `
    },
    {
      title: 'Dynamic Required Field',
      description: 'You can optionally control the asterisk mark visibility regardless of the form control passed to the field.',
      controller: {
        data(){
          return {
            required: true
          };
        },
        methods: {
          toggleRequired(){
            this.required = !this.required;
          }
        }
      },
      template: `
      <div>
        <t-row>
          <t-col>
            <t-field label="Name" :required="required">
              <t-input :required="required" />
            </t-field>
          </t-col>
        </t-row>
        <t-row>
          <t-col>
            <t-button @click="toggleRequired">
              Toggle Required
            </t-button>
          </t-col>
        </t-row>
      </div>
      `
    },
    {
      title: 'Blocked Field',
      description: 'Blocked fields behave like a block.',
      template: `
      <t-row>
        <t-col md="6">
          <t-field label="First Name" blocked>
            <t-input blocked />
          </t-field>
        </t-col>
        <t-col md="6">
          <t-field label="Last Name" blocked>
            <t-input blocked />
          </t-field>
        </t-col>
      </t-row>
      `
    }
  ]
};
