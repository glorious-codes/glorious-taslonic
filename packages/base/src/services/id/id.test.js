import shortId from 'shortid';
import idService from './id';

describe('Id Service', () => {
  beforeEach(() => {
    shortId.generate = jest.fn();
  });

  it('should generate an id using short id', () => {
    idService.generate();
    expect(shortId.generate).toHaveBeenCalled();
  });
});
