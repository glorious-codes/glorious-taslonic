export const getRootElProp = (wrapper, prop) => {
  const rootEl = wrapper.childAt(0);
  return rootEl.prop(prop);
};

export const fireEvent = (target, eventType) => {
  const evt = new Event(eventType, { bubbles: true });
  target.dispatchEvent(evt);
};
