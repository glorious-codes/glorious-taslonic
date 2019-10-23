import attributeService from './attribute';

describe('Attribute Service', () => {
  function mockElement(){
    return document.createElement('div');
  }

  it('should set css class based on attribute value when attribute value is valid', () => {
    const element = mockElement();
    attributeService.handleCssClass(element, 'right', ['center', 'right'], 'tas-row-align');
    expect(element.classList.contains('tas-row-align-right')).toEqual(true);
  });

  it('should not set css class if no attribute value is given', () => {
    const element = mockElement();
    attributeService.handleCssClass(element, undefined, ['center', 'right'], 'tas-row-align');
    expect(element.classList.contains('tas-row-align-right')).toEqual(false);
  });

  it('should throw error if attribute value is not valid', () => {
    const err = 'You have set an invalid attribute value for DIV: \'justify\'. Valid values are: center, right.';
    const execution = () => attributeService.handleCssClass(mockElement(), 'justify', ['center', 'right']);
    expect(execution).toThrowError(err);
  });

  it('should build acceptable number range', () => {
    const validValues = attributeService.buildAcceptableNumberRange(1, 4);
    expect(validValues).toEqual(['1', '2', '3', '4']);
  });
});
