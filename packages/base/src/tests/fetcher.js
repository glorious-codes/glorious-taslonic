import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/banner';
import { FETCH_ERROR_MESSAGE, TRIGGER_TEXT } from '@base/constants/fetcher';
import { PendingPromiseMock } from '@base/mocks/promise';

export function run(mount, { screen, waitFor, within }){
  describe('Fetcher', () => {
    it('should fetch on initialize', async () => {
      const onFetch = jest.fn(() => new PendingPromiseMock());
      const { container } = mount({ onFetch });
      const fetcherContentEl = container.querySelector('[data-fetcher-content]');
      expect(onFetch).toHaveBeenCalled();
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('t-fetcher t-fetcher-fetching');
        expect(fetcherContentEl).toHaveAttribute('aria-busy', 'true');
        expect(fetcherContentEl).toHaveAttribute('aria-live', 'polite');
        expect(screen.getByTitle('loading')).toBeInTheDocument();
      });
    });

    it('should show fetcher content on fetch success', async () => {
      let resolveFetchPromise;
      const response = { some: 'data' };
      const fetchPromise = new Promise(resolve => { resolveFetchPromise = resolve });
      const onFetch = jest.fn(() => fetchPromise);
      const onFetchSuccess = jest.fn();
      const { container } = mount({ onFetch, onFetchSuccess });
      const fetcherContentEl = container.querySelector('[data-fetcher-content]');
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('t-fetcher-fetching');
      });
      resolveFetchPromise(response);
      await waitFor(() => {
        expect(container.firstChild).not.toHaveClass('t-fetcher-fetching');
        expect(fetcherContentEl).toHaveAttribute('aria-busy', 'false');
        expect(fetcherContentEl).toHaveAttribute('aria-live', 'polite');
        expect(screen.queryByTitle('loading')).not.toBeInTheDocument();
        expect(screen.getByText('Some content')).toBeInTheDocument();
        expect(onFetchSuccess).toHaveBeenCalledWith(response);
      });
    });

    it('should show default error message on fetch error', async () => {
      let rejectFetchPromise;
      const err = {};
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject });
      const onFetch = jest.fn(() => fetchPromise);
      const onFetchError = jest.fn();
      const { container } = mount({ onFetch, onFetchError });
      const fetcherContentEl = container.querySelector('[data-fetcher-content]');
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('t-fetcher-fetching');
      });
      rejectFetchPromise(err);
      await waitFor(() => {
        expect(container.firstChild).not.toHaveClass('t-fetcher-fetching');
        expect(fetcherContentEl).toHaveAttribute('aria-busy', 'false');
        expect(fetcherContentEl).toHaveAttribute('aria-live', 'polite');
        expect(screen.queryByTitle('loading')).not.toBeInTheDocument();
        expect(screen.getByText(FETCH_ERROR_MESSAGE)).toBeInTheDocument();
        expect(onFetchError).toHaveBeenCalledWith(err);
      });
    });

    it('should optionally show banner with custom message on fetch error', async () => {
      let rejectFetchPromise;
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject });
      const onFetch = jest.fn(() => fetchPromise);
      const fetchErrorMessage = 'Ops...';
      mount({ onFetch, fetchErrorMessage });
      rejectFetchPromise();
      await waitFor(() => {
        expect(screen.getByText(fetchErrorMessage)).toBeInTheDocument();
      });
    });

    it('should optionally show banner with custom dynamic message on fetch error', async () => {
      let rejectFetchPromise;
      const message = 'Ops, resource not found.'
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject; });
      const onFetch = jest.fn(() => fetchPromise);
      const { userEvent } = await mount({ onFetch });
      rejectFetchPromise({ message });
      await waitFor(() => {
        const fetcherErrorBannerElement = document.querySelector('[data-fetcher-error-banner]');
        expect(within(fetcherErrorBannerElement).getByText(message)).toBeInTheDocument();
      });
    });

    it('should fetch again on banner retry button click', async () => {
      let requests = 0;
      let rejectFetchPromise;
      const fetchPromises = {
        1: new Promise((resolve, reject) => { rejectFetchPromise = reject; }),
        2: new PendingPromiseMock()
      }
      const onFetch = jest.fn(() => {
        ++requests;
        return fetchPromises[requests];
      });
      const { userEvent } = mount({ onFetch });
      rejectFetchPromise();
      await waitFor(() => {
        expect(screen.getByLabelText(CLOSE_BUTTON_ARIA_LABEL)).toBeInTheDocument();
      });
      userEvent.click(screen.getByRole('button',{ name: TRIGGER_TEXT }));
      expect(onFetch).toHaveBeenCalledTimes(2);
    });

    it('should remove banner on banner close button click', async () => {
      let rejectFetchPromise;
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject });
      const onFetch = jest.fn(() => fetchPromise);
      const { userEvent } = mount({ onFetch });
      rejectFetchPromise()
      await waitFor(() => {
        expect(screen.getByText(FETCH_ERROR_MESSAGE)).toBeInTheDocument();
      });
      userEvent.click(screen.getByLabelText(CLOSE_BUTTON_ARIA_LABEL));
      await waitFor(() => {
        expect(screen.queryByText(FETCH_ERROR_MESSAGE)).not.toBeInTheDocument();
      });
    });

    it('should refetch programmatically', async () => {
      let fetcher;
      let requests = 0;
      let resolveFirstFetchPromise;
      let resolveSecondFetchPromise;
      const fetcherTextContent = 'Some content';
      const fetchPromises = {
        1: new Promise(resolve => { resolveFirstFetchPromise = resolve; }),
        2: new Promise(resolve => { resolveSecondFetchPromise = resolve; }),
      }
      const onFetch = jest.fn(() => {
        ++requests;
        return fetchPromises[requests];
      });
      const onMount = mountedFetcher => { fetcher = mountedFetcher };
      const { container } = mount({ onFetch, onMount });
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('t-fetcher-fetching');
        expect(screen.queryByText(fetcherTextContent)).not.toBeInTheDocument();
      });
      resolveFirstFetchPromise();
      await waitFor(() => {
        expect(screen.getByText(fetcherTextContent)).toBeInTheDocument();
      });
      await waitFor(() => {
        fetcher.fetch();
      });
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('t-fetcher-fetching');
        expect(screen.queryByText(fetcherTextContent)).not.toBeInTheDocument();
      });
      resolveSecondFetchPromise();
      await waitFor(() => {
        expect(screen.getByText(fetcherTextContent)).toBeInTheDocument();
      });
      expect(onFetch).toHaveBeenCalledTimes(2);
    });

    it('should accept custom attributes', async () => {
      const attrName = 'data-any-custom-attr';
      const attrValue = 'some-value';
      const { container } = await mount({ [attrName]: attrValue });
      const fetcherEl = container.firstChild;
      expect(fetcherEl).toHaveAttribute(attrName, attrValue);
    });
  });
}
