import { tAlert } from '@vue/components/alert/alert';
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
    content: buildAlert({
      content,
      dismissButtonText,
      onDismiss: () => handleCallbackOption(onDismiss, dialog.close)
    }),
    name: 'alert',
    hideCloseButton: true
  });
};

function buildAlert({ content = '', dismissButtonText, onDismiss }){
  return {
    components: { tAlert },
    data(){
      return { content, dismissButtonText, onDismiss };
    },
    template: `
      <t-alert
        :dismissButtonText="dismissButtonText"
        :onDismiss="onDismiss"
        :content="content"
      >
      </t-alert>
    `
  };
}

function handleCallbackOption(callback, closeDialog){
  callback && callback();
  closeDialog();
}

export default _public;
