import { mount } from '@vue/test-utils';
import { REQUEST_ERROR_MESSAGE } from '@base/constants/form';
import { PromiseMock } from '@base/mocks/promise';
import formService from '@base/services/form/form';
import toasterService from '@vue/services/toaster/toaster';
import { form } from './form';

jest.useFakeTimers();

describe('Form', () => {
  let wrapper;

  function mountComponent(propsData = {}, content = ''){
    wrapper = mount(form, { propsData, slots: { default: content } });
    jest.runOnlyPendingTimers();
    return wrapper;
  }

  afterEach(() => {
    wrapper.destroy();
  });

  it('should have base css class', () => {
    wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-form');
  });

  it('should show loader on fetch', () => {
    const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('[data-form-loader]').length).toEqual(1);
    });
  });

  it('should have fetching css class on fetch', () => {
    const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).toContain('t-form-fetching');
    });
  });

  it('should hide loader on fetch complete', () => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('[data-form-loader]').length).toEqual(0);
    });
  });

  it('should remove fetching css class on fetch complete', () => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).not.toContain('t-form-fetching');
    });
  });

  it('should show error banner on fetch error', () => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      const banner = wrapper.find('[data-form-error-banner]');
      expect(banner.text().includes(REQUEST_ERROR_MESSAGE)).toEqual(true);
    });
  });

  it('should remove error banner on banner close button click', () => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      const closeButton = wrapper.find('[data-close-button]');
      closeButton.trigger('click');
      wrapper.vm.$nextTick(() => {
        const banner = wrapper.vm.$el.querySelector('[data-form-error-banner]');
        expect(banner).toEqual(null);
      });
    });
  });

  it('should have fetch failed css class on fetch error', () => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).toContain('t-form-fetch-failed');
    });
  });

  it('should optionally show error banner with custom message on fetch error', () => {
    const fetchErrorMessage = 'Oops!';
    const onFetch = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onFetch, fetchErrorMessage });
    wrapper.vm.$nextTick(() => {
      const banner = wrapper.find('[data-form-error-banner]');
      expect(banner.text().includes(fetchErrorMessage)).toEqual(true);
    });
  });

  it('should execute fetch callback on error banner retry button click', () => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onFetch });
    wrapper.vm.$nextTick(() => {
      const retryButton = wrapper.find('[data-banner-trigger]');
      retryButton.trigger('click');
      expect(onFetch).toHaveBeenCalledTimes(2);
    });
  });

  it('should execute fetch error callback on fetch error', () => {
    const err = { some: 'err' };
    const onFetch = jest.fn(() => new PromiseMock('error', { err }));
    const onFetchError = jest.fn();
    mountComponent({ onFetch, onFetchError });
    expect(onFetchError).toHaveBeenCalledWith(err);
  });

  it('should execute submit callback on submit', () => {
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    wrapper = mountComponent({ onSubmit });
    wrapper.find('form').trigger('submit');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should execute submit success callback on submit success', () => {
    const response = { some: 'data' };
    const onSubmit = jest.fn(() => new PromiseMock('success', { response }));
    const onSubmitSuccess = jest.fn();
    wrapper = mountComponent({ onSubmit, onSubmitSuccess });
    wrapper.find('form').trigger('submit');
    expect(onSubmitSuccess).toHaveBeenCalledWith(response);
  });

  it('should optionally show a success title and message on submit success', () => {
    toasterService.pop = jest.fn();
    const title = 'Good Job!';
    const message = 'Form successfully sent.';
    const onSubmit = jest.fn(() => new PromiseMock('success'));
    wrapper = mountComponent({
      onSubmit,
      submitSuccessTitle: title,
      submitSuccessMessage: message
    });
    wrapper.find('form').trigger('submit');
    expect(toasterService.pop).toHaveBeenCalledWith({
      title,
      message,
      theme: 'success'
    });
  });

  it('should execute submit error callback on submit error', () => {
    const err = { some: 'err' };
    const onSubmit = jest.fn(() => new PromiseMock('error', { err }));
    const onSubmitError = jest.fn();
    wrapper = mountComponent({ onSubmit, onSubmitError });
    wrapper.find('form').trigger('submit');
    expect(onSubmitError).toHaveBeenCalledWith(err);
  });

  it('should show error banner on submit error', () => {
    const onSubmit = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onSubmit });
    wrapper.find('form').trigger('submit');
    wrapper.vm.$nextTick(() => {
      const banner = wrapper.find('[data-form-error-banner]');
      expect(banner.text().includes(REQUEST_ERROR_MESSAGE)).toEqual(true);
    });
  });

  it('should optionally show error banner with custom message on submit error', () => {
    const submitErrorMessage = 'Something went wrong.';
    const onSubmit = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onSubmit, submitErrorMessage });
    wrapper.find('form').trigger('submit');
    wrapper.vm.$nextTick(() => {
      const banner = wrapper.find('[data-form-error-banner]');
      expect(banner.text().includes(submitErrorMessage)).toEqual(true);
    });
  });

  it('should execute submit callback on error banner retry button click', () => {
    const onSubmit = jest.fn(() => new PromiseMock('error'));
    wrapper = mountComponent({ onSubmit });
    wrapper.find('form').trigger('submit');
    wrapper.vm.$nextTick(() => {
      const banner = wrapper.find('[data-banner-trigger]');
      banner.trigger('click');
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });
  });

  it('should render some content', () => {
    wrapper = mountComponent({}, '<p>Hello</p>');
    expect(wrapper.find('p').text()).toEqual('Hello');
  });

  it('should destroy form model on component unmount', () => {
    wrapper = mountComponent();
    expect(formService.get(wrapper.vm.form.id)).toBeDefined();
    wrapper.destroy();
    expect(formService.get()).toEqual({});
  });
});
