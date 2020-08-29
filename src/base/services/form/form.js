import { Form } from '@base/models/form/form';

const _public = {};

const forms = {};

_public.build = (formEl, options) => {
  const form = new Form(formEl, options);
  forms[form.id] = form;
  return form;
};

_public.get = id => {
  return forms[id];
};

_public.remove = id => {
  delete forms[id];
};

export default _public;
