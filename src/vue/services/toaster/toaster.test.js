import { run } from '@base/tests/toaster';
import { customRender, screen } from '@vue/services/testing/testing';
import { toaster } from '@vue/';

function mount(confirmOptions){
  return customRender({
    methods: {
      pop(){
        toaster.pop(confirmOptions);
      }
    },
    template: '<button @click="pop">Pop toast</button>'
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
      <span :title="title">
        {{ paragraph }}
      </span>
    `
  };
}

run(mount, { screen, buildContentMarkup });
