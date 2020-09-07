import React from 'react';
import { mount } from 'enzyme';
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
        validations={ props.validations }
        querySelector={ props.querySelector || 'input' }
        blocked={ props.blocked }>
        { content }
      </FormControl>
    );
  }

  function getErrorMessageEl(wrapper){
    return wrapper.find('[data-form-control-error-message]');
  }

  function getRootElProp(wrapper, prop){
    const rootEl = wrapper.childAt(0);
    return rootEl.prop(prop);
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

  it('should show error message on validation error', () => {
    const errorMessage = 'Error!';
    FormControlModel.mockImplementation((el, options) => options.onValidate(errorMessage));
    const content = <input type="text" required />;
    const wrapper = mountComponent({ content });
    expect(getErrorMessageEl(wrapper).text()).toEqual(errorMessage);
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
});
