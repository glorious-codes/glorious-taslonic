const _public = {};

const CUSTOM_ATTR = 'data-toaster';
const BASE_CSS_CLASS = 't-toaster';

_public.pop = toastEl => {
  const toasterEl = getToaster();
  prependToast(toastEl, toasterEl);
};

function getToaster(){
  const container = document.querySelector(`[${CUSTOM_ATTR}]`);
  return container ? container : buildToaster();
}

function buildToaster(){
  const toaster = document.createElement('div');
  toaster.classList.add(BASE_CSS_CLASS);
  toaster.setAttribute(CUSTOM_ATTR, '');
  document.body.append(toaster);
  return toaster;
}

function prependToast(toastEl, toasterEl){
  const { firstChild } = toasterEl;
  return firstChild ? toasterEl.insertBefore(toastEl, firstChild) : toasterEl.appendChild(toastEl);
}

export default _public;
