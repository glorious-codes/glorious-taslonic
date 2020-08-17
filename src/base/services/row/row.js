import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({ align, offset, verticalAlign } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  handleProps({ align, offset, verticalAlign }, cssClasses, baseCssClass);
  return cssClasses.join(' ');
};

function handleProps({ align, offset, verticalAlign }, cssClasses, baseCssClass){
  const { handleProp } = propBasedCssClassService;
  handleProp(align, isValidAlign, cssClasses, baseCssClass);
  handleProp(verticalAlign, isValidVerticalAlign, cssClasses, baseCssClass);
  handleProp(offset, isValidOffset, cssClasses, `${baseCssClass}-offset`);
}

function isValidAlign(align){
  return ['center','right'].includes(align);
}

function isValidVerticalAlign(verticalAlign){
  return ['middle','bottom'].includes(verticalAlign);
}

function isValidOffset(offset){
  const value = parseInt(offset);
  return value && value <= 10 && value > 0;
}

function getBaseCssClass(){
  return 't-row';
}

export default _public;
