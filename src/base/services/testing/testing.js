import userEvent from '@testing-library/user-event';

const _public = {};

_public.simulateKeydown = simulateKeydown;

function simulateKeydown (keyCode){
  const evt = document.createEvent('Event');
  evt.keyCode = keyCode;
  evt.initEvent('keydown');
  document.dispatchEvent(evt);
}

export { _public as default, simulateKeydown, userEvent };
