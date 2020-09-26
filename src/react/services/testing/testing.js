const _public = {};

_public.getRootElProp = (wrapper, prop) => {
  const rootEl = wrapper.childAt(0);
  return rootEl.prop(prop);
};

export default _public;
