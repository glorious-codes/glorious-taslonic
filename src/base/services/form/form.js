import { FORM_ID_CUSTOM_ATTR }  from '@base/constants/form';
import domService from '@base/services/dom/dom';
import { Form } from '@base/models/form/form';

const _public = {};

const forms = {};

_public.build = (formEl, options) => {
  const form = new Form(formEl, options);
  forms[form.id] = form;
  return form;
};

_public.get = id => {
  return getFormModel(id);
};

_public.remove = id => {
  delete forms[id];
};

_public.findParentFormModel = childEl => {
  const formEl = domService.queryAncestorByAttribute(childEl, FORM_ID_CUSTOM_ATTR);
  if(formEl)
    return getFormModel(formEl.getAttribute(FORM_ID_CUSTOM_ATTR));
};

function getFormModel(formId){
  return forms[formId];
}

export default _public;
