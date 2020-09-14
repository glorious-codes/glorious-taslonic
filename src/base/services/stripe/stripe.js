import propBasedCssClassService from '@base/services/prop-based-css-class/prop-based-css-class';

const _public = {};

_public.buildCssClasses = ({ theme } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  propBasedCssClassService.handleProp(
    theme,
    isValidTheme,
    cssClasses,
    baseCssClass
  );
  return cssClasses.join(' ');
};

function isValidTheme(theme){
  return ['warning', 'danger', 'success'].includes(theme);
}

function getBaseCssClass(){
  return 't-stripe';
}

export default _public;
