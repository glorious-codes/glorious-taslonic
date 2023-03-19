import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({ size } = {}) => {
  const { handleProp } = propBasedCssClassService;
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  handleProp(size, isValidSize, cssClasses, baseCssClass);
  return cssClasses.join(' ');
};

function isValidSize(size){
  return ['sm','lg'].includes(size);
}

function getBaseCssClass(){
  return 't-container';
}

export default _public;
