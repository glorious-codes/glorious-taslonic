import customElementsAPIService from '@scripts/services/custom-elements-api/custom-elements-api';

const _public = {};

_public.define = (tagName, CustomElement) => {
  const customElementsAPI = customElementsAPIService.get();
  if(!customElementsAPI)
    throw new Error(buildErrorMessage());
  else
    customElementsAPI.define(tagName, CustomElement);
};

function buildErrorMessage(){
  return 'This browser has no support for Custom Elements.';
}

export default _public;
