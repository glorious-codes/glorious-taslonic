import { shallowMount } from '@vue/test-utils';
import { REQUIRED_ERROR_MESSAGE } from '@base/constants/messages';
import { formControl } from './form-control';

describe('Form Control', () => {
  function mount(propsData = {}, content = '<input type="text" />'){
    propsData.querySelector = propsData.querySelector || 'input';
    return shallowMount(formControl, { propsData, slots: { default: content } });
  }

  function fillInput(wrapper, value){
    const input = wrapper.find('input');
    if(value) input.setValue(value);
    input.trigger('input');
    input.trigger('blur');
  }

  function getErrorMessageEl(wrapper){
    return wrapper.find('[data-form-control-error-message]');
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-form-control');
  });

  it('should show error message if form control is invalid on blur', done => {
    const wrapper = mount({}, '<input type="text" required />');
    fillInput(wrapper, '');
    wrapper.vm.$nextTick(() => {
      expect(getErrorMessageEl(wrapper).text()).toEqual(REQUIRED_ERROR_MESSAGE);
      done();
    });
  });

  it('should append invalid css class if form control gets invalid', done => {
    const wrapper = mount({}, '<input type="text" required />');
    fillInput(wrapper, '');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).toContain('t-form-control-invalid');
      done();
    });
  });

  it('should optionally set form control as blocked', () => {
    const wrapper = mount({ blocked: true });
    expect(wrapper.classes()).toContain('t-form-control-blocked');
  });

  it('should emit input value when user fills input', () => {
    const value = 'Rafael';
    const wrapper = mount();
    wrapper.vm.$parent.$emit = jest.fn();
    fillInput(wrapper, value);
    expect(wrapper.vm.$parent.$emit).toHaveBeenCalledWith('input', value);
  });

  it('should accept custom validations', done => {
    const errorMessage = 'Enter a valid name';
    const validations = [{ isValid: data => data === 'Rafael', errorMessage }];
    const wrapper = mount({ validations });
    fillInput(wrapper, 'Fernando');
    wrapper.vm.$nextTick(() => {
      expect(getErrorMessageEl(wrapper).text()).toEqual(errorMessage);
      done();
    });
  });

  it('should optionally set initial value', done => {
    const value = 'Rafael';
    const wrapper = mount({ value });
    wrapper.find('input').trigger('blur');
    wrapper.vm.$nextTick(() => {
      expect(getErrorMessageEl(wrapper).text()).toEqual('');
      done();
    });
  });

  it('should optionally set value programmatically', done => {
    const value = 'Rafael';
    const wrapper = mount();
    wrapper.setProps({ value });
    wrapper.find('input').trigger('blur');
    wrapper.vm.$nextTick(() => {
      expect(getErrorMessageEl(wrapper).text()).toEqual('');
      done();
    });
  });
});
