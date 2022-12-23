import { render } from '@testing-library/react';
import { userEvent } from '@base/services/testing/testing';
export * from '@testing-library/react';
export * from '@base/services/testing/testing';

export const customRender = component => {
  return {
    userEvent,
    ...render(component)
  };
};
