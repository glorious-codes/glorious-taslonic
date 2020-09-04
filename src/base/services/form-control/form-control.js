import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({ errorMessage, blocked } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  handleInvalidCssClass(errorMessage, cssClasses, baseCssClass);
  propBasedCssClassService.handleBooleanProp(
    { blocked },
    isValidBooleanProp,
    cssClasses,
    baseCssClass
  );
  return cssClasses.join(' ');
};

function getBaseCssClass(){
  return 't-form-control';
}

function isValidBooleanProp(propName){
  return ['blocked'].includes(propName);
}

function handleInvalidCssClass(errorMessage, cssClasses, baseCssClass){
  if(errorMessage)
    cssClasses.push(`${baseCssClass}-invalid`);
  return cssClasses;
}

export default _public;
