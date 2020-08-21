import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({ theme, blocked } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  propBasedCssClassService.handleProp(theme, isValidTheme, cssClasses, baseCssClass);
  propBasedCssClassService.handleBooleanProp({ blocked }, isValidBooleanProp, cssClasses, baseCssClass);
  return cssClasses.join(' ');
};

function isValidTheme(theme){
  return ['primary','secondary'].includes(theme);
}

function isValidBooleanProp(propName){
  return ['blocked'].includes(propName);
}

function getBaseCssClass(){
  return 't-button';
}

export default _public;
