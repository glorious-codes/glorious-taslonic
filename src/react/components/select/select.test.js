import React from 'react';
import { shallow } from 'enzyme';
import { FormControl } from '@react/components/form-control/form-control';
import { Select } from './select';

describe('Select', () => {
  function mount(props = {}){
    return shallow(
      <Select
        value={ props.value }
        validations={ props.validations }
        blocked={ props.blocked }
        disabled={ props.disabled }
        required={ props.required }
        { ...props }
      >
        { props.content }
      </Select>
    );
  }

  it('should pass value to form control', () => {
    const value = 'Taslonic';
    const wrapper = mount({ value });
    expect(wrapper.find(FormControl).prop('value')).toEqual(value);
  });

  it('should pass required to form control', () => {
    const required = true;
    const wrapper = mount({ required });
    expect(wrapper.find(FormControl).prop('required')).toEqual(required);
  });

  it('should pass validations to form control', () => {
    const validations = [];
    const wrapper = mount({ validations });
    expect(wrapper.find(FormControl).prop('validations')).toEqual(validations);
  });

  it('should pass blocked to form control', () => {
    const blocked = true;
    const wrapper = mount({ blocked });
    expect(wrapper.find(FormControl).prop('blocked')).toEqual(blocked);
  });

  it('should form control query for a select', () => {
    const wrapper = mount();
    expect(wrapper.find(FormControl).prop('formControlElSelector')).toEqual('select');
  });

  it('should not be disabled by default', () => {
    const wrapper = mount();
    expect(wrapper.find('select').prop('disabled')).not.toBeDefined();
  });

  it('should optionally set select as disabled', () => {
    const wrapper = mount({ disabled: true });
    expect(wrapper.find('select').prop('disabled')).toEqual(true);
  });

  it('should optionally autofocus select', () => {
    const wrapper = mount({ autofocus: true });
    expect(wrapper.find('select').prop('autofocus')).toEqual(true);
  });

  it('should not show placeholder by default', () => {
    const wrapper = mount();
    expect(wrapper.find('option').length).toEqual(0);
  });

  it('should optionally set a placeholder', () => {
    const placeholder = 'Select';
    const wrapper = mount({ placeholder });
    expect(wrapper.find('option').text()).toEqual(placeholder);
    expect(wrapper.find('option').prop('value')).toEqual('');
  });

  it('should optionally set select listeners', () => {
    const onBlur = jest.fn();
    const wrapper = mount({ onBlur });
    wrapper.find('select').simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('should render some content', () => {
    const content = <option value="">Select</option>;
    const wrapper = mount({ content });
    expect(wrapper.find('option').text()).toEqual('Select');
  });
});
