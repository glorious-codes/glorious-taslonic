module.exports = {
  name: 'Select',
  description: 'Abstration of a native select.',
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
      name: 'validations',
      type: 'Array',
      values: '[{ isValid: <Boolean> Function, errorMessage: String }]'
    },
    {
      name: 'block',
      type: 'Boolean',
      values: 'true, false'
    },
    {
      name: 'autofocus',
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
      title: 'Default Select',
      template: `
      <t-select>
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
      </t-select>
      `
    },
    {
      title: 'Select with placeholder',
      template: `
      <t-select placeholder="Select">
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
      </t-select>
      `
    },
    {
      title: 'Select with name',
      template: `
      <t-select name="fruit">
        <option value="">Select</option>
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
      </t-select>
      `
    },
    {
      title: 'Select with model',
      controller: {
        data(){
          return {
            fruit: null
          };
        }
      },
      template: `
      <div>
        <t-row vertical-align="middle">
          <t-col md="3">
            <t-select v-model="fruit" placeholder="Select">
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="banana">Banana</option>
            </t-select>
          </t-col>
          <t-col md="3" v-if="fruit !== null">
            Fruit: {{ fruit }}
          </t-col>
        </t-row>
      </div>
      `
    },
    {
      title: 'Select with custom validations',
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
      <t-select :validations="validations" placeholder="Select">
        <option value="java">Java</option>
        <option value="javascript">Javascript</option>
        <option value="go">Go</option>
      </t-select>
      `,
      styles: `
        p-external-component-examples-list p-list-item:nth-child(4) .t-form-control { max-width: 100%; }
        p-external-component-examples-list p-list-item:nth-child(4) select { width: 200px; max-width: 100%; }
      `
    },
    {
      title: 'Block Select',
      description: 'Block property makes selects behave like a block.',
      template: `
      <t-row>
        <t-col md="4">
          <t-select placeholder="Select" block>
            <option value="apple">Apple</option>
            <option value="orange">Orange</option>
            <option value="banana">Banana</option>
          </t-select>
        </t-col>
        <t-col md="4">
          <t-select placeholder="Select" block>
            <option value="rock">Rock</option>
            <option value="punk">Punk</option>
            <option value="samba">Samba</option>
          </t-select>
        </t-col>
        <t-col md="4">
          <t-select placeholder="Select" block>
            <option value="football">Football</option>
            <option value="basketball">Basketball</option>
            <option value="baseboll">Baseboll</option>
          </t-select>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Select with autofocus',
      template: `
      <t-select placeholder="Select" autofocus>
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
      </t-select>
      `
    },
    {
      title: 'Disabled Select',
      template: `
      <t-select placeholder="Select" disabled>
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
      </t-select>
      `
    },
    {
      title: 'Required Select',
      template: `
      <t-select placeholder="Select" required>
        <option value="apple">Apple</option>
        <option value="orange">Orange</option>
        <option value="banana">Banana</option>
      </t-select>
      `
    },
    {
      title: 'Listening Select changes',
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
            <t-select @blur="count" placeholder="Select" block>
              <option value="apple">Apple</option>
              <option value="orange">Orange</option>
              <option value="banana">Banana</option>
            </t-select>
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
