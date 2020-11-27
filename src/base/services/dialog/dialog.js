import floatingContainerService from '@base/services/floating-container/floating-container';

const _public = {};

_public.buildWrapper = name => {
  const container = floatingContainerService.build();
  const wrapper = buildWrapper(name);
  container.appendChild(wrapper);
  preventBodyScroll();
  return wrapper;
};

_public.destroy = wrapper => {
  setTimeout(() => {
    if(hasOnlyOneDialogOpen(wrapper)) releaseBodyScroll();
    wrapper.remove();
  });
};

function buildWrapper(name = 'dialog') {
  const wrapper = document.createElement('div');
  const wrapperFullName = `${name}-wrapper`;
  wrapper.setAttribute(`data-${wrapperFullName}`, '');
  wrapper.classList.add(`t-${wrapperFullName}`);
  return wrapper;
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

function hasOnlyOneDialogOpen(wrapper){
  return wrapper.parentElement.children.length === 1;
}

export default _public;
