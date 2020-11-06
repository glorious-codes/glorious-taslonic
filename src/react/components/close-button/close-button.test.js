import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp } from '@react/services/testing/testing';
import { CloseButton } from './close-button';

describe('Close Button', () => {
  function mountComponent(props = {}){
    return mount(<CloseButton { ...props } />);
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-close-button');
  });

  it('should contain a lookless theme button', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').prop('className').includes('t-button-lookless')).toEqual(true);
  });

  it('should contain a icon as button label', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').text()).toEqual('×');
  });

  it('should optionally set listeners', () => {
    const onChange = jest.fn();
    const wrapper = mountComponent({ onChange });
    wrapper.find('button[data-close-button]').simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
