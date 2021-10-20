import { shallowMount } from '@vue/test-utils';
import { tFormControl } from '@vue/components/form-control/form-control';
import { tInput } from './input';

describe('Input', () => {
  function mount({ listeners = {}, ...propsData } = {}){
    return shallowMount(tInput, { propsData, listeners });
  }

  it('should pass value to form control', () => {
    const value = 'Rafael';
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

  it('should form control query for an input', () => {
    const wrapper = mount();
    expect(wrapper.findComponent(tFormControl).props('formControlElSelector')).toEqual('input');
  });

  it('should input contain an attribute type as text by default', () => {
    const wrapper = mount();
    expect(wrapper.find('input').attributes('type')).toEqual('text');
  });

  it('should type be text if an invalid type has been given', () => {
    const wrapper = mount({ type: 'checkbox' });
    expect(wrapper.find('input').attributes('type')).toEqual('text');
  });

  it('should optionally set an input type', () => {
    const type = 'password';
    const wrapper = mount({ type });
    expect(wrapper.find('input').attributes('type')).toEqual(type);
  });

  it('should optionally set an input name', () => {
    const name = 'username';
    const wrapper = mount({ name });
    expect(wrapper.find('input').attributes('name')).toEqual(name);
  });

  it('should optionally set a placeholder', () => {
    const placeholder = 'Enter a name';
    const wrapper = mount({ placeholder });
    expect(wrapper.find('input').attributes('placeholder')).toEqual(placeholder);
  });

  it('should not be disabled by default', () => {
    const wrapper = mount();
    expect(wrapper.find('input').attributes('disabled')).not.toBeDefined();
  });

  it('should optionally set input as disabled', () => {
    const wrapper = mount({ disabled: true });
    expect(wrapper.find('input').attributes('disabled')).toEqual('disabled');
  });

  it('should optionally set input listeners', () => {
    const onBlur = jest.fn();
    const wrapper = mount({ listeners: { blur: onBlur } });
    wrapper.find('input').trigger('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('should optionally set a custom attribute', () => {
    const label = 'Email address';
    const wrapper = mount({ 'aria-label': label });
    expect(wrapper.findComponent(tFormControl).attributes('aria-label')).toEqual(undefined);
    expect(wrapper.find('input').attributes('aria-label')).toEqual(label);
  });
});
