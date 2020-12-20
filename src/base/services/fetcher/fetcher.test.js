import { Fetcher } from '@base/models/fetcher/fetcher';
import fetcherService from './fetcher';

jest.mock('@base/models/fetcher/fetcher');

describe('Fetcher Service', () => {
  it('should build a fetcher', () => {
    const onFetch = jest.fn();
    const onFetchError = jest.fn();
    const onFetchSuccess = jest.fn();
    const onProcessChange = jest.fn();
    fetcherService.build({ onFetch, onFetchError, onFetchSuccess, onProcessChange });
    expect(Fetcher).toHaveBeenCalledWith({ onFetch, onFetchError, onFetchSuccess, onProcessChange });
  });

  it('should build base css class', () => {
    expect(fetcherService.buildCssClasses()).toEqual('t-fetcher');
  });

  it('should optionally build fetching css class', () => {
    expect(fetcherService.buildCssClasses({ fetching: true }).includes('t-fetcher-fetching')).toEqual(true);
  });

  it('should optionally build fetch failed css class', () => {
    expect(fetcherService.buildCssClasses({ fetchFailed: true }).includes('t-fetcher-fetch-failed')).toEqual(true);
  });

  it('should get fetch message', () => {
    expect(fetcherService.getMessage('FETCH_ERROR_MESSAGE')).toEqual('Something went wrong. Please, try again.');
  });
});
