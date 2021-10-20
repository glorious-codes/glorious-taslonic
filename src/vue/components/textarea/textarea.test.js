import { shallowMount } from '@vue/test-utils';
import { tFormControl } from '@vue/components/form-control/form-control';
import { tTextarea } from './textarea';

describe('Select', () => {
  function mount({ listeners = {}, ...propsData } = {}){
    return shallowMount(tTextarea, { propsData, listeners });
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

  it('should form control query for a textarea', () => {
    const wrapper = mount();
    expect(wrapper.findComponent(tFormControl).props('formControlElSelector')).toEqual('textarea');
  });

  it('should not be disabled by default', () => {
    const wrapper = mount();
    expect(wrapper.find('textarea').attributes('disabled')).not.toBeDefined();
  });

  it('should optionally set select as disabled', () => {
    const wrapper = mount({ disabled: true });
    expect(wrapper.find('textarea').attributes('disabled')).toEqual('disabled');
  });

  it('should optionally autofocus textarea', () => {
    const wrapper = mount({ autofocus: true });
    expect(wrapper.find('textarea').attributes('autofocus')).toEqual('autofocus');
  });

  it('should optionally set a name', () => {
    const name = 'fruit';
    const wrapper = mount({ name });
    expect(wrapper.find('textarea').attributes('name')).toEqual(name);
  });

  it('should optionally set visible columns', () => {
    const cols = '15';
    const wrapper = mount({ cols });
    expect(wrapper.find('textarea').attributes('cols')).toEqual(cols);
  });

  it('should optionally set visible rows', () => {
    const rows = '8';
    const wrapper = mount({ rows });
    expect(wrapper.find('textarea').attributes('rows')).toEqual(rows);
  });

  it('should not show a placeholder by default', () => {
    const wrapper = mount();
    expect(wrapper.find('textarea').attributes('placeholder')).toEqual(undefined);
  });

  it('should optionally set a placeholder', () => {
    const placeholder = 'Type anything...';
    const wrapper = mount({ placeholder });
    expect(wrapper.find('textarea').attributes('placeholder')).toEqual(placeholder);
  });

  it('should optionally set select listeners', () => {
    const onBlur = jest.fn();
    const wrapper = mount({ listeners: { blur: onBlur } });
    wrapper.find('textarea').trigger('blur');
    expect(onBlur).toHaveBeenCalled();
  });

  it('should optionally set a custom attribute', () => {
    const label = 'Notes';
    const wrapper = mount({ 'aria-label': label });
    expect(wrapper.findComponent(tFormControl).attributes('aria-label')).toEqual(undefined);
    expect(wrapper.find('textarea').attributes('aria-label')).toEqual(label);
  });
});
