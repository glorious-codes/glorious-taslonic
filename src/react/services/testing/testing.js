import { render } from '@testing-library/react';
import { userEvent } from '@base/services/testing/testing';
export * from '@testing-library/react';
export * from '@base/services/testing/testing';

export const getRootElProp = (wrapper, prop) => {
  const rootEl = wrapper.childAt(0);
  return rootEl.prop(prop);
};

export const fireEvent = (target, eventType) => {
  const evt = new Event(eventType, { bubbles: true });
  target.dispatchEvent(evt);
};

export const customRender = component => {
  return {
    userEvent,
    ...render(component)
  };
};
