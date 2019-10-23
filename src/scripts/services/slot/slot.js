const _public = {};

_public.write = (template, customContent) => {
  return template.replace('{ slot }', customContent);
};

export default _public;
