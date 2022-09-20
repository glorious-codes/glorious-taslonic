import { run } from '@base/tests/confirm';
import { customRender, screen } from '@vue/services/testing/testing';
import { confirm } from '@vue/';

function mount(confirmOptions){
  return customRender({
    methods: {
      open(){
        confirm.open(confirmOptions);
      }
    },
    template: '<button @click="open">Open confirm</button>'
  });
}

function buildContentMarkup({ title, paragraph }){
  return {
    data(){
      return {
        title,
        paragraph
      };
    },
    template: `
      <p :title="title">
        {{ paragraph }}
      </p>
    `
  };
}

run(mount, { screen, buildContentMarkup });
