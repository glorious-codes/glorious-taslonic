import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { REQUEST_ERROR_MESSAGE } from '@base/constants/form';
import { PromiseMock } from '@base/mocks/promise';
import formService from '@base/services/form/form';
import { fireEvent } from '@react/services/testing/testing';
import toasterService from '@react/services/toaster/toaster';
import { Form } from './form';

jest.useFakeTimers();

describe('Form Banner', () => {
  let container;

  function mount({
    onFetch,
    onFetchSuccess,
    onFetchError,
    onSubmit,
    onSubmitSuccess,
    onSubmitError,
    fetchErrorMessage,
    submitErrorMessage,
    submitSuccessMessage,
    submitSuccessTitle,
    children,
    ...rest
  } = {}, onMount){
    act(() => {
      ReactDOM.render(
        <Form
          onFetch={onFetch}
          onFetchSuccess={onFetchSuccess}
          onFetchError={onFetchError}
          onSubmit={onSubmit}
          onSubmitSuccess={onSubmitSuccess}
          onSubmitError={onSubmitError}
          fetchErrorMessage={fetchErrorMessage}
          submitErrorMessage={submitErrorMessage}
          submitSuccessMessage={submitSuccessMessage}
          submitSuccessTitle={submitSuccessTitle}
          {...rest}
        >
          { children }
        </Form>,
        container
      );
    });
    act(() => jest.runOnlyPendingTimers());
    process.nextTick(() => {
      onMount(container.firstChild);
    });
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  });

  it('should have base css class', done => {
    mount({}, element => {
      expect(element.classList.contains('t-form')).toEqual(true);
      done();
    });
  });

  it('should show loader on fetch', done => {
    const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    mount({ onFetch }, element => {
      const loader = element.querySelector('[data-form-loader]');
      expect(loader).toBeDefined();
      done();
    });
  });

  it('should have fetching css class on fetch', done => {
    const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    mount({ onFetch }, element => {
      expect(element.classList.contains('t-form-fetching')).toEqual(true);
      done();
    });
  });

  it('should hide loader on fetch complete', done => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    mount({ onFetch }, element => {
      const loader = element.querySelector('[data-form-loader]');
      expect(loader).toEqual(null);
      done();
    });
  });

  it('should remove fetching css class on fetch complete', done => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    mount({ onFetch }, element => {
      expect(element.classList.contains('t-form-fetching')).toEqual(false);
      done();
    });
  });

  it('should show error banner on fetch error', done => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    mount({ onFetch }, element => {
      const banner = element.querySelector('[data-form-error-banner]');
      expect(banner.textContent.includes(REQUEST_ERROR_MESSAGE)).toEqual(true);
      done();
    });
  });

  it('should remove error banner on banner close button click', done => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    mount({ onFetch }, element => {
      const closeButton = element.querySelector('[data-close-button]');
      act(() => fireEvent(closeButton, 'click'));
      const banner = element.querySelector('[data-form-error-banner]');
      expect(banner).toEqual(null);
      done();
    });
  });

  it('should have fetch failed css class on fetch error', done => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    mount({ onFetch }, element => {
      expect(element.classList.contains('t-form-fetch-failed')).toEqual(true);
      done();
    });
  });

  it('should optionally show error banner with custom message on fetch error', done => {
    const fetchErrorMessage = 'Oops!';
    const onFetch = jest.fn(() => new PromiseMock('error'));
    mount({ onFetch, fetchErrorMessage }, element => {
      const banner = element.querySelector('[data-form-error-banner]');
      expect(banner.textContent.includes(fetchErrorMessage)).toEqual(true);
      done();
    });
  });

  it('should execute fetch callback on error banner retry button click', done => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    mount({ onFetch }, element => {
      const retryButton = element.querySelector('[data-banner-trigger]');
      act(() => fireEvent(retryButton, 'click'));
      expect(onFetch).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should execute fetch error callback on fetch error', done => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    const onFetchError = jest.fn();
    mount({ onFetch, onFetchError }, () => {
      expect(onFetchError).toHaveBeenCalled();
      done();
    });
  });

  it('should execute submit callback on submit', done => {
    const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    mount({ onSubmit }, element => {
      act(() => fireEvent(element, 'submit'));
      expect(onSubmit).toHaveBeenCalled();
      done();
    });
  });

  it('should execute submit success callback on submit success', done => {
    const response = { some: 'data' };
    const onSubmit = jest.fn(() => new PromiseMock('success', { response }));
    const onSubmitSuccess = jest.fn();
    mount({ onSubmit, onSubmitSuccess }, element => {
      act(() => fireEvent(element, 'submit'));
      expect(onSubmitSuccess).toHaveBeenCalledWith(response);
      done();
    });
  });

  it('should optionally show a success title and message on submit success', done => {
    toasterService.pop = jest.fn();
    const title = 'Good Job!';
    const message = 'Form successfully sent.';
    const onSubmit = jest.fn(() => new PromiseMock('success'));
    mount({
      onSubmit,
      submitSuccessTitle: title,
      submitSuccessMessage: message
    }, element => {
      act(() => fireEvent(element, 'submit'));
      expect(toasterService.pop).toHaveBeenCalledWith({
        title,
        message,
        theme: 'success'
      });
      done();
    });
  });

  it('should execute submit error callback on submit error', done => {
    const err = { some: 'err' };
    const onSubmit = jest.fn(() => new PromiseMock('error', { err }));
    const onSubmitError = jest.fn();
    mount({ onSubmit, onSubmitError }, element => {
      act(() => fireEvent(element, 'submit'));
      expect(onSubmitError).toHaveBeenCalledWith(err);
      done();
    });
  });

  it('should show error banner on submit error', done => {
    const onSubmit = jest.fn(() => new PromiseMock('error'));
    mount({ onSubmit }, element => {
      act(() => fireEvent(element, 'submit'));
      const banner = element.querySelector('[data-form-error-banner]');
      expect(banner.textContent.includes(REQUEST_ERROR_MESSAGE)).toEqual(true);
      done();
    });
  });

  it('should optionally show error banner with custom message on submit error', done => {
    const submitErrorMessage = 'Something went wrong.';
    const onSubmit = jest.fn(() => new PromiseMock('error'));
    mount({ onSubmit, submitErrorMessage }, element => {
      act(() => fireEvent(element, 'submit'));
      const banner = element.querySelector('[data-form-error-banner]');
      expect(banner.textContent.includes(submitErrorMessage)).toEqual(true);
      done();
    });
  });

  it('should execute submit callback on error banner retry button click', done => {
    const onSubmit = jest.fn(() => new PromiseMock('error'));
    mount({ onSubmit }, element => {
      act(() => element.submit());
      const retryButton = element.querySelector('[data-banner-trigger]');
      act(() => fireEvent(retryButton, 'click'));
      expect(onSubmit).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('should render some content', done => {
    const children = <p>Hello</p>;
    mount({ children }, element => {
      const paragraph = element.querySelector('p');
      expect(paragraph.textContent).toEqual('Hello');
      done();
    });
  });

  it('should destroy form model on component unmount', done => {
    mount({}, element => {
      const formId = element.getAttribute('data-form-id');
      expect(formService.get(formId)).toBeDefined();
      ReactDOM.unmountComponentAtNode(container);
      expect(formService.get(formId)).not.toBeDefined();
      done();
    });
  });
});
