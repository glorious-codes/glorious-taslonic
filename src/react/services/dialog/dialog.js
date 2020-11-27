import React from 'react';
import { Dialog } from '@react/components/dialog/dialog';
import dialogService from '@base/services/dialog/dialog';
import componentBuilder from '@react/builders/component/component';

const _public = {};

_public.open = ({ title, width, onClose, content, name, hideCloseButton } = {}) => {
  const wrapper = dialogService.buildWrapper(name);
  const dialog = buildDialog({ wrapper, title, width, onClose, content, hideCloseButton });
  componentBuilder.build(dialog, wrapper);
  return { close: () => destroy(wrapper, onClose) };
};

function buildDialog({ wrapper, title, width, onClose, content, hideCloseButton }) {
  return (
    <Dialog
      title={ title }
      width={ width }
      hideCloseButton={hideCloseButton}
      onClose={ () => destroy(wrapper, onClose) }>
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
