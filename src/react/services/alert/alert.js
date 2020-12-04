import React from 'react';
import { Alert } from '@react/components/alert/alert';
import dialogService from '@react/services/dialog/dialog';

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
    content: (
      <Alert
        dismissButtonText={ dismissButtonText }
        onDismiss={() => handleCallbackOption(onDismiss, dialog.close)}>
        { content }
      </Alert>
    ),
    name: 'alert',
    hideCloseButton: true
  });
};

function handleCallbackOption(callback, closeDialog){
  callback && callback();
  closeDialog();
}

export default _public;
