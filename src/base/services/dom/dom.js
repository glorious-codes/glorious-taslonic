const _public = {};

_public.queryAncestorByAttribute = (element, attribute) => {
  if(!element) return null;
  const parentEl = element.parentElement;
  if(elementMatchesAttribute(parentEl, attribute))
    return parentEl;
  return _public.queryAncestorByAttribute(parentEl, attribute);
};

function elementMatchesAttribute(element, attribute){
  return element && (element.getAttribute(attribute) !== null);
}

export default _public;
