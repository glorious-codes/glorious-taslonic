import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp } from '@react/services/testing/testing';
import { FormControlModel } from '@base/models/form-control/form-control';
import { FormControlModelMock, formControlModelInstanceMock } from '@base/mocks/form-control-model';
import { FormControl } from './form-control';

jest.mock('@base/models/form-control/form-control');

describe('Form Control', () => {
  function mountComponent(props = {}){
    const content = props.content || <input type="text" />;
    return mount(
      <FormControl
        value={ props.value }
        required={ props.required }
        validations={ props.validations }
        formControlElSelector={ props.formControlElSelector || 'input' }
        blocked={ props.blocked }>
        { content }
      </FormControl>
    );
  }

  beforeEach(() => {
    FormControlModel.mockClear();
    formControlModelInstanceMock.setElementValue.mockClear();
  });

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-form-control');
  });

  it('should instantiate form control model passing form control child as first argument', () => {
    let child;
    FormControlModel.mockImplementation(el => (child = el));
    const wrapper = mountComponent();
    expect(wrapper.find('input').getDOMNode()).toEqual(child);
  });

  it('should optionally set required', () => {
    let options;
    const required = true;
    FormControlModel.mockImplementation((el, opt) => (options = opt));
    mountComponent({ required });
    expect(options.required).toEqual(required);
  });

  it('should append invalid css class if form control gets invalid', () => {
    FormControlModel.mockImplementation((el, options) => options.onValidate('Error!'));
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className').includes('t-form-control-invalid')).toEqual(true);
  });

  it('should optionally set form control as blocked', () => {
    const wrapper = mountComponent({ blocked: true });
    expect(getRootElProp(wrapper, 'className').includes('t-form-control-blocked')).toEqual(true);
  });

  it('should accept custom validations', () => {
    let options;
    const validations = [{ isValid: data => data == 'javascript', errorMessage: 'Invalid lang' }];
    FormControlModel.mockImplementation((el, opt) => (options = opt));
    mountComponent({ validations });
    expect(options.validations).toEqual(validations);
  });

  it('should optionally set initial value', () => {
    let options;
    const value = 'Initial value';
    FormControlModel.mockImplementation((el, opt) => (options = opt));
    mountComponent({ value });
    expect(options.value).toEqual(value);
  });

  it('should optionally set value programmatically', () => {
    const value = 'Rafael';
    FormControlModel.mockImplementation(FormControlModelMock);
    const wrapper = mountComponent();
    wrapper.setProps({ value });
    expect(FormControlModel).toHaveBeenCalledTimes(1);
    expect(formControlModelInstanceMock.setElementValue).toHaveBeenCalledWith(value);
  });

  it('should not set value programmatically if value is the same as the previous one', () => {
    const value = 'Rafael';
    FormControlModel.mockImplementation(FormControlModelMock);
    const wrapper = mountComponent();
    wrapper.setProps({ value });
    expect(formControlModelInstanceMock.setElementValue).toHaveBeenCalledWith(value);
    wrapper.setProps({ value });
    expect(formControlModelInstanceMock.setElementValue).toHaveBeenCalledTimes(1);
  });

  it('should optionally set required programmatically', () => {
    const required = true;
    FormControlModel.mockImplementation(FormControlModelMock);
    const wrapper = mountComponent();
    wrapper.setProps({ required });
    expect(formControlModelInstanceMock.onRequiredChange).toHaveBeenCalledWith(required);
  });

  it('should destroy form control model on unmount', () => {
    FormControlModel.mockImplementation(FormControlModelMock);
    const wrapper = mountComponent();
    wrapper.unmount();
    expect(formControlModelInstanceMock.destroy).toHaveBeenCalled();
  });
});
