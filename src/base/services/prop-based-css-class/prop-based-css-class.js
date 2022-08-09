const _public = {};

_public.handleProp = (propValue, isValidPropValue, currentCssClasses, baseCssClass) => {
  if(propValue && isValidPropValue(propValue))
    currentCssClasses.push(`${baseCssClass}-${propValue}`);
};

_public.handleBooleanProps = (props, isValidBooleanProp, currentCssClasses, baseCssClass) => {
  const [ propName ] = Object.keys(props);
  const propValue = props[propName];
  if(shouldAppendBoolenPropCssClass(propName, propValue, isValidBooleanProp))
    currentCssClasses.push(`${baseCssClass}-${propName}`);
};

function shouldAppendBoolenPropCssClass(propName, propValue, isValidBooleanProp){
  return isValidBooleanProp(propName) && [true, 'true', ''].includes(propValue);
}

export default _public;
