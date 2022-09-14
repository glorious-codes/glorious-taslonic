import { run } from '@base/tests/field';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tField, tInput } from '@vue/';

function mount({ content, label, block, required, ...rest } = {}){
  return customRender({
    components: { tField, tInput },
    data(){
      return {
        label,
        block,
        required
      };
    },
    template: `
      <t-field
        :label="label"
        :block="block"
        :required="required"
        ${stringifyAttributes(rest)}
      >
        ${content}
      </t-field>
    `
  });
}

function buildContentMarkup({ required } = {}){
  return `<t-input :required="${required}" />`;
}

run(mount, { screen, buildContentMarkup });
