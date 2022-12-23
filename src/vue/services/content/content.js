import componentBuilder from '@vue/builders/component/component';

export const renderContent = (content = '', containerElement) => {
  const render = getRendererByContentType(typeof content);
  render(content, containerElement);
};

function getRendererByContentType(type){
  return {
    'object': renderVueComponent,
    'string': renderStringContent
  }[type];
}

function renderStringContent(content, containerElement){
  const childNodes = parseStringContent(content);
  Array.from(childNodes).reverse().forEach(node => containerElement.prepend(node));
}

function parseStringContent(content){
  const rootEl = document.createElement('div');
  rootEl.innerHTML = content;
  return rootEl.childNodes;
}

function renderVueComponent({ template, ...rest }, containerElement){
  const { element } = componentBuilder.build({ controller: rest, template });
  containerElement.prepend(element);
}
