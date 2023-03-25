import * as formConstants  from '@base/constants/form';
import domService from '@base/services/dom/dom';
import { Form } from '@base/models/form/form';

const _public = {};

const forms = {};

_public.build = (formEl, options) => {
  const form = new Form(formEl, options);
  forms[form.id] = form;
  return form;
};

_public.get = id => getFormModel(id);

_public.destroy = id => {
  delete forms[id];
};

_public.findParentFormModel = childEl => {
  const formIdCustomAttrName = getFormConstant('FORM_ID_CUSTOM_ATTR');
  const formEl = domService.queryAncestorByAttribute(childEl, formIdCustomAttrName);
  if(formEl)
    return getFormModel(formEl.getAttribute(formIdCustomAttrName));
};

_public.getMessage = key => {
  return getFormConstant(key);
};

_public.buildCssClasses = ({ fetching, fetchFailed } = {}) => {
  const baseCssClass = getBaseCssClass();
  const cssClasses = [baseCssClass];
  if(fetching) cssClasses.push(`${baseCssClass}-fetching`);
  if(fetchFailed) cssClasses.push(`${baseCssClass}-fetch-failed`);
  return cssClasses.join(' ');
};

function getBaseCssClass(){
  return 't-form';
}

function getFormConstant(key){
  return formConstants[key];
}

function getFormModel(formId){
  return forms[formId];
}

export default _public;
