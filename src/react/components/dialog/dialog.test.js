import React from 'react';
import { mount } from 'enzyme';
import testingService from '@base/services/testing/testing';
import { getRootElProp } from '@react/services/testing/testing';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { Dialog } from './dialog';

describe('Dialog', () => {
  function mountComponent({ width, title, onClose = () => {}, children } = {}){
    return mount(
      <Dialog title={ title } width={ width } onClose={ onClose }>
        { children }
      </Dialog>
    );
  }

  it('should have appropriate css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('[data-dialog]').prop('className')).toEqual('t-dialog');
  });

  it('should contain a backdrop', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-dialog-backdrop');
  });

  it('should not render a title by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('[data-dialog-title]').length).toEqual(0);
  });

  it('should optionally render a title', () => {
    const title = 'Newsletter';
    const wrapper = mountComponent({ title });
    expect(wrapper.find('[data-dialog-title]').text()).toEqual(title);
  });

  it('should optionally set a width', () => {
    const width = '300px';
    const wrapper = mountComponent({ width });
    expect(wrapper.find('[data-dialog]').prop('style')).toEqual({
      maxWidth: '300px'
    });
  });

  it('should render some content', () => {
    const children = <p>Hello</p>;
    const wrapper = mountComponent({ children });
    expect(wrapper.find('p').text()).toEqual('Hello');
  });

  it('should execute close callback on close button click', () => {
    const onClose = jest.fn();
    const wrapper = mountComponent({ onClose });
    wrapper.find('[data-dialog-close-button]').at(0).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should execute close callback on esc keydown event', () => {
    const escKeyCode = 27;
    const onClose = jest.fn();
    mountComponent({ onClose });
    testingService.simulateKeydown(escKeyCode);
    expect(onClose).toHaveBeenCalled();
  });

  it('should stop listening esc keydown event on unmount', () => {
    const id = '123';
    keyboardSubscriptionService.subscribe = jest.fn(() => id);
    keyboardSubscriptionService.unsubscribe = jest.fn();
    const wrapper = mountComponent();
    wrapper.unmount();
    expect(keyboardSubscriptionService.unsubscribe).toHaveBeenCalledWith(id);
  });
});
