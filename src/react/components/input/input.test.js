import React from 'react';
import { shallow } from 'enzyme';
import { FormControl } from '@react/components/form-control/form-control';
import { Input } from './input';

describe('Input', () => {
  function mount(props = {}){
    return shallow(
      <Input
        type={ props.type }
        value={ props.value }
        placeholder={ props.placeholder }
        validations={ props.validations }
        block={ props.block }
        disabled={ props.disabled }
        required={ props.required }
        { ...props }
      />
    );
  }

  it('should pass value to form control', () => {
    const value = 'Rafael';
    const wrapper = mount({ value });
    expect(wrapper.find(FormControl).prop('value')).toEqual(value);
  });

  it('should pass validations to form control', () => {
    const validations = [{ isValid: data => data === 'Rafael', errorMessage: 'Error!' }];
    const wrapper = mount({ validations });
    expect(wrapper.find(FormControl).prop('validations')).toEqual(validations);
  });

  it('should pass block to form control', () => {
    const block = true;
    const wrapper = mount({ block });
    expect(wrapper.find(FormControl).prop('block')).toEqual(block);
  });

  it('should form control query for an input', () => {
    const wrapper = mount();
    expect(wrapper.find(FormControl).prop('formControlElSelector')).toEqual('input');
  });

  it('should input contain an attribute type as text by default', () => {
    const wrapper = mount();
    expect(wrapper.find('input').prop('type')).toEqual('text');
  });

  it('should type be text if an invalid type has been given', () => {
    const wrapper = mount({ type: 'checkbox' });
    expect(wrapper.find('input').prop('type')).toEqual('text');
  });

  it('should optionally set an input type', () => {
    const type = 'password';
    const wrapper = mount({ type });
    expect(wrapper.find('input').prop('type')).toEqual(type);
  });

  it('should optionally set a placeholder', () => {
    const placeholder = 'Enter your name';
    const wrapper = mount({ placeholder });
    expect(wrapper.find('input').prop('placeholder')).toEqual(placeholder);
  });

  it('should not be disabled by default', () => {
    const wrapper = mount();
    expect(wrapper.find('input').prop('disabled')).toEqual(undefined);
  });

  it('should optionally set input as disabled', () => {
    const disabled = true;
    const wrapper = mount({ disabled });
    expect(wrapper.find('input').prop('disabled')).toEqual(disabled);
  });

  it('should optionally set input listeners', () => {
    const onChange = jest.fn();
    const wrapper = mount({ onChange });
    wrapper.find('input').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
