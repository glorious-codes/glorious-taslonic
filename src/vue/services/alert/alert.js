import { alert } from '@vue/components/alert/alert';
import dialogService from '@vue/services/dialog/dialog';

const _public = {};

_public.open = ({
  title,
  width = '400px',
  content,
  dismissButtonText,
  onDismiss
} = {}) => {
  const dialog = dialogService.open({
    title,
    width,
    content: buildConfirm({
      content,
      dismissButtonText,
      onDismiss: () => handleCallbackOption(onDismiss, dialog.close)
    }),
    name: 'alert',
    hideCloseButton: true
  });
};

function buildConfirm({ content, dismissButtonText, onDismiss }){
  return {
    components: {
      tAlert: alert
    },
    data(){
      return { dismissButtonText, onDismiss };
    },
    template: `
    <t-alert
      :dismissButtonText="dismissButtonText"
      :onDismiss="onDismiss">
      ${content}
    </t-alert>`
  };
}

function handleCallbackOption(callback, closeDialog){
  callback && callback();
  closeDialog();
}

export default _public;
