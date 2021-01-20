module.exports = {
  name: 'Input',
  description: 'Abstration of a native input.',
  properties: [
    {
      name: 'v-model',
      type: 'String/Number',
      values: 'Any'
    },
    {
      name: 'type',
      type: 'String',
      values: 'email, number, password, search, tel, text, url'
    },
    {
      name: 'name',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'placeholder',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'validations',
      type: 'Array',
      values: '[{ isValid: <Boolean> Function, errorMessage: String }]'
    },
    {
      name: 'autofocus',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'readonly',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'block',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'required',
      type: 'Boolean',
      values: 'true, false'
    }
  ],
  examples: [
    {
      title: 'Default Input',
      template: `
      <t-input />
      `
    },
    {
      title: 'Input with model',
      controller: {
        data(){
          return {
            name: ''
          };
        }
      },
      template: `
      <div>
        <t-row vertical-align="middle">
          <t-col md="3">
            <t-input v-model="name" placeholder="Enter your name" block />
          </t-col>
          <t-col md="3" v-if="name">
            Name: {{ name }}
          </t-col>
        </t-row>
      </div>
      `
    },
    {
      title: 'Input with custom type',
      description: 'If you not pass a type, input type will be set as text by default.',
      template: `
      <div>
        <t-row>
          <t-col md="4">
            <t-input type="email" placeholder="Email" block />
          </t-col>
          <t-col md="4">
            <t-input type="number" placeholder="Number" block />
          </t-col>
          <t-col md="4">
            <t-input type="password" placeholder="Password" block />
          </t-col>
        </t-row>
        <t-row>
          <t-col md="4">
            <t-input type="search" placeholder="Search" block />
          </t-col>
          <t-col md="4">
            <t-input type="tel" placeholder="Phone" block />
          </t-col>
          <t-col md="4">
            <t-input type="url" placeholder="URL" block />
          </t-col>
        </t-row>
      </div>
      `
    },
    {
      title: 'Input with name',
      template: `
      <t-input name="city" />
      `
    },
    {
      title: 'Input with placeholder',
      template: `
      <t-input placeholder="Enter your name" />
      `
    },
    {
      title: 'Input with custom validations',
      description: 'Validations should be an Array of objects containing a function isValid that returns a Boolean and an errorMessage.',
      controller: {
        data(){
          return {
            validations: [{
              isValid: data => (!data || data.toLowerCase() == 'javascript'),
              errorMessage: 'Please, enter a cooler one'
            }]
          };
        }
      },
      template: `
      <t-row>
        <t-col md="4">
          <t-input :validations="validations" placeholder="Enter a programming language" block />
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Input with autofocus',
      template: `
      <t-input autofocus />
      `
    },
    {
      title: 'Input read-only',
      template: `
      <t-input readonly />
      `
    },
    {
      title: 'Input block',
      description: 'Block property makes inputs behave like a block.',
      template: `
      <t-row>
        <t-col sm="4">
          <t-input block />
        </t-col>
        <t-col sm="4">
          <t-input block />
        </t-col>
        <t-col sm="4">
          <t-input block />
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Disabled Input',
      template: `
      <t-input value="Rafael" disabled />
      `
    },
    {
      title: 'Required Input',
      template: `
      <t-input required />
      `
    },
    {
      title: 'Listening Input changes',
      controller: {
        data(){
          return {
            counter: 0
          };
        },
        methods: {
          count(){
            ++this.counter
          }
        }
      },
      template: `
      <div>
        <t-row vertical-align="middle">
          <t-col md="3">
            <t-input @blur="count" block />
          </t-col>
          <t-col md="3" v-if="counter">
            Blurred {{ counter }}x
          </t-col>
        </t-row>
      </div>
      `,
    }
  ]
};
