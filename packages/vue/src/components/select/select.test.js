import { run } from '@base/tests/select';
import { customRender, screen, waitFor, stringifyAttributes } from '@vue/services/testing/testing';
import { tSelect } from '@vue/';

function mount({ placeholder, validations, block, required, disabled, content = '', ...rest } = {}){
  return customRender({
    components: { tSelect },
    data(){
      return {
        placeholder,
        validations,
        block,
        required,
        disabled,
        content
      };
    },
    template: `
      <t-select
        :placeholder="placeholder"
        :validations="validations"
        :block="block"
        :required="required"
        :disabled="disabled"
        ${stringifyAttributes(rest)}
      >
        ${content}
      </t-select>`
  });
}

function buildOptions(opts){
  return opts.map(value => (
    `<option value="${value}">${value}</option>`
  )).join('');
}

run(mount, { screen, waitFor, buildOptions });
