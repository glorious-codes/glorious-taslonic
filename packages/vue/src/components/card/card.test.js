import { run } from '@base/tests/card';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tCard } from '@vue/';

function mount({ content, title, titleTagName, ...rest } = {}){
  return customRender({
    components: { tCard },
    data(){
      return {
        title,
        titleTagName
      };
    },
    template: `
      <t-card
        :title="title"
        :title-tag-name="titleTagName"
        ${stringifyAttributes(rest)}
      >
        ${content}
      </t-card>
    `
  });
}

run(mount, { screen });
