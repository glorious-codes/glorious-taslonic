const _public = {};

_public.simulateKeydown = keyCode => {
  const evt = document.createEvent('Event');
  evt.keyCode = keyCode;
  evt.initEvent('keydown');
  document.dispatchEvent(evt);
};

export default _public;
