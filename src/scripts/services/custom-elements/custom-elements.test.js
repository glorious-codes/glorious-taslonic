import { customElementsMock } from '@mocks/custom-elements';
import customElementsAPIService from '@scripts/services/custom-elements-api/custom-elements-api';
import customElementsService from './custom-elements';

describe('Custom Element Service', () => {
  beforeEach(() => {
    customElementsAPIService.define = jest.fn();
  });

  it('should define a custom element', () => {
    customElementsAPIService.get = jest.fn(() => customElementsMock);
    class SomeComponent { }
    customElementsService.define('some-component', SomeComponent);
    expect(customElementsMock.define).toHaveBeenCalledWith('some-component', SomeComponent);
  });

  it('should throw error if custom elements API is not available', () => {
    customElementsAPIService.get = jest.fn();
    const err = 'This browser has no support for Custom Elements.';
    const execution = () => customElementsService.define();
    expect(execution).toThrowError(err);
  });
});
