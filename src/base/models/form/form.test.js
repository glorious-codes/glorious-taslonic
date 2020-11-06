import idService from '@base/services/id/id';
import { PromiseMock } from '@base/mocks/promise';
import { Form } from './form';

jest.useFakeTimers();

describe('Form', () => {
  function mockFormElement(){
    return document.createElement('form');
  }

  function mockFormControlElement(){
    return document.createElement('input');
  }

  it('should identify form element', () => {
    const formEl = mockFormElement();
    const id = '123';
    idService.generate = jest.fn(() => id);
    new Form(formEl);
    expect(formEl.getAttribute('data-form-id')).toEqual(id);
  });

  it('should execute submit callback on submit if callback has been given', () => {
    const formEl = mockFormElement();
    const onSubmit = jest.fn();
    const evt = new Event('submit');
    evt.preventDefault = jest.fn();
    new Form(formEl, { onSubmit });
    formEl.dispatchEvent(evt);
    expect(onSubmit).toHaveBeenCalled();
    expect(evt.preventDefault).toHaveBeenCalled();
  });

  it('should not execute submit callback on submit if request is still in progress', () => {
    const formEl = mockFormElement();
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    new Form(formEl, { onSubmit });
    formEl.submit();
    expect(onSubmit).toHaveBeenCalled();
    formEl.submit();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should execute process change listener on submit start', () => {
    const formEl = mockFormElement();
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const onProcessChange = jest.fn();
    const form = new Form(formEl, { onSubmit });
    form.onProcessChange(onProcessChange);
    formEl.submit();
    expect(onProcessChange).toHaveBeenCalledWith({ isSubmitting: true });
  });

  it('should execute submit success callback on submit success if callback has been given', () => {
    const formEl = mockFormElement();
    const response = { some: 'response' };
    const onSubmit = jest.fn(() => new PromiseMock('success', { response }));
    const onSubmitSuccess = jest.fn();
    new Form(formEl, { onSubmit, onSubmitSuccess });
    formEl.submit();
    expect(onSubmitSuccess).toHaveBeenCalledWith(response);
  });

  it('should execute process change listener on submit complete', () => {
    const formEl = mockFormElement();
    const onSubmit = jest.fn(() => new PromiseMock('success'));
    const onProcessChange = jest.fn();
    const form = new Form(formEl, { onSubmit });
    form.onProcessChange(onProcessChange);
    formEl.submit();
    expect(onProcessChange).toHaveBeenCalledWith({ isSubmitting: false });
  });

  it('should execute submit error callback on submit error if callback has been given', () => {
    const formEl = mockFormElement();
    const err = { some: 'err' };
    const onSubmit = jest.fn(() => new PromiseMock('error', { err }));
    const onSubmitError = jest.fn();
    new Form(formEl, { onSubmit, onSubmitError });
    formEl.submit();
    expect(onSubmitError).toHaveBeenCalledWith(err);
  });

  it('should not process submit if form is not valid', () => {
    const formEl = mockFormElement();
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const onProcessChange = jest.fn();
    const form = new Form(formEl, { onSubmit });
    form.setError('123', {
      element: mockFormControlElement(),
      message: 'Required'
    });
    formEl.submit();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onProcessChange).not.toHaveBeenCalled();
  });

  it('should focus form control element containing an error on submit', () => {
    const formControlEl = mockFormControlElement();
    const formEl = mockFormElement();
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const form = new Form(formEl, { onSubmit });
    form.setError('123', {
      element: formControlEl,
      message: 'Required'
    });
    formControlEl.focus = jest.fn();
    formEl.submit();
    expect(formControlEl.focus).toHaveBeenCalled();
  });

  it('should execute submit if form becomes valid', () => {
    const formEl = mockFormElement();
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const form = new Form(formEl, { onSubmit });
    form.setError('123', {
      element: mockFormControlElement(),
      message: 'Required'
    });
    form.clearError('123');
    formEl.submit();
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should notify submit listeners on submit', () => {
    const formEl = mockFormElement();
    const listener = jest.fn();
    const form = new Form(formEl);
    form.onSubmit(listener);
    formEl.submit();
    expect(listener).toHaveBeenCalled();
  });

  it('should remove a submit listener', () => {
    const formEl = mockFormElement();
    const listener1 = jest.fn();
    const listener2 = jest.fn();
    const form = new Form(formEl);
    form.onSubmit(listener1);
    const id2 = form.onSubmit(listener2);
    form.removeSubmitListener(id2);
    formEl.submit();
    expect(listener2).not.toHaveBeenCalled();
  });

  it('should execute fetch callback on fetch if callback has been given', () => {
    const onFetch = jest.fn();
    new Form(mockFormElement(), { onFetch });
    jest.runOnlyPendingTimers();
    expect(onFetch).toHaveBeenCalled();
  });

  it('should execute process change listener on fetch start', () => {
    const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const onProcessChange = jest.fn();
    const form = new Form(mockFormElement(), { onFetch });
    form.onProcessChange(onProcessChange);
    jest.runOnlyPendingTimers();
    expect(onProcessChange).toHaveBeenCalledWith({ isFetching: true });
  });

  it('should execute fetch success callback on fetch success if callback has been given', () => {
    const response = { some: 'response' };
    const onFetch = jest.fn(() => new PromiseMock('success', { response }));
    const onFetchSuccess = jest.fn();
    new Form(mockFormElement(), { onFetch, onFetchSuccess });
    jest.runOnlyPendingTimers();
    expect(onFetchSuccess).toHaveBeenCalledWith(response);
  });

  it('should execute fetch error callback on fetch success if callback has been given', () => {
    const err = { some: 'err' };
    const onFetch = jest.fn(() => new PromiseMock('error', { err }));
    const onFetchError = jest.fn();
    new Form(mockFormElement(), { onFetch, onFetchError });
    jest.runOnlyPendingTimers();
    expect(onFetchError).toHaveBeenCalledWith(err);
  });

  it('should execute process change listener on fetch complete', () => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    const onFetchSuccess = jest.fn();
    const onProcessChange = jest.fn();
    const form = new Form(mockFormElement(), { onFetch, onFetchSuccess });
    form.onProcessChange(onProcessChange);
    jest.runOnlyPendingTimers();
    expect(onProcessChange).toHaveBeenCalledWith({ isFetching: false });
  });

  it('should be able to execute fetch callback programatically', () => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    const form = new Form(mockFormElement(), { onFetch });
    jest.runOnlyPendingTimers();
    form.handleProcess('fetch');
    expect(onFetch).toHaveBeenCalledTimes(2);
  });

  it('should be able to execute submit callback programatically', () => {
    const onSubmit = jest.fn(() => new PromiseMock('success'));
    const form = new Form(mockFormElement(), { onSubmit });
    form.handleProcess('submit');
    expect(onSubmit).toHaveBeenCalled();
  });
});
