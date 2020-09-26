import React from 'react';
import { mount } from 'enzyme';
import testingService from '@react/services/testing/testing';
import { Field } from './field';

describe('Field', () => {
  function mountComponent({ label, required, blocked } = {}, content = <input />){
    return mount(
      <Field label={ label } required={ required } blocked={ blocked }>
        { content }
      </Field>
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(testingService.getRootElProp(wrapper, 'className')).toEqual('t-field');
  });

  it('should render a label', () => {
    const label = 'Email';
    const wrapper = mountComponent({ label });
    expect(wrapper.find('label').text()).toEqual(label);
  });

  it('should contain required css class if required prop has been given as true', () => {
    const wrapper = mountComponent({ required: true });
    expect(testingService.getRootElProp(wrapper, 'className').includes('t-field-required')).toEqual(true);
  });

  it('should contain required css class if no required prop has been passed but content is required', () => {
    const wrapper = mountComponent({}, <input type="text" required />);
    expect(testingService.getRootElProp(wrapper, 'className').includes('t-field-required')).toEqual(true);
  });
});
