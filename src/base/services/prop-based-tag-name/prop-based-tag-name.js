const _public = {};

_public.buildTagName = (propValue, isValidPropValue, { defaultTagName }) => {
  return propValue && isValidPropValue(propValue) ? propValue : defaultTagName;
};

export default _public;
