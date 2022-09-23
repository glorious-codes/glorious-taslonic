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
    template: `
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
      />`
  });
}

run(mount, { screen });
