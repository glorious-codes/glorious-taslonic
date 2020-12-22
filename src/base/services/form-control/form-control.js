import { REQUIRED_ERROR_MESSAGE }  from '@base/constants/messages';
import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';
import formService from '@base/services/form/form';

const _public = {};

_public.buildCssClasses = ({ errorMessage, block } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  handleInvalidCssClass(errorMessage, cssClasses, baseCssClass);
  propBasedCssClassService.handleBooleanProp(
    { block },
    isValidBooleanProp,
    cssClasses,
    baseCssClass
  );
  return cssClasses.join(' ');
};

_public.buildRequiredValidation = () => {
  return { isValid: data => !!data, errorMessage: REQUIRED_ERROR_MESSAGE };
};

_public.findParentFormModel = formControlEl => {
  return formService.findParentFormModel(formControlEl);
};

function getBaseCssClass(){
  return 't-form-control';
}

function isValidBooleanProp(propName){
  return ['block'].includes(propName);
}

function handleInvalidCssClass(errorMessage, cssClasses, baseCssClass){
  if(errorMessage)
    cssClasses.push(`${baseCssClass}-invalid`);
  return cssClasses;
}

export default _public;
