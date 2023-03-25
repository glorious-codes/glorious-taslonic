import React from 'react';
import { Confirm } from '@react/components/confirm/confirm';
import dialogService from '@react/services/dialog/dialog';

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
    content: (
      <Confirm
        cancelButtonText={cancelButtonText}
        confirmButtonText={confirmButtonText}
        onCancel={() => handleCallbackOption(onCancel, dialog.close)}
        onConfirm={() => handleCallbackOption(onConfirm, dialog.close)}>
        { content }
      </Confirm>
    ),
    name: 'confirm',
    hideCloseButton: true
  });
};

function handleCallbackOption(callback, closeDialog){
  callback && callback();
  closeDialog();
}

export default _public;
