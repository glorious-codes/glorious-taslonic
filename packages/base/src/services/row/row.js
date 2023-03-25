import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({
  offset,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  align,
  alignXs,
  alignSm,
  alignMd,
  alignLg,
  verticalAlign,
  verticalAlignXs,
  verticalAlignSm,
  verticalAlignMd,
  verticalAlignLg
} = {}) => {
  const cssClasses = [getBaseCssClass()];
  handleOffsetProps({
    'offset': offset,
    'offset-xs': offsetXs,
    'offset-sm': offsetSm,
    'offset-md': offsetMd,
    'offset-lg': offsetLg
  }, cssClasses);
  handleAlignProps({
    'align': align,
    'align-xs': alignXs,
    'align-sm': alignSm,
    'align-md': alignMd,
    'align-lg': alignLg
  }, cssClasses);
  handleVerticalAlignProps({
    'vertical-align': verticalAlign,
    'vertical-align-xs': verticalAlignXs,
    'vertical-align-sm': verticalAlignSm,
    'vertical-align-md': verticalAlignMd,
    'vertical-align-lg': verticalAlignLg
  }, cssClasses);
  return cssClasses.join(' ');
};

function handleOffsetProps(offsetProps, cssClasses){
  handleProps(offsetProps, isValidOffset, cssClasses);
}

function handleAlignProps(alignProps, cssClasses){
  handleProps(alignProps, isValidAlign, cssClasses);
}

function handleVerticalAlignProps(verticalAlignProps, cssClasses){
  handleProps(verticalAlignProps, isValidVerticalAlign, cssClasses);
}

function handleProps(props, isValidPropValue, cssClasses){
  const { handleProp } = propBasedCssClassService;
  Object.keys(props).forEach(propName => {
    const propValue = props[propName];
    handleProp(propValue, propValue => isValidPropValue(propValue), cssClasses, getPropBaseCssClass(propName));
  });
}

function isValidAlign(align){
  return ['left', 'center','right'].includes(align);
}

function isValidVerticalAlign(verticalAlign){
  return ['top', 'middle','bottom'].includes(verticalAlign);
}

function isValidOffset(offset){
  const value = parseInt(offset);
  return value >= 0 && value <= 10;
}

function getPropBaseCssClass(propName){
  const baseCssClass = getBaseCssClass();
  const suffix = getPropBaseCssClassSuffix(propName);
  return suffix ? `${baseCssClass}-${suffix}` : baseCssClass;
}

function getPropBaseCssClassSuffix(propName){
  return propName.includes('offset') ? propName : getScreenSizeFromPropNameParts(propName.split('-'));
}

function getScreenSizeFromPropNameParts(parts){
  const lastPart = getPropNameLastPart(parts);
  return lastPart && lastPart.length === 2 && lastPart;
}

function getPropNameLastPart(parts){
  return parts.length > 1 && parts[parts.length - 1];
}

function getBaseCssClass(){
  return 't-row';
}

export default _public;
