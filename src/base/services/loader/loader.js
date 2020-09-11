import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({ theme } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  propBasedCssClassService.handleProp(
    theme,
    isValidTheme,
    cssClasses,
    baseCssClass
  );
  return cssClasses.join(' ');
};

_public.buildAnimatedElements = () => {
  return [buildElement(), buildElement(), buildElement()];
};

function buildElement(){
  const element = document.createElement('span');
  element.setAttribute('class', `${getBaseCssClass()}-item`);
  return element;
}

function isValidTheme(theme){
  return ['light'].includes(theme);
}

function getBaseCssClass(){
  return 't-loader';
}

export default _public;
