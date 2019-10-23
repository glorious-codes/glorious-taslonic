const _public = {};

_public.mount = (Component, { attributes, content } = {}) => {
  const component = new Component();
  stubAttributes(component, attributes);
  handleContent(component, content);
  component.connectedCallback();
  return component;
};

function stubAttributes(component, attributes = {}){
  component.getAttribute = jest.fn(attr => attributes[attr]);
}

function handleContent(component, content){
  if(content)
    component.innerHTML = content;
}

export default _public;
