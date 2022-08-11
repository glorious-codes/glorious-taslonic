import { render } from '@testing-library/vue/dist';
import { userEvent } from '@base/services/testing/testing';
export * from '@testing-library/vue/dist';
export * from '@base/services/testing/testing';

export const customRender = (component, options, callback) => {
  return {
    userEvent,
    ...render(component, options, callback)
  };
};
