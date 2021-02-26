import { mount } from '@vue/test-utils';
import buttonService from '@base/services/button/button';
import { tButton } from './button';

describe('Button', () => {
  function mountComponent({ listeners = {}, ...propsData } = {}, content = ''){
    return mount(tButton, { propsData, listeners, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-button');
  });

  it('should render a button using a button tag name by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.vm.$el.tagName.toLowerCase()).toEqual('button');
  });

  it('should optionally render a button using a anchor tag name', () => {
    const wrapper = mountComponent({ tag: 'a' });
    expect(wrapper.vm.$el.tagName.toLowerCase()).toEqual('a');
  });

  it('should optionally set a primary theme', () => {
    const wrapper = mountComponent({ theme: 'primary' });
    expect(wrapper.classes()).toContain('t-button-primary');
  });

  it('should optionally set a secondary theme', () => {
    const wrapper = mountComponent({ theme: 'secondary' });
    expect(wrapper.classes()).toContain('t-button-secondary');
  });

  it('should optionally set a lookless theme', () => {
    const wrapper = mountComponent({ theme: 'lookless' });
    expect(wrapper.classes()).toContain('t-button-lookless');
  });

  it('should optionally set as block', () => {
    const wrapper = mountComponent({ block: true });
    expect(wrapper.classes()).toContain('t-button-block');
  });

  it('should optionally set button listeners', () => {
    const onChange = jest.fn();
    const wrapper = mountComponent({ listeners: { change: onChange } });
    wrapper.trigger('change');
    expect(onChange).toHaveBeenCalled();
  });

  it('should render some content', () => {
    const wrapper = mountComponent({}, '<strong>Click</strong>');
    expect(wrapper.find('strong').text()).toEqual('Click');
  });

  it('should hide content and show loader on submit start', () => {
    const formModelMock = { onProcessChange: jest.fn(callback => callback({ isSubmitting: true })) };
    buttonService.findParentFormModel = jest.fn((el, onFind) => onFind(formModelMock));
    const wrapper = mountComponent({ type: 'submit' }, '<strong>Submit</strong>');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('strong').length).toEqual(0);
      expect(wrapper.findAll('[data-button-loader]').length).toEqual(1);
    });
  });

  it('should show content and hide loader on submit complete', () => {
    const formModelMock = { onProcessChange: jest.fn(callback => callback({ isSubmitting: false })) };
    buttonService.findParentFormModel = jest.fn((el, onFind) => onFind(formModelMock));
    const wrapper = mountComponent({ type: 'submit' }, '<strong>Submit</strong>');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('strong').length).toEqual(1);
      expect(wrapper.findAll('[data-button-loader]').length).toEqual(0);
    });
  });
});
