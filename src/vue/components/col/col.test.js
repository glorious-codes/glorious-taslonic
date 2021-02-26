import { shallowMount } from '@vue/test-utils';
import { tCol } from './col';

describe('Column', () => {
  function mount(propsData = {}, content = ''){
    return shallowMount(tCol, { propsData, slots: { default: content } });
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-col');
  });

  it('should optionally size column for extra-small screens', () => {
    const wrapper = mount({ xs: '6' });
    expect(wrapper.classes()).toContain('t-col-xs-6');
  });

  it('should optionally size column for small screens', () => {
    const wrapper = mount({ sm: '6' });
    expect(wrapper.classes()).toContain('t-col-sm-6');
  });

  it('should optionally size column for medium screens', () => {
    const wrapper = mount({ md: '6' });
    expect(wrapper.classes()).toContain('t-col-md-6');
  });

  it('should optionally size column for large screens', () => {
    const wrapper = mount({ lg: '6' });
    expect(wrapper.classes()).toContain('t-col-lg-6');
  });

  it('should optionally offset column in extra-small screens', () => {
    const wrapper = mount({ offsetXs: '2' });
    expect(wrapper.classes()).toContain('t-col-offset-xs-2');
  });

  it('should optionally offset column in small screens', () => {
    const wrapper = mount({ offsetSm: '2' });
    expect(wrapper.classes()).toContain('t-col-offset-sm-2');
  });

  it('should optionally offset column in medium screens', () => {
    const wrapper = mount({ offsetMd: '2' });
    expect(wrapper.classes()).toContain('t-col-offset-md-2');
  });

  it('should optionally offset column in large screens', () => {
    const wrapper = mount({ offsetLg: '2' });
    expect(wrapper.classes()).toContain('t-col-offset-lg-2');
  });

  it('should optionally align column text content in extra-small screens', () => {
    const wrapper = mount({ alignXs: 'center' });
    expect(wrapper.classes()).toContain('t-col-align-xs-center');
  });

  it('should optionally align column text content in small screens', () => {
    const wrapper = mount({ alignSm: 'center' });
    expect(wrapper.classes()).toContain('t-col-align-sm-center');
  });

  it('should optionally align column text content in medium screens', () => {
    const wrapper = mount({ alignMd: 'center' });
    expect(wrapper.classes()).toContain('t-col-align-md-center');
  });

  it('should optionally align column text content in large screens', () => {
    const wrapper = mount({ alignLg: 'center' });
    expect(wrapper.classes()).toContain('t-col-align-lg-center');
  });
});
