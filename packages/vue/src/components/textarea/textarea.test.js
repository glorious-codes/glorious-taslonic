import { run } from '@base/tests/textarea';
import { customRender, screen, waitFor, stringifyAttributes } from '@vue/services/testing/testing';
import { tTextarea } from '@vue/';

function mount({
  value,
  placeholder,
  validations,
  readonly,
  block,
  required,
  disabled,
  ...rest
} = {}){
  return customRender({
    components: { tTextarea },
    data(){
      return {
        value,
        placeholder,
        validations,
        readonly,
        block,
        required,
        disabled
      };
    },
    template: `
      <t-textarea
        v-model="value"
        :placeholder="placeholder"
        :validations="validations"
        :readonly="readonly"
        :block="block"
        :required="required"
        :disabled="disabled"
        ${stringifyAttributes(rest)}
      />`
  });
}

run(mount, { screen, waitFor });
