import formService from '@base/services/form/form';
import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';
import propBasedTagNameService from '@base/services/prop-based-tag-name/prop-based-tag-name';

const _public = {};

_public.buildCssClasses = ({ theme, block } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  propBasedCssClassService.handleProp(
    theme,
    isValidTheme,
    cssClasses,
    baseCssClass
  );
  propBasedCssClassService.handleBooleanProps(
    { block },
    isValidBooleanProp,
    cssClasses,
    baseCssClass
  );
  return cssClasses.join(' ');
};

_public.buildTagName = propValue => {
  return propBasedTagNameService.buildTagName(
    propValue,
    isOptionalTagNameValid,
    { defaultTagName: 'button'}
  );
};

_public.parseType = type => {
  return isValidType(type) ? type : 'button';
};

_public.findParentFormModel = (buttonEl, onFind) => {
  setTimeout(() => {
    const model = formService.findParentFormModel(buttonEl);
    model && onFind(model);
  });
};

function isValidTheme(theme){
  return ['primary','secondary', 'lookless'].includes(theme);
}

function isValidBooleanProp(propName){
  return ['block'].includes(propName);
}

function isValidType(type){
  return ['button', 'submit', 'reset'].includes(type);
}

function isOptionalTagNameValid(tagName){
  return ['a'].includes(tagName);
}

function getBaseCssClass(){
  return 't-button';
}

export default _public;
