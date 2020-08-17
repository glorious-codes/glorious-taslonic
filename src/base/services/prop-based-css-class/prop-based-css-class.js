const _public = {};

_public.handleProp = (prop, isValidProp, currentCssClasses, baseCssClass) => {
  if(prop && isValidProp(prop))
    currentCssClasses.push(`${baseCssClass}-${prop}`);
};

export default _public;
