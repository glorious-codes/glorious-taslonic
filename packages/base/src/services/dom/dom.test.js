import domService from './dom';

describe('DOM Service', () => {
  it('should query ancestor by attribute', () => {
    const formEl = document.createElement('form');
    const labelEl = document.createElement('label');
    const inputEl = document.createElement('input');
    labelEl.appendChild(inputEl);
    formEl.appendChild(labelEl);
    formEl.setAttribute('data-form-id', '123');
    const parentEl = domService.queryAncestorByAttribute(inputEl, 'data-form-id');
    expect(parentEl).toEqual(formEl);
  });

  it('should return null when no ancestor contains searched attribute', () => {
    const formEl = document.createElement('form');
    const inputEl = document.createElement('input');
    formEl.setAttribute('data-form-id', '123');
    formEl.appendChild(inputEl);
    const parentEl = domService.queryAncestorByAttribute(inputEl, 'data-inexisting-attr');
    expect(parentEl).toEqual(null);
  });
});
