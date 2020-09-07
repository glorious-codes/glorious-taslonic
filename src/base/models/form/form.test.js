import idService from '@base/services/id/id';
import { PromiseMock } from '@base/mocks/promise';
import { Form } from './form';

describe('Form', () => {
  function mockFormElement(){
    const button = document.createElement('button');
    const form = document.createElement('form');
    button.setAttribute('type', 'submit');
    form.appendChild(button);
    return form;
  }

  it('should identify form element', () => {
    const formEl = mockFormElement();
    const id = '123';
    idService.generate = jest.fn(() => id);
    new Form(formEl);
    expect(formEl.getAttribute('data-form-id')).toEqual(id);
  });

  it('should listen form submit', () => {
    const formEl = mockFormElement();
    formEl.addEventListener = jest.fn((type, callback) => {
      callback({ target: {}, preventDefault: jest.fn() });
    });
    new Form(formEl);
    expect(formEl.addEventListener.mock.calls[0][0]).toEqual('submit');
    expect(typeof formEl.addEventListener.mock.calls[0][1]).toEqual('function');
  });

  it('should prevent event on submit', () => {
    const evt = { preventDefault: jest.fn() };
    const form = new Form(mockFormElement());
    form.handleSubmit(evt);
    expect(evt.preventDefault).toHaveBeenCalled();
  });

  it('should execute submit callback on submit if callback has been given', () => {
    const evt = { preventDefault: jest.fn() };
    const onSubmit = jest.fn();
    const form = new Form(mockFormElement(), { onSubmit });
    form.handleSubmit(evt);
    expect(onSubmit).toHaveBeenCalledWith(evt);
  });

  it('should execute process change callback on submit start if callback has bee given', () => {
    const evt = { preventDefault: jest.fn() };
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const onProcessChange = jest.fn();
    const form = new Form(mockFormElement(), { onSubmit, onProcessChange });
    form.handleSubmit(evt);
    expect(onProcessChange).toHaveBeenCalledWith({ isSubmitting: true });
  });

  it('should execute submit success callback on submit success if callback has been given', () => {
    const evt = { preventDefault: jest.fn() };
    const response = { some: 'response' };
    const onSubmit = jest.fn(() => new PromiseMock('success', { response }));
    const onSubmitSuccess = jest.fn();
    const form = new Form(mockFormElement(), { onSubmit, onSubmitSuccess });
    form.handleSubmit(evt);
    expect(onSubmitSuccess).toHaveBeenCalledWith(response);
  });

  it('should execute process change callback on submit complete if callback has bee given', () => {
    const evt = { preventDefault: jest.fn() };
    const onSubmit = jest.fn(() => new PromiseMock('success'));
    const onProcessChange = jest.fn();
    const form = new Form(mockFormElement(), { onSubmit, onProcessChange });
    form.handleSubmit(evt);
    expect(onProcessChange).toHaveBeenCalledWith({ isSubmitting: false });
  });

  it('should execute submit error callback on submit error if callback has been given', () => {
    const evt = { preventDefault: jest.fn() };
    const err = { some: 'err' };
    const onSubmit = jest.fn(() => new PromiseMock('error', { err }));
    const onSubmitError = jest.fn();
    const form = new Form(mockFormElement(), { onSubmit, onSubmitError });
    form.handleSubmit(evt);
    expect(onSubmitError).toHaveBeenCalledWith(err);
  });

  it('should not process submit if form is not valid', () => {
    const evt = { preventDefault: jest.fn() };
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const onProcessChange = jest.fn();
    const form = new Form(mockFormElement(), { onSubmit, onProcessChange });
    form.setError('123', 'Required');
    form.handleSubmit(evt);
    expect(onSubmit).not.toHaveBeenCalled();
    expect(onProcessChange).not.toHaveBeenCalled();
  });

  it('should process submit if form becomes valid', () => {
    const evt = { preventDefault: jest.fn() };
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const onProcessChange = jest.fn();
    const form = new Form(mockFormElement(), { onSubmit, onProcessChange });
    form.setError('123', 'Required');
    form.clearError('123');
    form.handleSubmit(evt);
    expect(onSubmit).toHaveBeenCalledWith(evt);
    expect(onProcessChange).toHaveBeenCalledWith({ isSubmitting: true });
  });

  it('should notify submit listeners on submit', () => {
    const evt = { preventDefault: jest.fn() };
    const listener = jest.fn();
    const form = new Form(mockFormElement());
    form.onSubmit(listener);
    form.handleSubmit(evt);
    expect(listener).toHaveBeenCalled();
  });
});
