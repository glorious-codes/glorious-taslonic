import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { init } from './index';
import { Row } from './row';

describe('Row', () => {
  beforeEach(() => {
    customElementsService.define = jest.fn();
  });

  it('should define tas-row custom element on initialize', () => {
    init();
    expect(customElementsService.define).toHaveBeenCalledWith('tas-row', Row);
  });
});
