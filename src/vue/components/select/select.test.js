import { shallowMount } from '@vue/test-utils';
import { tFormControl } from '@vue/components/form-control/form-control';
import { tSelect } from './select';

describe('Select', () => {
  function mount({ listeners = {}, ...propsData } = {}, content = ''){
    return shallowMount(tSelect, { propsData, listeners, slots: { default: content } });
  }

  it('should pass value to form control', () => {
    const value = 'Taslonic';
    const wrapper = mount({ value });
    expect(wrapper.findComponent(tFormControl).props('value')).toEqual(value);
  });

  it('should pass required to form control', () => {
    const required = true;
    const wrapper = mount({ required });
    expect(wrapper.findComponent(tFormControl).props('required')).toEqual(required);
  });

  it('should pass validations to form control', () => {
    const validations = [];
    const wrapper = mount({ validations });
    expect(wrapper.findComponent(tFormControl).props('validations')).toEqual(validations);
  });

  it('should pass block to form control', () => {
    const block = true;
    const wrapper = mount({ block });
    expect(wrapper.findComponent(tFormControl).props('block')).toEqual(block);
  });

  it('should form control query for a select', () => {
    const wrapper = mount();
    expect(wrapper.findComponent(tFormControl).props('formControlElSelector')).toEqual('select');
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

  it('should optionally set a name', () => {
    const name = 'fruit';
    const wrapper = mount({ name });
    expect(wrapper.find('select').attributes('name')).toEqual(name);
  });

  it('should not show a placeholder by default', () => {
    const wrapper = mount();
    const firstOption = wrapper.findAll('option');
    expect(firstOption.length).toEqual(0);
  });

  it('should optionally set a placeholder', () => {
    const placeholder = 'Select';
    const wrapper = mount({ placeholder });
    const firstOption = wrapper.findAll('option').at(0);
    expect(firstOption.text()).toEqual(placeholder);
    expect(firstOption.attributes('value')).toEqual('');
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

  it('should optionally set a custom attribute', () => {
    const label = 'City';
    const wrapper = mount({ 'aria-label': label });
    expect(wrapper.findComponent(tFormControl).attributes('aria-label')).toEqual(undefined);
    expect(wrapper.find('select').attributes('aria-label')).toEqual(label);
  });
});
