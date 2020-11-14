import React from 'react';
import { Dialog } from '@react/components/dialog/dialog';
import dialogService from '@base/services/dialog/dialog';
import componentBuilder from '@react/builders/component/component';

const _public = {};

_public.open = ({ title, width, onClose, content } = {}) => {
  const wrapper = dialogService.buildWrapper();
  const dialog = buildDialog({ wrapper, title, width, onClose, content });
  componentBuilder.build(dialog, wrapper);
  return { close: () => destroy(wrapper, onClose) };
};

function buildDialog({ wrapper, title, width, onClose, content }) {
  return (
    <Dialog title={ title } width={ width } onClose={ () => destroy(wrapper, onClose) }>
      { content }
    </Dialog>
  );
}

function destroy(wrapper, onClose) {
  componentBuilder.destroy(wrapper);
  dialogService.destroy(wrapper);
  onClose && onClose();
}

export default _public;
