import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp } from '@react/services/testing/testing';
import { Field } from './field';

describe('Field', () => {
  function mountComponent({ label, required, block } = {}, content = <input />){
    return mount(
      <Field label={ label } required={ required } block={ block }>
        { content }
      </Field>
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-field');
  });

  it('should render a label', () => {
    const label = 'Email';
    const wrapper = mountComponent({ label });
    expect(wrapper.find('label').text()).toEqual(label);
  });

  it('should contain required css class if required prop has been given as true', () => {
    const wrapper = mountComponent({ required: true });
    expect(getRootElProp(wrapper, 'className').includes('t-field-required')).toEqual(true);
  });

  it('should contain block css class if block prop has been given as true', () => {
    const wrapper = mountComponent({ block: true });
    expect(getRootElProp(wrapper, 'className').includes('t-field-block')).toEqual(true);
  });

  it('should contain required css class if no required prop has been passed but content is required', () => {
    const wrapper = mountComponent({}, <input type="text" required />);
    expect(getRootElProp(wrapper, 'className').includes('t-field-required')).toEqual(true);
  });

  it('should set for attribute in accordance with form control id', () => {
    const id = '123asd';
    const wrapper = mountComponent({}, <input type="text" id={id} />);
    const label = wrapper.find('label');
    expect(label.props().htmlFor).toEqual(id);
  });
});
