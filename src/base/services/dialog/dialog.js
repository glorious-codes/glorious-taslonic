import floatingContainerService from '@base/services/floating-container/floating-container';
import idService from '@base/services/id/id';

const _public = {};

_public.buildWrapper = () => {
  const container = floatingContainerService.build('dialog-container');
  const wrapper = buildWrapper(idService.generate());
  container.appendChild(wrapper);
  preventBodyScroll();
  return wrapper;
};

_public.destroy = wrapper => {
  setTimeout(() => {
    if(hasOnlyOneDialogOpen()) releaseBodyScroll();
    wrapper.remove();
  });
};

function buildWrapper(id) {
  const wrapper = document.createElement('div');
  wrapper.setAttribute(getWrapperCustomAttribute(), id);
  return wrapper;
}

function getWrapperCustomAttribute() {
  return 'data-dialog-wrapper';
}

function preventBodyScroll(){
  const cssClass = getOpenDialogCssClass();
  if(!bodyContainsCssClass(cssClass)) handleBodyCssClass('add', cssClass);
}

function releaseBodyScroll(){
  handleBodyCssClass('remove', getOpenDialogCssClass());
}

function getOpenDialogCssClass(){
  return 't-dialog-open';
}

function bodyContainsCssClass(cssClass){
  return document.body.classList.contains(cssClass);
}

function handleBodyCssClass(action, cssClass){
  document.body.classList[action](cssClass);
}

function hasOnlyOneDialogOpen(){
  const selector = `[${getWrapperCustomAttribute()}]`;
  return document.querySelectorAll(selector).length === 1;
}

export default _public;
