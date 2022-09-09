import { run } from '@base/tests/button';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tButton } from '@vue/';

function mount({ content, block, tag, theme, ...rest } = {}){
  return customRender({
    components: { tButton },
    data(){
      return {
        block,
        tag,
        theme
      };
    },
    template: `
      <t-button
        :theme="theme"
        :block="block"
        :tag="tag"
        ${stringifyAttributes(rest)}
      >
        ${content}
      </t-button>
    `
  });
}

run(mount, { screen });
