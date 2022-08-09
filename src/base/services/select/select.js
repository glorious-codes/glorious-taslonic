import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildWrapperCssClasses = ({ disabled, multiple } = {}) => {
  const wrapperBaseCssClass = getWrapperBaseCssClass();
  const cssClasses = [wrapperBaseCssClass];
  propBasedCssClassService.handleBooleanProps(
    { disabled, multiple },
    isValidBooleanProp,
    cssClasses,
    wrapperBaseCssClass
  );
  return cssClasses.join(' ');
};

function getWrapperBaseCssClass(){
  return 't-select-wrapper';
}

function isValidBooleanProp(propName){
  return ['disabled', 'multiple'].includes(propName);
}

export default _public;
