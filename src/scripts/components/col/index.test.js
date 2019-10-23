import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { init } from './index';
import { Col } from './col';

describe('Col', () => {
  beforeEach(() => {
    customElementsService.define = jest.fn();
  });

  it('should define tas-col custom element on initialize', () => {
    init();
    expect(customElementsService.define).toHaveBeenCalledWith('tas-col', Col);
  });
});
