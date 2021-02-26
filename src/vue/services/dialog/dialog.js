import { tDialog } from '@vue/components/dialog/dialog';
import dialogService from '@base/services/dialog/dialog';
import componentBuilder from '@vue/builders/component/component';

const _public = {};

_public.open = ({ title, width, onClose, content, name, hideCloseButton } = {}) => {
  const wrapper = dialogService.buildWrapper(name);
  const { vm, element } = buildDialog({ wrapper, title, width, onClose, hideCloseButton });
  const dialogContent = buildDialogContent(content);
  wrapper.appendChild(appendDialogContent(element, dialogContent));
  return {
    close: () => {
      if(dialogContent.vm) dialogContent.vm.$destroy();
      destroy(vm, wrapper, onClose);
    }
  };
};

function buildDialog({ wrapper, title, width, onClose, hideCloseButton }) {
  return componentBuilder.build({
    controller: {
      components: { tDialog },
      data(){
        return { title, width, hideCloseButton };
      },
      methods: {
        onCloseDialog(){
          destroy(this, wrapper, onClose);
        }
      }
    },
    template: `
    <t-dialog
      :title="title"
      :width="width"
      :on-close="onCloseDialog"
      :hideCloseButton="hideCloseButton">
    </t-dialog>`
  });
}

function appendDialogContent(dialog, dialogContent){
  dialog.querySelector('[data-dialog-content]').appendChild(dialogContent.element);
  return dialog;
}

function buildDialogContent(content = ''){
  if(typeof content == 'string') return buildContentElementFromString(content);
  return componentBuilder.build(structureContent(content));
}

function buildContentElementFromString(content){
  const element = document.createElement('div');
  element.innerHTML = content;
  return { element };
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
