import { run } from '@base/tests/container';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tContainer } from '@vue/';

function mount({ content, size, ...rest } = {}){
  return customRender({
    components: { tContainer },
    data(){
      return {
        size
      };
    },
    template: `
      <t-container :size="size" ${stringifyAttributes(rest)}>
        ${content}
      </t-container>
    `
  });
}

run(mount, { screen });
