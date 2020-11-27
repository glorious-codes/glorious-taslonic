const _public = {};

_public.build = id => {
  const container = getContainer(id);
  return container;
};

function getContainer(id = 'floating-container'){
  const container = document.querySelector(`[${getContainerCustomAttrName(id)}]`);
  return container ? container : buildContainer(id);
}

function buildContainer(id){
  const container = document.createElement('div');
  container.classList.add(`t-${id}`);
  container.setAttribute(getContainerCustomAttrName(id), '');
  document.body.append(container);
  return container;
}

function getContainerCustomAttrName(id){
  return `data-${id}`;
}

export default _public;
