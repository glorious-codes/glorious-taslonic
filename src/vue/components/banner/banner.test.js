import { mount } from '@vue/test-utils';
import { banner } from './banner';

describe('Banner', () => {
  function mountComponent(propsData = {}, content = ''){
    return mount(banner, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-banner');
  });

  it('should optionally set a warning theme', () => {
    const wrapper = mountComponent({ theme: 'warning' });
    expect(wrapper.classes()).toContain('t-banner-warning');
  });

  it('should optionally set a danger theme', () => {
    const wrapper = mountComponent({ theme: 'danger' });
    expect(wrapper.classes()).toContain('t-banner-danger');
  });

  it('should optionally set a success theme', () => {
    const wrapper = mountComponent({ theme: 'success' });
    expect(wrapper.classes()).toContain('t-banner-success');
  });

  it('should render some content', () => {
    const wrapper = mountComponent({}, '<span>Welcome!</span>');
    expect(wrapper.find('span').text()).toEqual('Welcome!');
  });

  it('should execute trigger callback on trigger click', () => {
    const onTriggerClick = jest.fn();
    const wrapper = mountComponent({ onTriggerClick });
    wrapper.find('[data-banner-trigger]').trigger('click');
    expect(onTriggerClick).toHaveBeenCalled();
  });

  it('should optionally set trigger text', () => {
    const triggerText = 'Retry';
    const wrapper = mountComponent({ onTriggerClick: jest.fn(), triggerText });
    expect(wrapper.find('[data-banner-trigger]').text()).toEqual(triggerText);
  });

  it('should remove itself on close button click', done => {
    const wrapper = mountComponent();
    wrapper.find('[data-close-button]').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toEqual('');
      done();
    });
  });

  it('should execute close callback on close', () => {
    const onClose = jest.fn();
    const wrapper = mountComponent({ onClose });
    wrapper.find('[data-close-button]').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });
});
