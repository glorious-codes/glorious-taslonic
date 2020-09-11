import { shallowMount } from '@vue/test-utils';
import { loader } from './loader';

describe('Loader', () => {
  function mount(propsData = {}){
    return shallowMount(loader, { propsData });
  }

  it('should have appropriate css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-loader');
  });

  it('should optionally set a light theme', () => {
    const wrapper = mount({ theme: 'light' });
    expect(wrapper.classes()).toContain('t-loader-light');
  });

  it('should contain animated elements', () => {
    const wrapper = mount();
    const elements = wrapper.vm.$el.querySelectorAll('span');
    expect(elements.length).toEqual(3);
  });
});
