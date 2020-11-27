import { mount } from '@vue/test-utils';
import testingService from '@base/services/testing/testing';
import { confirm } from './confirm';

describe('Confirm', () => {
  function mountComponent(propsData = {}, content = ''){
    return mount(confirm, { propsData, slots: { default: content } });
  }

  function getButton(wrapper, type){
    const index = type == 'cancel' ? 0 : 1;
    return wrapper.findAll('button').at(index);
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-confirm-content');
  });

  it('should render custom content', () => {
    const wrapper = mountComponent({}, '<p>Really?</p>');
    expect(wrapper.find('p').text()).toContain('Really?');
  });

  it('should cancel button text be "Cancel" by default', () => {
    const wrapper = mountComponent();
    expect(getButton(wrapper, 'cancel').text()).toContain('Cancel');
  });

  it('should optionally customize cancel button text', () => {
    const wrapper = mountComponent({ cancelButtonText: 'Abort' });
    expect(getButton(wrapper, 'cancel').text()).toContain('Abort');
  });

  it('should confirm button text be "Confirm" by default', () => {
    const wrapper = mountComponent();
    expect(getButton(wrapper, 'confirm').text()).toContain('Confirm');
  });

  it('should optionally customize confirm button text', () => {
    const wrapper = mountComponent({ confirmButtonText: 'Go' });
    expect(getButton(wrapper, 'confirm').text()).toContain('Go');
  });

  it('should execute cancel callback on cancel button click', () => {
    const onCancel = jest.fn();
    const wrapper = mountComponent({ onCancel });
    getButton(wrapper, 'cancel').trigger('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('should execute cancel callback on Esc keydown', () => {
    const escKeyCode = 27;
    const onCancel = jest.fn();
    mountComponent({ onCancel });
    testingService.simulateKeydown(escKeyCode);
    expect(onCancel).toHaveBeenCalled();
  });

  it('should execute confirm callback on confirm button click', () => {
    const onConfirm = jest.fn();
    const wrapper = mountComponent({ onConfirm });
    getButton(wrapper, 'confirm').trigger('click');
    expect(onConfirm).toHaveBeenCalled();
  });

  it('should execute confirm callback on Enter keydown', () => {
    const enterKeyCode = 13;
    const onConfirm = jest.fn();
    mountComponent({ onConfirm });
    testingService.simulateKeydown(enterKeyCode);
    expect(onConfirm).toHaveBeenCalled();
  });
});
