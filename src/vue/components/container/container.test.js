import { shallowMount } from '@vue/test-utils';
import { tContainer } from './container';

describe('Container', () => {
  function mount(propsData = {}, content = ''){
    return shallowMount(tContainer, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-container');
  });

  it('should optionally set a small size', () => {
    const wrapper = mount({ size: 'sm' });
    expect(wrapper.classes()).toContain('t-container-sm');
  });

  it('should optionally set a large size', () => {
    const wrapper = mount({ size: 'lg' });
    expect(wrapper.classes()).toContain('t-container-lg');
  });

  it('should render some content', () => {
    const wrapper = mount({}, '<p>Hello</p>');
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
