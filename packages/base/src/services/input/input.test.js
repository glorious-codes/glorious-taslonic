import inputService from './input';

describe('Input Service', () => {
  it('should return custom type if a valid type has been passed', () => {
    const type = 'email';
    expect(inputService.parseType(type)).toEqual(type);
  });

  it('should defaults type to text if invalid type has been passed', () => {
    expect(inputService.parseType('checkbox')).toEqual('text');
  });
});
