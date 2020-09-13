import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';
import propBasedTagNameService from '@base/services/prop-based-tag-name/prop-based-tag-name';

const _public = {};

_public.buildCssClasses = ({ theme, blocked } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  propBasedCssClassService.handleProp(
    theme,
    isValidTheme,
    cssClasses,
    baseCssClass
  );
  propBasedCssClassService.handleBooleanProp(
    { blocked },
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

function isValidTheme(theme){
  return ['primary','secondary', 'lookless'].includes(theme);
}

function isValidBooleanProp(propName){
  return ['blocked'].includes(propName);
}

function isOptionalTagNameValid(tagName){
  return ['a'].includes(tagName);
}

function getBaseCssClass(){
  return 't-button';
}

export default _public;
