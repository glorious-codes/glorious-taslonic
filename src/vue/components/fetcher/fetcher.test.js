import { mount } from '@vue/test-utils';
import { PromiseMock } from '@base/mocks/promise';
import { tBanner } from '@vue/components/banner/banner';
import { tLoader } from '@vue/components/loader/loader';
import { tFetcher } from './fetcher';

describe('Fetcher', () => {
  function mountComponent(propsData = {}, content = ''){
    return mount(tFetcher, { propsData, slots: { default: content } });
  }

  function simulateFetch(responseType, options){
    return jest.fn(() => new PromiseMock(responseType, options));
  }

  it('should have base css class', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.classes()).toContain('t-fetcher');
  });

  it('should have fetching css class on fetch', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.classes()).toContain('t-fetcher-fetching');
  });

  it('should show loader on fetch', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.findAllComponents(tLoader).length).toEqual(1);
    expect(wrapper.find('[data-fetcher-content]').attributes('aria-hidden')).toEqual('true');
  });

  it('should hide loader on fetch success', () => {
    const onFetch = simulateFetch('success');
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.findAllComponents(tLoader).length).toEqual(0);
    expect(wrapper.find('[data-fetcher-content]').attributes('aria-hidden')).toEqual('false');
  });

  it('should show banner on fetch error', () => {
    const onFetch = simulateFetch('error');
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.find('[data-banner-content]').text()).toEqual('Something went wrong. Please, try again.');
    expect(wrapper.find('[data-fetcher-content]').attributes('aria-hidden')).toEqual('true');
  });

  it('should optionally show banner with custom message on fetch error', () => {
    const onFetch = simulateFetch('error');
    const fetchErrorMessage = 'Ops...';
    const wrapper = mountComponent({ onFetch, fetchErrorMessage });
    expect(wrapper.find('[data-banner-content]').text()).toEqual(fetchErrorMessage);
  });

  it('should fetch again on banner retry button click', () => {
    const onFetch = simulateFetch('error');
    const wrapper = mountComponent({ onFetch });
    wrapper.find('[data-banner-trigger]').trigger('click');
    expect(onFetch).toHaveBeenCalledTimes(2);
  });

  it('should remove banner on banner close button click', () => {
    const onFetch = simulateFetch('error');
    const wrapper = mountComponent({ onFetch });
    wrapper.find('[data-close-button]').trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAllComponents(tBanner).length).toEqual(0);
    });
  });

  it('should execute fetch error callback on fetch error', () => {
    const err = { status: 404 };
    const onFetch = simulateFetch('error', { err });
    const onFetchError = jest.fn();
    mountComponent({ onFetch, onFetchError });
    expect(onFetchError).toHaveBeenCalledWith(err);
  });

  it('should execute fetch success callback on fetch success', () => {
    const response = { some: 'data' };
    const onFetch = simulateFetch('success', { response });
    const onFetchSuccess = jest.fn();
    mountComponent({ onFetch, onFetchSuccess });
    expect(onFetchSuccess).toHaveBeenCalledWith(response);
  });

  it('should execute mount callback on mount passing fetcher instance if callback has been given', () => {
    const onFetch = simulateFetch('success');
    const onMount = jest.fn(fetcher => {
      fetcher.fetch();
      expect(onFetch).toHaveBeenCalledTimes(2);
    });
    mountComponent({ onFetch, onMount });
    expect(onMount).toHaveBeenCalled();
  });

  it('should render some content', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch }, '<p>Hello</p>');
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
