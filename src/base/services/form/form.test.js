import { Form } from '@base/models/form/form';
import formService from './form';

describe('Form Service', () => {
  function buildFormElement(){
    return document.createElement('form');
  }

  it('should build a form model', () => {
    const form = formService.build(buildFormElement());
    expect(form instanceof Form).toEqual(true);
  });

  it('should optionally build a form model with options', () => {
    const options = {
      onSubmit: jest.fn(),
      onSubmitSuccess: jest.fn(),
      onSubmitError: jest.fn(),
      onProcessChange: jest.fn()
    };
    const form = formService.build(buildFormElement(), options);
    expect(form.options).toEqual(options);
  });

  it('should get an existing form model', () => {
    const formEl = buildFormElement();
    const form = formService.build(formEl);
    expect(formService.get(formEl.getAttribute('data-form-id'))).toEqual(form);
  });

  it('should destroy an existing form model', () => {
    const formEl = buildFormElement();
    formService.build(formEl);
    const formId = formEl.getAttribute('data-form-id');
    formService.destroy(formId);
    expect(formService.get(formId)).toEqual(undefined);
  });

  it('should find parent form model from child element', () => {
    const formEl = buildFormElement();
    const formModel = formService.build(formEl);
    const input = document.createElement('input');
    formEl.appendChild(input);
    expect(formService.findParentFormModel(input)).toEqual(formModel);
  });

  it('should build base css class', () => {
    expect(formService.buildCssClasses()).toEqual('t-form');
  });

  it('should optionally build fetching css class', () => {
    expect(formService.buildCssClasses({ fetching: true }).includes('t-form-fetching')).toEqual(true);
  });

  it('should optionally build fetch failed css class', () => {
    expect(formService.buildCssClasses({ fetchFailed: true }).includes('t-form-fetch-failed')).toEqual(true);
  });
});
