import { REQUIRED_ERROR_MESSAGE }  from '@base/constants/messages';
import idService from '@base/services/id/id';
import formService from '@base/services/form/form';
import { FormControlModel } from './form-control';

jest.useFakeTimers();

describe('Form Control Model', () => {
  function mockFormControlElement({ autofocus, required } = {}){
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    if(autofocus) input.setAttribute('autofocus', 'autofocus');
    if(required) input.setAttribute('required', 'required');
    return input;
  }

  function mockForm(formControlEl){
    const formEl = document.createElement('form');
    const form = formService.build(formEl);
    form.setError = jest.fn();
    form.clearError = jest.fn();
    form.removeSubmitListener = jest.fn();
    if(formControlEl)
      formEl.appendChild(formControlEl);
    return form;
  }

  function instantiateFormControl(formControlEl, options){
    const formControl = new FormControlModel(formControlEl, options);
    jest.runOnlyPendingTimers();
    return formControl;
  }

  it('should identify form control', () => {
    const id = '123';
    idService.generate = jest.fn(() => id);
    const formControlEl = mockFormControlElement();
    const formControl = new FormControlModel(formControlEl);
    expect(formControl.id).toEqual(id);
    expect(formControl.element.getAttribute('id')).toEqual(id);
  });

  it('should optionally initialize form control with a value', () => {
    const value = 'Rafael';
    const formControlEl = mockFormControlElement();
    const formControl = new FormControlModel(formControlEl, { value });
    expect(formControl.element.value).toEqual(value);
  });

  it('should validate on initialize', () => {
    const formControlEl = mockFormControlElement();
    const form = mockForm(formControlEl);
    form.setError = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { required: true });
    expect(form.setError).toHaveBeenCalledWith(
      formControl.id, {
        element: formControlEl,
        message: REQUIRED_ERROR_MESSAGE
      }
    );
  });

  it('should config form control element listeners', () => {
    const formControlEl = mockFormControlElement();
    formControlEl.addEventListener = jest.fn((type, callback) => callback({ target: {} }));
    instantiateFormControl(formControlEl);
    expect(formControlEl.addEventListener.mock.calls[0][0]).toEqual('input');
    expect(typeof formControlEl.addEventListener.mock.calls[0][1]).toEqual('function');
    expect(formControlEl.addEventListener.mock.calls[1][0]).toEqual('blur');
    expect(typeof formControlEl.addEventListener.mock.calls[1][1]).toEqual('function');
  });

  it('should focus form control element if autofocus attribute is present', () => {
    const formControlEl = mockFormControlElement({ autofocus: true });
    formControlEl.focus = jest.fn();
    instantiateFormControl(formControlEl);
    expect(formControlEl.focus).toHaveBeenCalled();
  });

  it('should execute validation callback if required form control is blank on blur', () => {
    const formControlEl = mockFormControlElement();
    const onValidate = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { onValidate, required: true });
    const evtMock = { target: { value: '' } };
    formControl.onBlur(evtMock);
    expect(onValidate).toHaveBeenCalledWith(REQUIRED_ERROR_MESSAGE);
  });

  it('should execute validation callback when required changes and form control has already been blurred', () => {
    const formControlEl = mockFormControlElement();
    const onValidate = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { onValidate, required: true });
    formControl.onRequiredChange(false);
    const evtMock = { target: { value: '' } };
    formControl.onBlur(evtMock);
    expect(onValidate).toHaveBeenCalledWith(undefined);
  });

  it('should not execute validation callback when required changes but form control has not been blurred yet', () => {
    const formControlEl = mockFormControlElement();
    const onValidate = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { onValidate, required: true });
    formControl.onRequiredChange(false);
    expect(onValidate).not.toHaveBeenCalled();
  });

  it('should execute validation callback if custom validation fails on blur', () => {
    const formControlEl = mockFormControlElement({ required: true });
    const errorMessage = 'Enter a valid name';
    const validations = [{ isValid: data => data == 'Rafael', errorMessage }];
    const onValidate = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { validations, onValidate });
    const evtMock = { target: { value: 'John' } };
    formControl.onBlur(evtMock);
    expect(onValidate).toHaveBeenCalledWith(errorMessage);
  });

  it('should execute validation callback if custom validation succeed on blur', () => {
    const formControlEl = mockFormControlElement();
    const onValidate = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { onValidate, required: true });
    const evtMock = { target: { value: 'John' } };
    formControl.onBlur(evtMock);
    expect(onValidate).toHaveBeenCalledWith(undefined);
  });

  it('should not execute validation callback if form control has not been blurred yet', () => {
    const formControlEl = mockFormControlElement({ required: true });
    const onValidate = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { onValidate });
    const evtMock = { target: { value: '' } };
    formControl.onInput(evtMock);
    expect(onValidate).not.toHaveBeenCalled();
  });

  it('should execute validation callback on form submit even if form control has not been blurred yet', () => {
    const formControlEl = mockFormControlElement();
    const form = mockForm(formControlEl);
    const onValidate = jest.fn();
    instantiateFormControl(formControlEl, { onValidate, required: true });
    form.handleSubmit({ preventDefault: jest.fn() });
    expect(onValidate).toHaveBeenCalledWith(REQUIRED_ERROR_MESSAGE);
  });

  it('should execute change callback on change', () => {
    const formControlEl = mockFormControlElement({ required: true });
    const onInput = jest.fn();
    const formControl = instantiateFormControl(formControlEl, { onInput });
    const evtMock = { target: { value: 'R' } };
    formControl.onInput(evtMock);
    expect(onInput).toHaveBeenCalledWith(evtMock);
  });

  it('should set validation error to form if form control is invalid on change', () => {
    const formControlEl = mockFormControlElement();
    const form = mockForm(formControlEl);
    const formControl = instantiateFormControl(formControlEl, { required: true });
    const evtMock = { target: { value: '' } };
    formControl.onInput(evtMock);
    expect(form.setError).toHaveBeenCalledWith(formControl.id, {
      element: formControlEl,
      message: REQUIRED_ERROR_MESSAGE
    });
  });

  it('should clear validation error from form if form control is valid on change', () => {
    const formControlEl = mockFormControlElement({ required: true });
    const form = mockForm(formControlEl);
    const formControl = instantiateFormControl(formControlEl);
    const evtMock = { target: { value: 'Rafael' } };
    formControl.onInput(evtMock);
    expect(form.clearError).toHaveBeenCalledWith(formControl.id);
  });

  it('should clear its errors and remove its submit listeners from parent form model on destroy', () => {
    const formControlEl = mockFormControlElement({ required: true });
    const form = mockForm(formControlEl);
    const formControl = instantiateFormControl(formControlEl);
    formControl.destroy();
    expect(form.clearError).toHaveBeenCalledWith(formControl.id);
    expect(form.removeSubmitListener).toHaveBeenCalledWith(formControl.submitListenerId);
  });
});
