import fieldService from './field';

describe('Field Service', () => {
  function mockFieldElement(){
    return document.createElement('div');
  }

  function mockFormControlElement(tagName, id = ''){
    const element = document.createElement(tagName);
    element.setAttribute('id', id);
    return element;
  }

  it('should build css classes', () => {
    expect(fieldService.buildCssClasses()).toEqual('t-field');
  });

  it('should append required modifier css class if field contains a required form control', () => {
    const element = mockFieldElement();
    const inputEl = mockFormControlElement('input');
    inputEl.setAttribute('required','');
    element.appendChild(inputEl);
    expect(fieldService.buildCssClasses({ element })).toContain('t-field-required');
  });

  it('should optionally append required modifier css class programmatically', () => {
    const cssClasses = fieldService.buildCssClasses({ required: true });
    expect(cssClasses).toEqual('t-field t-field-required');
  });

  it('should optionally not append required modifier css class programmatically', () => {
    const cssClasses = fieldService.buildCssClasses({ required: false });
    expect(cssClasses).toEqual('t-field');
  });

  it('should append block modifier css class if it has been given as true', () => {
    const cssClasses = fieldService.buildCssClasses({ block: true });
    expect(cssClasses).toEqual('t-field t-field-block');
  });

  it('should find form control id when form control is input', () => {
    const id = '4s5f7c';
    const element = mockFieldElement();
    const inputEl = mockFormControlElement('input', id);
    element.appendChild(inputEl);
    expect(fieldService.findFormControlId({ element })).toEqual(id);
  });

  it('should find form control id when form control is select', () => {
    const id = '4s5f7c';
    const element = mockFieldElement();
    const selectEl = mockFormControlElement('select', id);
    element.appendChild(selectEl);
    expect(fieldService.findFormControlId({ element })).toEqual(id);
  });

  it('should find form control id when form control is textarea', () => {
    const id = '4s5f7c';
    const element = mockFieldElement();
    const textareaEl = mockFormControlElement('textarea', id);
    element.appendChild(textareaEl);
    expect(fieldService.findFormControlId({ element })).toEqual(id);
  });

  it('should return empty string as form control id if form control has not been found', () => {
    const element = mockFieldElement();
    expect(fieldService.findFormControlId({ element })).toEqual('');
  });
});
