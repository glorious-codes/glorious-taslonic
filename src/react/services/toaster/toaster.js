import React from 'react';
import toasterService from '@base/services/toaster/toaster';
import componentBuilder from '@react/builders/component/component';
import { Toast } from '@react/components/toast/toast';

const _public = {};

_public.pop = ({ title, message, theme }) => {
  buildToastElement(title, message, theme, toastEl => {
    toasterService.pop(toastEl);
  });
};

function buildToastElement(title, message, theme, onBuild){
  const container = buildContainer();
  componentBuilder.build(
    <Toast
      title={title}
      message={message}
      theme={theme}
      onClose={() => onClose(container)}
    />,
    container,
    onBuild
  );
  setTimeout(() => onClose(container), 5000);
}

function buildContainer(){
  return document.createElement('div');
}

function onClose(container){
  componentBuilder.destroy(container);
  container && container.remove();
}

export default _public;
