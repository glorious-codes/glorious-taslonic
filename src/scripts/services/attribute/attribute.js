const _public = {};

_public.handleCssClass = (element, attributeValue, validValues, cssClassPrefix) => {
  if(!attributeValue)
    return null;
  if(validValues.includes(attributeValue))
    element.classList.add(`${cssClassPrefix}-${attributeValue}`);
  else
    throw new Error(buildErrorMessage(element, attributeValue, validValues));
};

_public.buildAcceptableNumberRange = (min, max) => {
  const validValues = [];
  for (var value = min; value <= max; value++)
    validValues.push(value.toString());
  return validValues;
};

function buildErrorMessage(element, value, validValues){
  const name = element.tagName;
  return `You have set an invalid attribute value for ${name}: '${value}'. Valid values are: ${validValues.join(', ')}.`;
}

export default _public;
