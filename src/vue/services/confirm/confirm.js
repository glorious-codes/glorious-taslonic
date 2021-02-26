import { tConfirm } from '@vue/components/confirm/confirm';
import dialogService from '@vue/services/dialog/dialog';

const _public = {};

_public.open = ({
  title,
  width = '400px',
  content,
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm
} = {}) => {
  const dialog = dialogService.open({
    title,
    width,
    content: buildConfirm({
      content,
      cancelButtonText,
      confirmButtonText,
      onCancel: () => handleCallbackOption(onCancel, dialog.close),
      onConfirm: () => handleCallbackOption(onConfirm, dialog.close)
    }),
    name: 'confirm',
    hideCloseButton: true
  });
};

function buildConfirm({ content, cancelButtonText, confirmButtonText, onCancel, onConfirm }){
  return {
    components: { tConfirm },
    data(){
      return { cancelButtonText, confirmButtonText, onCancel, onConfirm };
    },
    template: `
    <t-confirm
      :cancelButtonText="cancelButtonText"
      :confirmButtonText="confirmButtonText"
      :onCancel="onCancel"
      :onConfirm="onConfirm">
      ${content}
    </t-confirm>`
  };
}

function handleCallbackOption(callback, closeDialog){
  callback && callback();
  closeDialog();
}

export default _public;
