import ReactDOM from 'react-dom';

const _public = {};

_public.build = (component, container, onBuild) => {
  ReactDOM.render(component, container, () => onBuild(container));
};

_public.destroy = container => {
  return ReactDOM.unmountComponentAtNode(container);
};

export default _public;
