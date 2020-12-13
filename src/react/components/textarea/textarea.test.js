import React from 'react';
import { shallow } from 'enzyme';
import { FormControl } from '@react/components/form-control/form-control';
import { Textarea } from './textarea';

describe('Textarea', () => {
  function mount(props = {}){
    return shallow(
      <Textarea
        cols={ props.cols }
        rows={ props.rows }
        placeholder={ props.placeholder }
        value={ props.value }
        validations={ props.validations }
        blocked={ props.blocked }
        disabled={ props.disabled }
        required={ props.required }
        { ...props }
      >
        { props.content }
      </Textarea>
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

  it('should form control query for a textarea', () => {
    const wrapper = mount();
    expect(wrapper.find(FormControl).prop('formControlElSelector')).toEqual('textarea');
  });

  it('should not be disabled by default', () => {
    const wrapper = mount();
    expect(wrapper.find('textarea').prop('disabled')).not.toBeDefined();
  });

  it('should optionally set select as disabled', () => {
    const wrapper = mount({ disabled: true });
    expect(wrapper.find('textarea').prop('disabled')).toEqual(true);
  });

  it('should optionally autofocus textarea', () => {
    const wrapper = mount({ autofocus: true });
    expect(wrapper.find('textarea').prop('autofocus')).toEqual(true);
  });

  it('should optionally set a name', () => {
    const name = 'fruit';
    const wrapper = mount({ name });
    expect(wrapper.find('textarea').prop('name')).toEqual(name);
  });

  it('should optionally set visible columns', () => {
    const cols = '15';
    const wrapper = mount({ cols });
    expect(wrapper.find('textarea').prop('cols')).toEqual(cols);
  });

  it('should optionally set visible rows', () => {
    const rows = '8';
    const wrapper = mount({ rows });
    expect(wrapper.find('textarea').prop('rows')).toEqual(rows);
  });

  it('should not show a placeholder by default', () => {
    const wrapper = mount();
    expect(wrapper.find('textarea').prop('placeholder')).toEqual(undefined);
  });

  it('should optionally set a placeholder', () => {
    const placeholder = 'Type anything...';
    const wrapper = mount({ placeholder });
    expect(wrapper.find('textarea').prop('placeholder')).toEqual(placeholder);
  });

  it('should optionally set select listeners', () => {
    const onBlur = jest.fn();
    const wrapper = mount({ onBlur });
    wrapper.find('textarea').simulate('blur');
    expect(onBlur).toHaveBeenCalled();
  });
});
