import { mount } from '@vue/test-utils';
import testingService from '@base/services/testing/testing';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { tDialog } from './dialog';

describe('Dialog', () => {
  function mountComponent(propsData = {}, content = ''){
    return mount(tDialog, { propsData, slots: { default: content } });
  }

  it('should have appropriate css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('[data-dialog]').classes()).toContain('t-dialog');
  });

  it('should deactivate any active element on document on create', () => {
    document.activeElement.blur = jest.fn();
    mountComponent();
    expect(document.activeElement.blur).toHaveBeenCalled();
  });

  it('should contain a backdrop', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-dialog-backdrop');
  });

  it('should not render a title by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.findAll('[data-dialog-title]').length).toEqual(0);
  });

  it('should optionally render a title', () => {
    const title = 'Newsletter';
    const wrapper = mountComponent({ title });
    expect(wrapper.find('[data-dialog-title]').text()).toEqual(title);
  });

  it('should optionally set a width', () => {
    const width = '300px';
    const wrapper = mountComponent({ width });
    expect(wrapper.find('[data-dialog]').attributes('style')).toEqual('max-width: 300px;');
  });

  it('should render some content', () => {
    const content = '<p>Hello</p>';
    const wrapper = mountComponent({}, content);
    expect(wrapper.find('p').text()).toEqual('Hello');
  });

  it('should execute close callback on close button click', () => {
    const onClose = jest.fn();
    const wrapper = mountComponent({ onClose });
    wrapper.find('[data-dialog-close-button]').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('should execute close callback on esc keydown event by default', () => {
    const escKeyCode = 27;
    const onClose = jest.fn();
    mountComponent({ onClose });
    testingService.simulateKeydown(escKeyCode);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not execute close callback on esc keydown event if close button is hidden', () => {
    const escKeyCode = 27;
    const onClose = jest.fn();
    const wrapper = mountComponent({ onClose, hideCloseButton: true });
    testingService.simulateKeydown(escKeyCode);
    expect(onClose).not.toHaveBeenCalled();
    expect(wrapper.findAll('[data-dialog-close-button]').length).toEqual(0);
  });

  it('should stop listening esc keydown event on unmount', () => {
    const id = '123';
    keyboardSubscriptionService.subscribe = jest.fn(() => id);
    keyboardSubscriptionService.unsubscribe = jest.fn();
    const wrapper = mountComponent({ onClose: jest.fn() });
    wrapper.destroy();
    expect(keyboardSubscriptionService.unsubscribe).toHaveBeenCalledWith(id);
  });
});
