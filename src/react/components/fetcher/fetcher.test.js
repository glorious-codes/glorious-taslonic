import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp } from '@react/services/testing/testing';
import { PromiseMock } from '@base/mocks/promise';
import { Loader } from '@react/components/loader/loader';
import { Fetcher } from './fetcher';

describe('Fetcher', () => {
  function mountComponent(props = {}, content = ''){
    return mount(
      <Fetcher
        onFetch={props.onFetch}
        onFetchSuccess={props.onFetchSuccess}
        onFetchError={props.onFetchError}
        fetchErrorMessage={props.fetchErrorMessage}
      >
        { content }
      </Fetcher>
    );
  }

  function simulateFetch(responseType, options){
    return jest.fn(() => new PromiseMock(responseType, options));
  }

  it('should have base css class', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch });
    expect(getRootElProp(wrapper, 'className')).toContain('t-fetcher');
  });

  it('should have fetching css class on fetch', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch });
    expect(getRootElProp(wrapper, 'className')).toContain('t-fetcher-fetching');
  });

  it('should show loader on fetch', () => {
    const onFetch = simulateFetch('success', { shouldAbort: true });
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.find(Loader).length).toEqual(1);
  });

  it('should hide loader on fetch success', () => {
    const onFetch = simulateFetch('success');
    const wrapper = mountComponent({ onFetch });
    expect(wrapper.find(Loader).length).toEqual(0);
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

  it('should fetch again on banner retry button click', done => {
    const onFetch = simulateFetch('error');
    const wrapper = mountComponent({ onFetch });
    process.nextTick(() => {
      wrapper.find('[data-banner-trigger]').at(0).simulate('click');
      expect(onFetch).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should remove banner on banner close button click', () => {
    const onFetch = simulateFetch('error');
    const wrapper = mountComponent({ onFetch });
    wrapper.find('[data-close-button]').at(0).simulate('click');
    expect(wrapper.find('[data-fetcher-error-banner]').length).toEqual(0);
  });

  it('should execute fetch success callback on fetch success', () => {
    const response = { some: 'data' };
    const onFetch = simulateFetch('success', { response });
    const onFetchSuccess = jest.fn();
    mountComponent({ onFetch, onFetchSuccess });
    expect(onFetchSuccess).toHaveBeenCalledWith(response);
  });

  it('should render some content', () => {
    const onFetch = simulateFetch('success', { response: { some: 'data' } });
    const onFetchSuccess = jest.fn();
    const wrapper = mountComponent({ onFetch, onFetchSuccess }, <p>Hello</p>);
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
