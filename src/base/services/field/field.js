import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({ required, block, element } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass, buildRequiredCssClass(required, element, baseCssClass)];
  propBasedCssClassService.handleBooleanProp(
    { block },
    isValidBooleanProp,
    cssClasses,
    baseCssClass
  );
  return cssClasses.join(' ').replace(/\s+/g, ' ').trim();
};

_public.findFormControlId = ({ element }) => {
  const formControlEl = getFormControlElement(element);
  return formControlEl ? formControlEl.getAttribute('id') : '';
};

function getFormControlElement(fieldElement){
  return queryChild(fieldElement, 'input') || queryChild(fieldElement, 'select') || queryChild(fieldElement, 'textarea');
}

function getBaseCssClass(){
  return 't-field';
}

function isValidBooleanProp(propName){
  return ['block'].includes(propName);
}

function buildRequiredCssClass(required, element, baseCssClass){
  return shouldAppendRequiredCssClass(required, element) ? `${baseCssClass}-required` : '';
}

function shouldAppendRequiredCssClass(required, element){
  if(required)
    return true;
  if(required === undefined)
    return containsRequiredFormControl(element);
}

function containsRequiredFormControl(element){
  return element && !!element.querySelector('[required]');
}

function queryChild(element, tagName){
  return element && element.querySelector(tagName);
}

export default _public;
