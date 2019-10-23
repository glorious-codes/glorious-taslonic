import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { init } from './index';
import { Button } from './button';

describe('Button', () => {
  beforeEach(() => {
    customElementsService.define = jest.fn();
  });

  it('should define tas-button custom element on initialize', () => {
    init();
    expect(customElementsService.define).toHaveBeenCalledWith('tas-button', Button);
  });
});
