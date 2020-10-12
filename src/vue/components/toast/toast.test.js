import { shallowMount } from '@vue/test-utils';
import { toast } from './toast';

describe('Toast', () => {
  function mount(propsData = {}, content = ''){
    return shallowMount(toast, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-toast');
  });

  it('should not render a title by default', () => {
    const wrapper = mount();
    const title = wrapper.vm.$el.querySelector('h3');
    expect(title).toEqual(null);
  });

  it('should optionally set a title', () => {
    const title = 'Taslonic';
    const wrapper = mount({ title });
    expect(wrapper.find('h3').text()).toEqual(title);
  });

  it('should optionally set a info theme', () => {
    const wrapper = mount({ theme: 'info' });
    expect(wrapper.classes()).toContain('t-toast-info');
  });

  it('should optionally set a warning theme', () => {
    const wrapper = mount({ theme: 'warning' });
    expect(wrapper.classes()).toContain('t-toast-warning');
  });

  it('should optionally set a danger theme', () => {
    const wrapper = mount({ theme: 'danger' });
    expect(wrapper.classes()).toContain('t-toast-danger');
  });

  it('should optionally set a success theme', () => {
    const wrapper = mount({ theme: 'success' });
    expect(wrapper.classes()).toContain('t-toast-success');
  });

  it('should render some content', () => {
    const wrapper = mount({}, '<strong>Hello</strong>');
    expect(wrapper.find('strong').text()).toEqual('Hello');
  });
});
