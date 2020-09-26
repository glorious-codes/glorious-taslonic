import fieldService from './field';

describe('Field Service', () => {
  it('should build css classes', () => {
    expect(fieldService.buildCssClasses()).toEqual('t-field');
  });

  it('should append required modifier css class if field contains a required form control', () => {
    const fieldEl = document.createElement('div');
    const inputEl = document.createElement('input');
    inputEl.setAttribute('required','');
    fieldEl.appendChild(inputEl);
    expect(fieldService.buildCssClasses({ element: fieldEl }).includes('t-field-required')).toEqual(true);
  });

  it('should optionally append required modifier css class programmatically', () => {
    const cssClasses = fieldService.buildCssClasses({ required: true });
    expect(cssClasses).toEqual('t-field t-field-required');
  });

  it('should optionally not append required modifier css class programmatically', () => {
    const cssClasses = fieldService.buildCssClasses({ required: false });
    expect(cssClasses).toEqual('t-field');
  });

  it('should append blocked modifier css class if it has been given as true', () => {
    const cssClasses = fieldService.buildCssClasses({ blocked: true });
    expect(cssClasses).toEqual('t-field t-field-blocked');
  });
});
