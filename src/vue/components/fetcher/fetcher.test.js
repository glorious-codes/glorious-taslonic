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
  });

  it('should hide loader on fetch success', () => {
    const onFetch = simulateFetch('success');
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.findAllComponents(tLoader).length).toEqual(0);
  });

  it('should show banner on fetch error', () => {
    const onFetch = simulateFetch('error');
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.find('[data-banner-content]').text()).toEqual('Something went wrong. Please, try again.');
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

  it('should execute fetch success callback on fetch success', () => {
    const response = { some: 'data' };
    const onFetch = simulateFetch('success', { response });
    const onFetchSuccess = jest.fn();
    mountComponent({ onFetch, onFetchSuccess });
    expect(onFetchSuccess).toHaveBeenCalledWith(response);
  });

  it('should render some content', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch }, '<p>Hello</p>');
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
