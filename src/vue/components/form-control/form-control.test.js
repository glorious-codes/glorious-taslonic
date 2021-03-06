import { shallowMount } from '@vue/test-utils';
import { REQUIRED_ERROR_MESSAGE } from '@base/constants/messages';
import { tFormControl } from './form-control';

jest.useFakeTimers();

describe('Form Control', () => {
  function mount(propsData = {}, content = '<input type="text" />'){
    propsData.formControlElSelector = propsData.formControlElSelector || 'input';
    const wrapper = shallowMount(tFormControl, { propsData, slots: { default: content } });
    jest.runOnlyPendingTimers();
    return wrapper;
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

  it('should append invalid css class if form control gets invalid', done => {
    const wrapper = mount({}, '<input type="text" required />');
    fillInput(wrapper, '');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).toContain('t-form-control-invalid');
      done();
    });
  });

  it('should optionally set form control as block', () => {
    const wrapper = mount({ block: true });
    expect(wrapper.classes()).toContain('t-form-control-block');
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

  it('should optionally set required', done => {
    const required = true;
    const wrapper = mount({ required });
    wrapper.find('input').trigger('blur');
    wrapper.vm.$nextTick(() => {
      expect(getErrorMessageEl(wrapper).text()).toEqual(REQUIRED_ERROR_MESSAGE);
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

  it('should optionally set required programmatically', done => {
    const required = true;
    const wrapper = mount();
    wrapper.find('input').trigger('blur');
    wrapper.setProps({ required });
    wrapper.vm.$nextTick(() => {
      expect(getErrorMessageEl(wrapper).text()).toEqual(REQUIRED_ERROR_MESSAGE);
      done();
    });
  });

  it('should destroy form control model on unmount', () => {
    const wrapper = mount();
    wrapper.vm.formControl.destroy = jest.fn();
    wrapper.destroy();
    expect(wrapper.vm.formControl.destroy).toHaveBeenCalled();
  });
});
