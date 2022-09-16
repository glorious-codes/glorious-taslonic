import componentBuilder from '@vue/builders/component/component';

export const renderContent = (content, containerElement) => {
  const element = typeof content == 'object' ? buildComponent(content) : content;
  containerElement.prepend(element);
};

function buildComponent({ template, ...rest }){
  return componentBuilder.build({ controller: rest, template }).element;
}
