module.exports = {
  name: 'Textarea',
  description: 'Abstration of a native textarea.',
  properties: [
    {
      name: 'v-model',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'placeholder',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'name',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'cols',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'rows',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'validations',
      type: 'Array',
      values: '[{ isValid: <Boolean> Function, errorMessage: String }]'
    },
    {
      name: 'block',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'autofocus',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'readonly',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'required',
      type: 'Boolean',
      values: 'any'
    }
  ],
  examples: [
    {
      title: 'Default Textarea',
      template: `
      <t-textarea />
      `
    },
    {
      title: 'Textarea with model',
      controller: {
        data(){
          return {
            bio: ''
          };
        }
      },
      template: `
      <t-row vertical-align="middle">
        <t-col md="6">
          <t-textarea v-model="bio" placeholder="Tell us a bit about you..." block />
        </t-col>
        <t-col md="6" v-if="bio">
          Bio: {{ bio }}
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Textarea with placeholder',
      template: `
      <t-textarea placeholder="Type anything..." />
      `
    },
    {
      title: 'Textarea with name',
      template: `
      <t-textarea name="bio" />
      `
    },
    {
      title: 'Textarea with cols and rows',
      template: `
      <t-textarea cols="15" rows="2" />
      `
    },
    {
      title: 'Textarea with validations',
      controller: {
        data(){
          return {
            validations: [{
              isValid: data => (!data || data.length <= 140),
              errorMessage: 'Enter a content no longer than 140 chars'
            }]
          };
        }
      },
      template: `
      <t-textarea :validations="validations" cols="25" rows="8" />
      `
    },
    {
      title: 'Block Textarea',
      description: 'Block property makes textareas behave like a block.',
      template: `
      <t-row>
        <t-col md="6">
          <t-textarea block />
        </t-col>
        <t-col md="6">
          <t-textarea block />
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Textarea with autofocus',
      template: `
      <t-textarea autofocus />
      `
    },
    {
      title: 'Textarea read-only',
      template: `
      <t-textarea readonly value="Taslonic" />
      `
    },
    {
      title: 'Disabled Textarea',
      template: `
      <t-textarea disabled />
      `
    },
    {
      title: 'Required Textarea',
      template: `
      <t-textarea required />
      `
    },
    {
      title: 'Listening Textarea changes',
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
      <t-row vertical-align="middle">
        <t-col md="6">
          <t-textarea @blur="count" block />
        </t-col>
        <t-col md="6" v-if="counter">
          Blurred {{ counter }}x
        </t-col>
      </t-row>
      `
    }
  ]
};
