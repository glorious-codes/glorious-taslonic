import { mount } from '@vue/test-utils';
import { card } from './card';

describe('Card', () => {
  function mountComponent(propsData = {}, content = ''){
    return mount(card, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-card');
  });

  it('should not contain a title by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.findAll('h3').length).toEqual(0);
  });

  it('should optionally render a title', () => {
    const title = 'Users';
    const wrapper = mountComponent({ title });
    expect(wrapper.find('h3').text()).toEqual(title);
  });

  it('should optionally render a title with custom tag name', () => {
    const title = 'Settings';
    const titleTagName = 'h1';
    const wrapper = mountComponent({ titleTagName, title });
    expect(wrapper.find(titleTagName).text()).toEqual(title);
  });

  it('should render some content', () => {
    const content = '<p>Hello!</p>';
    const wrapper = mountComponent({}, content);
    expect(wrapper.find('p').text()).toEqual('Hello!');
  });
});
