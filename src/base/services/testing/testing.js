import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
export * from '@testing-library/react';

const _public = {};

_public.simulateKeydown = simulateKeydown;

export const customRender = component => {
  return {
    userEvent,
    ...render(component)
  };
};

function simulateKeydown (keyCode){
  const evt = document.createEvent('Event');
  evt.keyCode = keyCode;
  evt.initEvent('keydown');
  document.dispatchEvent(evt);
}

export { _public as default, simulateKeydown };
