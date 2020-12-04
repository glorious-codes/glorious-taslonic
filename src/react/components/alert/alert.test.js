import React from 'react';
import { mount } from 'enzyme';
import testingService from '@base/services/testing/testing';
import { getRootElProp } from '@react/services/testing/testing';
import { Alert } from './alert';

describe('Alert', () => {
  function mountComponent({ content, dismissButtonText, onDismiss } = {}){
    return mount(
      <Alert
        dismissButtonText={ dismissButtonText }
        onDismiss={ onDismiss }>
        { content }
      </Alert>
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-alert-content');
  });

  it('should render custom content', () => {
    const message = 'It\'s an alert.';
    const wrapper = mountComponent({ content: <p>{message}</p> });
    expect(wrapper.find('p').text()).toContain(message);
  });

  it('should dismiss button text be "Ok" by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').text()).toContain('Ok');
  });

  it('should optionally customize dismiss button text', () => {
    const dismissButtonText = 'Dismiss';
    const wrapper = mountComponent({ dismissButtonText });
    expect(wrapper.find('button').text()).toContain(dismissButtonText);
  });

  it('should execute dismiss callback on dismiss button click', () => {
    const onDismiss = jest.fn();
    const wrapper = mountComponent({ onDismiss });
    wrapper.find('button').simulate('click');
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should execute dismiss callback on Enter keydown', () => {
    const enterKeyCode = 13;
    const onDismiss = jest.fn();
    mountComponent({ onDismiss });
    testingService.simulateKeydown(enterKeyCode);
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should stop listening Enter keydown on component unmount', () => {
    const enterKeyCode = 13;
    const onDismiss = jest.fn();
    const wrapper = mountComponent({ onDismiss });
    wrapper.unmount();
    testingService.simulateKeydown(enterKeyCode);
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
