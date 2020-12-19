import { PromiseMock } from '@base/mocks/promise';
import { Fetcher } from './fetcher';

describe('Fetcher', () => {
  it('should execute fetch callback on initialize', () => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    new Fetcher({ onFetch });
    expect(onFetch).toHaveBeenCalled();
  });

  it('should execute process change callback on fetch', () => {
    const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const onProcessChange = jest.fn();
    new Fetcher({ onFetch, onProcessChange });
    expect(onProcessChange).toHaveBeenCalledWith({ isFetching: true });
  });

  it('should execute fetch success callback on fecth success', () => {
    const responseMock = { some: 'data' };
    const onFetch = jest.fn(() => new PromiseMock('success', { response: responseMock }));
    const onFetchSuccess = jest.fn();
    new Fetcher({ onFetch, onFetchSuccess });
    expect(onFetchSuccess).toHaveBeenCalledWith(responseMock);
  });

  it('should execute process change callback on fetch success', () => {
    const onFetch = jest.fn(() => new PromiseMock('success'));
    const onProcessChange = jest.fn();
    new Fetcher({ onFetch, onProcessChange });
    expect(onProcessChange).toHaveBeenCalledWith({ fetchSucceeded: true });
  });

  it('should execute fetch error callback on fecth error', () => {
    const errMock = { some: 'err' };
    const onFetch = jest.fn(() => new PromiseMock('error', { err: errMock }));
    const onFetchError = jest.fn();
    new Fetcher({ onFetch, onFetchError });
    expect(onFetchError).toHaveBeenCalledWith(errMock);
  });

  it('should execute process change callback on fetch error', () => {
    const onFetch = jest.fn(() => new PromiseMock('error'));
    const onProcessChange = jest.fn();
    new Fetcher({ onFetch, onProcessChange });
    expect(onProcessChange).toHaveBeenCalledWith({ fetchFailed: true });
  });

  it('should execute fetch programatically', () => {
    const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
    const fetcher = new Fetcher({ onFetch });
    fetcher.fetch();
    expect(onFetch).toHaveBeenCalledTimes(2);
  });
});
