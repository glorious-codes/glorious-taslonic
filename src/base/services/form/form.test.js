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

  it('should remove an existing form model', () => {
    const formEl = buildFormElement();
    formService.build(formEl);
    const formId = formEl.getAttribute('data-form-id');
    formService.remove(formId);
    expect(formService.get(formId)).toEqual(undefined);
  });
});
