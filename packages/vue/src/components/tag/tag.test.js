import { run } from '@base/tests/tag';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tTag } from '@vue/';

function mount({ content, theme, ...rest } = {}){
  return customRender({
    components: { tTag },
    data(){
      return {
        theme
      };
    },
    template: `
      <t-tag :theme="theme" ${stringifyAttributes(rest)}>
        ${content}
      </t-tag>
    `
  });
}

run(mount, { screen });
