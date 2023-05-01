import userEvent from '@testing-library/user-event';

const _public = {};

_public.simulateKeydown = simulateKeydown;

async function pause(timeout){
  await new Promise(resolve => setTimeout(resolve, timeout));
}

function simulateKeydown(keyCode){
  const evt = document.createEvent('Event');
  evt.keyCode = keyCode;
  evt.initEvent('keydown');
  document.dispatchEvent(evt);
}

function stringifyAttributes(obj){
  return Object.entries(obj).map(([key, value]) => `${key}="${value}"`).join(' ');
}

function expectFirstChild({ container }){
  return expect(container.firstChild);
}

function expectFirstGrandChild({ container }){
  return expect(container.firstChild.firstChild);
}

async function setRangeInputValue(waitFor, input, value){
  await waitFor(() => {
    input.dispatchEvent(new Event('click'));
  });
  input.value = value;
  await waitFor(() => {
    input.dispatchEvent(new Event('input'));
  });
}

export {
  _public as default,
  expectFirstChild,
  expectFirstGrandChild,
  pause,
  setRangeInputValue,
  simulateKeydown,
  stringifyAttributes,
  userEvent
};
