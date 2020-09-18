import React from 'react';
import { mount } from 'enzyme';
import { Banner } from './banner';

describe('Banner', () => {
  function mountComponent(props = {}, content = ''){
    return mount(
      <Banner
        theme={ props.theme }
        triggerText={ props.triggerText }
        onTriggerClick={ props.onTriggerClick }
        onClose={props.onClose}
        { ...props }>
        { content }
      </Banner>
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.childAt(0).prop('className')).toEqual('t-banner');
  });

  it('should optionally set a warning theme', () => {
    const wrapper = mountComponent({ theme: 'warning' });
    expect(wrapper.childAt(0).prop('className').includes('t-banner-warning')).toEqual(true);
  });

  it('should optionally set a danger theme', () => {
    const wrapper = mountComponent({ theme: 'danger' });
    expect(wrapper.childAt(0).prop('className').includes('t-banner-danger')).toEqual(true);
  });

  it('should optionally set a success theme', () => {
    const wrapper = mountComponent({ theme: 'success' });
    expect(wrapper.childAt(0).prop('className').includes('t-banner-success')).toEqual(true);
  });

  it('should render some content', () => {
    const wrapper = mountComponent({}, <p>Hello</p>);
    expect(wrapper.find('p').text()).toEqual('Hello');
  });

  it('should execute trigger callback on trigger click', () => {
    const onTriggerClick = jest.fn();
    const wrapper = mountComponent({ onTriggerClick });
    wrapper.find('[data-banner-trigger]').at(0).simulate('click');
    expect(onTriggerClick).toHaveBeenCalled();
  });

  it('should optionally set trigger text', () => {
    const triggerText = 'Retry';
    const wrapper = mountComponent({ onTriggerClick: jest.fn(), triggerText });
    expect(wrapper.find('[data-banner-trigger]').at(0).text()).toEqual(triggerText);
  });

  it('should remove itself on close button click', () => {
    const wrapper = mountComponent();
    wrapper.find('[data-banner-close-button]').at(0).simulate('click');
    expect(wrapper.html()).toEqual(null);
  });

  it('should execute close callback on close', () => {
    const onClose = jest.fn();
    const wrapper = mountComponent({ onClose });
    wrapper.find('[data-banner-close-button]').at(0).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should render custom props', () => {
    const wrapper = mountComponent({ lang: 'pt-BR' });
    expect(wrapper.childAt(0).prop('lang')).toEqual('pt-BR');
  });
});
