import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { init } from './index';
import { Container } from './container';

describe('Container', () => {
  beforeEach(() => {
    customElementsService.define = jest.fn();
  });

  it('should define tas-container custom element on initialize', () => {
    init();
    expect(customElementsService.define).toHaveBeenCalledWith('tas-container', Container);
  });
});
