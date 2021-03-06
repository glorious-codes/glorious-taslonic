import { shallowMount } from '@vue/test-utils';
import { tField } from './field';

describe('Field', () => {
  function mount(propsData = {}, content = ''){
    return shallowMount(tField, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-field');
  });

  it('should render a label', () => {
    const label = 'Email';
    const wrapper = mount({ label });
    expect(wrapper.find('label').text()).toEqual(label);
  });

  it('should contain required css class if required prop has been given as true', () => {
    const wrapper = mount({ required: true });
    expect(wrapper.classes()).toContain('t-field-required');
  });

  it('should contain block css class if block prop has been given as true', () => {
    const wrapper = mount({ block: true });
    expect(wrapper.classes()).toContain('t-field-block');
  });

  it('should contain required css class if no required prop has been passed but content is required', () => {
    const wrapper = mount({}, '<input type="text" required />');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).toContain('t-field-required');
    });
  });

  it('should set for attribute in accordance with form control id', () => {
    const id = '123asd';
    const wrapper = mount({}, `<input type="text" id="${id}" />`);
    wrapper.vm.$nextTick(() => {
      const label = wrapper.find('label');
      expect(label.attributes('for')).toEqual(id);
    });
  });
});
