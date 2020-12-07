import { shallowMount } from '@vue/test-utils';
import { formControl } from '@vue/components/form-control/form-control';
import { select } from './select';

describe('Select', () => {
  function mount({ listeners = {}, ...propsData } = {}, content = ''){
    return shallowMount(select, { propsData, listeners, slots: { default: content } });
  }

  it('should pass value to form control', () => {
    const value = 'Taslonic';
    const wrapper = mount({ value });
    expect(wrapper.findComponent(formControl).props('value')).toEqual(value);
  });

  it('should pass required to form control', () => {
    const required = true;
    const wrapper = mount({ required });
    expect(wrapper.findComponent(formControl).props('required')).toEqual(required);
  });

  it('should pass validations to form control', () => {
    const validations = [];
    const wrapper = mount({ validations });
    expect(wrapper.findComponent(formControl).props('validations')).toEqual(validations);
  });

  it('should pass blocked to form control', () => {
    const blocked = true;
    const wrapper = mount({ blocked });
    expect(wrapper.findComponent(formControl).props('blocked')).toEqual(blocked);
  });

  it('should form control query for a select', () => {
    const wrapper = mount();
    expect(wrapper.findComponent(formControl).props('formControlElSelector')).toEqual('select');
  });

  it('should not be disabled by default', () => {
    const wrapper = mount();
    expect(wrapper.find('select').attributes('disabled')).not.toBeDefined();
  });

  it('should optionally set select as disabled', () => {
    const wrapper = mount({ disabled: true });
    expect(wrapper.find('select').attributes('disabled')).toEqual('disabled');
  });

  it('should optionally autofocus select', () => {
    const wrapper = mount({ autofocus: true });
    expect(wrapper.find('select').attributes('autofocus')).toEqual('autofocus');
  });

  it('should optionally set select listeners', () => {
    const onBlur = jest.fn();
    const wrapper = mount({ listeners: { blur: onBlur } });
    wrapper.find('select').trigger('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('should render some content', () => {
    const wrapper = mount({}, '<option value="">Select</option>');
    expect(wrapper.find('option').text()).toEqual('Select');
  });
});
