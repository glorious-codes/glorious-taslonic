import { dialog } from '@vue/components/dialog/dialog';
import dialogService from '@base/services/dialog/dialog';
import componentBuilder from '@vue/builders/component/component';

const _public = {};

_public.open = ({ title, width, onClose, content } = {}) => {
  const wrapper = dialogService.buildWrapper();
  const { vm, element } = buildDialog({ wrapper, title, width, onClose });
  const dialogEl = appendDialogContent(element, buildDialogContent(content));
  wrapper.appendChild(dialogEl);
  return { close: () => destroy(vm, wrapper, onClose) };
};

function buildDialog({ wrapper, title, width, onClose }) {
  return componentBuilder.build({
    controller: {
      components: {
        tDialog: dialog
      },
      data(){
        return { title, width };
      },
      methods: {
        onCloseDialog(){
          destroy(this, wrapper, onClose);
        }
      }
    },
    template: '<t-dialog :title="title" :width="width" :on-close="onCloseDialog"></t-dialog>'
  });
}

function appendDialogContent(dialog, dialogContent){
  dialog.querySelector('[data-dialog-content]').appendChild(dialogContent);
  return dialog;
}

function buildDialogContent(content = ''){
  if(typeof content == 'string') return buildContentElementFromString(content);
  return componentBuilder.build(structureContent(content)).element;
}

function buildContentElementFromString(content){
  const element = document.createElement('div');
  element.innerHTML = content;
  return element;
}

function structureContent({ template, ...rest }){
  return { controller: rest, template };
}

function destroy(vm, wrapper, onClose) {
  vm.$destroy();
  dialogService.destroy(wrapper);
  onClose && onClose();
}

export default _public;
