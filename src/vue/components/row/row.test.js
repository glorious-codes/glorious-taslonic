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

  it('should optionally align contents at top', () => {
    const wrapper = mount({ align: 'left' });
    expect(wrapper.classes()).toContain('t-row-left');
  });

  it('should optionally align contents at center on extra small screens', () => {
    const wrapper = mount({ alignXs: 'center' });
    expect(wrapper.classes()).toContain('t-row-xs-center');
  });

  it('should optionally align contents at right on large screens', () => {
    const wrapper = mount({ alignLg: 'right' });
    expect(wrapper.classes()).toContain('t-row-lg-right');
  });

  it('should optionally vertical align contents at top', () => {
    const wrapper = mount({ verticalAlign: 'top' });
    expect(wrapper.classes()).toContain('t-row-top');
  });

  it('should optionally vertical align contents at middle on small screens', () => {
    const wrapper = mount({ verticalAlignSm: 'middle' });
    expect(wrapper.classes()).toContain('t-row-sm-middle');
  });

  it('should optionally vertical align contents at bottom on medium screens', () => {
    const wrapper = mount({ verticalAlignMd: 'bottom' });
    expect(wrapper.classes()).toContain('t-row-md-bottom');
  });

  it('should optionally offset row', () => {
    const wrapper = mount({ offset: '2' });
    expect(wrapper.classes()).toContain('t-row-offset-2');
  });

  it('should optionally offset row on extra small screens', () => {
    const wrapper = mount({ offsetXs: '5' });
    expect(wrapper.classes()).toContain('t-row-offset-xs-5');
  });

  it('should optionally offset row on medium screens', () => {
    const wrapper = mount({ offsetSm: '0' });
    expect(wrapper.classes()).toContain('t-row-offset-sm-0');
  });

  it('should render some content', () => {
    const wrapper = mount({}, '<p>Hello</p>');
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
