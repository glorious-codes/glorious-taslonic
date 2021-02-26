import { mount } from '@vue/test-utils';
import testingService from '@base/services/testing/testing';
import { tAlert } from './alert';

describe('Alert', () => {
  function mountComponent(propsData = {}, content = ''){
    return mount(tAlert, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-alert-content');
  });

  it('should render custom content', () => {
    const message = 'It\'s an alert.';
    const wrapper = mountComponent({}, `<p>${message}</p>`);
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
    wrapper.find('button').trigger('click');
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should execute dismiss callback on Enter keydown', () => {
    const enterKeyCode = 13;
    const onDismiss = jest.fn();
    mountComponent({ onDismiss });
    testingService.simulateKeydown(enterKeyCode);
    expect(onDismiss).toHaveBeenCalled();
  });
});
