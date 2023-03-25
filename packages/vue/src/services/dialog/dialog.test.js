import { run } from '@base/tests/dialog';
import { customRender, screen } from '@vue/services/testing/testing';
import { dialog } from '@vue/';

function mount(dialogOptions){
  return customRender({
    data(){
      return {
        openDialog: null
      };
    },
    methods: {
      open(){
        this.setOpenDialog(dialog.open(dialogOptions));
      },
      close(){
        this.openDialog.close();
      },
      setOpenDialog(openDialog){
        this.openDialog = openDialog;
      }
    },
    template: `
      <div>
        <button @click="open">Open dialog</button>
        <button @click="close">Close dialog</button>
      </div>
    `
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
