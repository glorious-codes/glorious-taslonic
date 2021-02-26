import { shallowMount } from '@vue/test-utils';
import { tRow } from './row';

describe('Row', () => {
  function mount(propsData = {}, content = ''){
    return shallowMount(tRow, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-row');
  });

  it('should optionally align contents at center', () => {
    const wrapper = mount({ align: 'center' });
    expect(wrapper.classes()).toContain('t-row-center');
  });

  it('should optionally align contents at right', () => {
    const wrapper = mount({ align: 'right' });
    expect(wrapper.classes()).toContain('t-row-right');
  });

  it('should optionally vertical align contents at middle', () => {
    const wrapper = mount({ verticalAlign: 'middle' });
    expect(wrapper.classes()).toContain('t-row-middle');
  });

  it('should optionally vertical align contents at bottom', () => {
    const wrapper = mount({ verticalAlign: 'bottom' });
    expect(wrapper.classes()).toContain('t-row-bottom');
  });

  it('should optionally offset row', () => {
    const wrapper = mount({ offset: '2' });
    expect(wrapper.classes()).toContain('t-row-offset-2');
  });

  it('should render some content', () => {
    const wrapper = mount({}, '<p>Hello</p>');
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
