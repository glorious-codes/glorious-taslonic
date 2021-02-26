import { mount } from '@vue/test-utils';
import { tTag } from './tag';

describe('Tag', () => {
  function mountComponent(propsData = {}, content = ''){
    return mount(tTag, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-tag');
  });

  it('should optionally set a primary theme', () => {
    const wrapper = mountComponent({ theme: 'primary' });
    expect(wrapper.classes()).toContain('t-tag-primary');
  });

  it('should optionally set a secondary theme', () => {
    const wrapper = mountComponent({ theme: 'secondary' });
    expect(wrapper.classes()).toContain('t-tag-secondary');
  });

  it('should optionally set a warning theme', () => {
    const wrapper = mountComponent({ theme: 'warning' });
    expect(wrapper.classes()).toContain('t-tag-warning');
  });

  it('should optionally set a danger theme', () => {
    const wrapper = mountComponent({ theme: 'danger' });
    expect(wrapper.classes()).toContain('t-tag-danger');
  });

  it('should optionally set a success theme', () => {
    const wrapper = mountComponent({ theme: 'success' });
    expect(wrapper.classes()).toContain('t-tag-success');
  });

  it('should optionally set a info theme', () => {
    const wrapper = mountComponent({ theme: 'info' });
    expect(wrapper.classes()).toContain('t-tag-info');
  });

  it('should render some content', () => {
    const wrapper = mountComponent({}, '<span>New!</span>');
    expect(wrapper.find('span').text()).toEqual('New!');
  });
});
