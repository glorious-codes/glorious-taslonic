import React from 'react';
import { mount } from 'enzyme';
import { Loader } from './loader';

describe('Loader', () => {
  function mountComponent({ theme } = {}){
    return mount(
      <Loader theme={theme} />
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.childAt(0).prop('className')).toEqual('t-loader');
  });

  it('should optionally set a light theme', () => {
    const wrapper = mountComponent({ theme: 'light' });
    expect(wrapper.childAt(0).prop('className').includes('t-loader-light')).toEqual(true);
  });

  it('should contain animated elements', () => {
    const wrapper = mountComponent();
    const elements = wrapper.childAt(0).getDOMNode().querySelectorAll('span');
    expect(elements.length).toEqual(3);
  });
});
