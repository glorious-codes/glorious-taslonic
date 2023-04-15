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
      values: 'color, date, datetime-local, email, file, hidden, number, password, range, search, tel, text, time, url'
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
      values: 'any'
    },
    {
      name: 'readonly',
      type: 'Boolean',
      values: 'any'
    },
    {
      name: 'block',
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
      title: 'Input with type',
      description: 'If you not pass a type, it will be set as text.',
      template: `
      <div>
        <t-row>
          <t-col md="4">
            <t-input type="search" placeholder="Search" aria-label="search" block />
          </t-col>
          <t-col md="4">
            <t-input type="password" placeholder="Password" aria-label="password" block />
          </t-col>
          <t-col md="4">
            <t-input type="number" placeholder="Number" aria-label="number" block />
          </t-col>
        </t-row>
        <t-row>
          <t-col md="4">
            <t-input type="email" placeholder="Email" aria-label="email" block />
          </t-col>
          <t-col md="4">
            <t-input type="url" placeholder="URL" aria-label="url" block />
          </t-col>
          <t-col md="4">
            <t-input type="tel" placeholder="Phone" aria-label="phone" block />
          </t-col>
        </t-row>
        <t-row>
          <t-col md="4">
            <t-input type="file" aria-label="File" block />
          </t-col>
          <t-col md="4">
            <t-input type="range" value="90" min="0" max="100" aria-label="range" block />
          </t-col>
          <t-col md="4">
            <t-input type="color" value="#6772FF" aria-label="color" block />
          </t-col>
        </t-row>
        <t-row>
          <t-col md="4">
            <t-input type="datetime-local" aria-label="date and time" block />
          </t-col>
          <t-col md="4">
            <t-input type="date" aria-label="date" block />
          </t-col>
          <t-col md="4">
            <t-input type="time" aria-label="time" block />
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
              errorMessage: 'Please, enter a funnier one'
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
      title: 'Input with custom file validations',
      description: 'You can read the selected files by inspecting the event passed as second argument to the validation function.',
      controller: {
        data(){
          return {
            validations: [{
              isValid: (data, evt) => (!data || evt.target.files[0].size <= 2048),
              errorMessage: 'File must not exceed 2kb'
            }]
          };
        }
      },
      template: `
      <t-row>
        <t-col md="4">
          <t-input type="file" :validations="validations" block />
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
