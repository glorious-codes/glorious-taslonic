import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({
  xs,
  sm,
  md,
  lg,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  alignXs,
  alignSm,
  alignMd,
  alignLg
} = {}) => {
  const cssClasses = [getBaseCssClass()];
  handleSizeProps({ xs, sm, md, lg }, cssClasses);
  handleOffsetProps({
    'offset-xs': offsetXs,
    'offset-sm': offsetSm,
    'offset-md': offsetMd,
    'offset-lg': offsetLg
  }, cssClasses);
  handleAlignProps({
    'align-xs': alignXs,
    'align-sm': alignSm,
    'align-md': alignMd,
    'align-lg': alignLg
  }, cssClasses);
  return cssClasses.join(' ');
};

function handleSizeProps(sizeProps, cssClasses){
  handleProps(sizeProps, size => isValidSize(parseInt(size), getMaxCols()), cssClasses);
}

function handleOffsetProps(offsetProps, cssClasses){
  handleProps(offsetProps, offset => isValidOffsetSize(parseInt(offset), getMaxOffset()), cssClasses);
}

function handleAlignProps(alignProps, cssClasses){
  handleProps(alignProps, isValidAlign, cssClasses);
}

function handleProps(props, isValidPropValue, cssClasses){
  const { handleProp } = propBasedCssClassService;
  Object.keys(props).forEach(prop => {
    const propValue = props[prop];
    handleProp(propValue, propValue => isValidPropValue(propValue), cssClasses, getPropBaseCssClass(prop));
  });
}

function isValidSize(size, maxValue){
  return size && size <= maxValue;
}

function isValidOffsetSize(size, maxValue){
  return size === 0 || size <= maxValue;
}

function isValidAlign(align){
  return ['left', 'center', 'right'].includes(align);
}

function getMaxCols(){
  return 12;
}

function getMaxOffset(){
  return 11;
}

function getPropBaseCssClass(prop){
  return `${getBaseCssClass()}-${prop}`;
}

function getBaseCssClass(){
  return 't-col';
}

export default _public;
