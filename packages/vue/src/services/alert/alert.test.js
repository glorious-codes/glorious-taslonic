import { run } from '@base/tests/alert';
import { customRender, screen } from '@vue/services/testing/testing';
import { alert } from '@vue/';

function mount(alertOptions){
  return customRender({
    methods: {
      open(){
        alert.open(alertOptions);
      }
    },
    template: '<button @click="open">Open alert</button>'
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
