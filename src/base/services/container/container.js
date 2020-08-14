const _public = {};

_public.buildCssClasses = ({ size } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  if(size && isValidSize(size))
    cssClasses.push(`${baseCssClass}-${size}`);
  return cssClasses.join(' ');
};

function isValidSize(size){
  return ['sm','lg'].includes(size);
}

function getBaseCssClass(){
  return 't-container';
}

export default _public;
