import userEvent from '@testing-library/user-event';

const _public = {};

_public.simulateKeydown = simulateKeydown;

async function pause(){
  await new Promise(resolve => setTimeout(resolve));
}

function simulateKeydown(keyCode){
  const evt = document.createEvent('Event');
  evt.keyCode = keyCode;
  evt.initEvent('keydown');
  document.dispatchEvent(evt);
}

function stringifyAttributes(obj){
  return Object.entries(obj).map(([key, value]) => `${key}=${value}`).join(' ');
}

function expectFirstChild({ container }){
  return expect(container.firstChild);
}

export {
  _public as default,
  expectFirstChild,
  pause,
  stringifyAttributes,
  simulateKeydown,
  userEvent
};
