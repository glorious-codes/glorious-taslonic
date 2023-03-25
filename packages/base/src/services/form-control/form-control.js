import { REQUIRED_ERROR_MESSAGE }  from '@base/constants/messages';
import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';
import formService from '@base/services/form/form';

const _public = {};

_public.buildCssClasses = ({ errorMessage, block } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  handleInvalidCssClass(errorMessage, cssClasses, baseCssClass);
  propBasedCssClassService.handleBooleanProps(
    { block },
    isValidBooleanProp,
    cssClasses,
    baseCssClass
  );
  return cssClasses.join(' ');
};

_public.buildRequiredValidation = () => {
  const isValid = data => {
    return typeof data == 'string' ? !!data.trim() : !!data;
  };
  return { isValid, errorMessage: REQUIRED_ERROR_MESSAGE };
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
