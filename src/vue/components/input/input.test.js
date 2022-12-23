import { run } from '@base/tests/input';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tInput } from '@vue/';

function mount({
  value,
  placeholder,
  type,
  validations,
  readonly,
  block,
  required,
  disabled,
  ...rest
} = {}){
  return customRender({
    components: { tInput },
    data(){
      return {
        value,
        placeholder,
        type,
        validations,
        readonly,
        block,
        required,
        disabled
      };
    },
    methods: {
      updateData(attr, newValue){
        this[attr] = newValue;
      }
    },
    template: `
      <div>
        <t-input
          v-model="value"
          :placeholder="placeholder"
          :type="type"
          :validations="validations"
          :readonly="readonly"
          :block="block"
          :required="required"
          :disabled="disabled"
          ${stringifyAttributes(rest)}
        />
        <button @click="() => updateData('required', !required)">toggle required</button>
        <button @click="() => updateData('disabled', !disabled)">toggle disabled</button>
        <button @click="() => updateData('value', 'Fernando')">update value</button>
        <button @click="() => updateData('validations', [])">remove custom validations</button>
      </div>`
  });
}

run(mount, { screen });
