import floatingContainerService from '@base/services/floating-container/floating-container';

const _public = {};

_public.pop = toastEl => {
  const container = floatingContainerService.build('toaster');
  prependToast(container, toastEl);
};

function prependToast(container, toastEl){
  const { firstChild } = container;
  return firstChild ? container.insertBefore(toastEl, firstChild) : container.appendChild(toastEl);
}

export default _public;
