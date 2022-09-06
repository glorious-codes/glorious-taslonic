import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/banner';
import { FETCH_ERROR_MESSAGE, TRIGGER_TEXT } from '@base/constants/fetcher';
import { PromiseMock } from '@base/mocks/promise';

export function run(mount, { screen, waitFor }){
  describe('Fetcher', () => {
    it('should fetch on initialize', () => {
      const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
      const { container } = mount({ onFetch });
      const fetcherContentEl = container.querySelector('[data-fetcher-content]');
      expect(onFetch).toHaveBeenCalled();
      expect(container.firstChild).toHaveClass('t-fetcher t-fetcher-fetching');
      expect(fetcherContentEl).toHaveAttribute('aria-busy', 'true');
      expect(fetcherContentEl).toHaveAttribute('aria-live', 'polite');
      expect(fetcherContentEl).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByTitle('loading')).toBeInTheDocument();
    });

    it('should show fetcher content on fetch success', async () => {
      const response = { some: 'data' };
      const onFetch = jest.fn(() => Promise.resolve(response));
      const onFetchSuccess = jest.fn();
      const { container } = mount({ onFetch, onFetchSuccess });
      const fetcherContentEl = container.querySelector('[data-fetcher-content]');
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('t-fetcher-fetching');
      });
      await waitFor(() => {
        expect(container.firstChild).not.toHaveClass('t-fetcher-fetching');
        expect(fetcherContentEl).toHaveAttribute('aria-busy', 'false');
        expect(fetcherContentEl).toHaveAttribute('aria-live', 'polite');
        expect(fetcherContentEl).toHaveAttribute('aria-hidden', 'false');
        expect(screen.queryByTitle('loading')).not.toBeInTheDocument();
        expect(screen.getByText('Content Mock')).toBeInTheDocument();
        expect(onFetchSuccess).toHaveBeenCalledWith(response);
      });
    });

    it('should show default error message on fetch error', async () => {
      const err = { some: 'err' };
      const onFetch = jest.fn(() => Promise.reject(err));
      const onFetchError = jest.fn();
      const { container } = mount({ onFetch, onFetchError });
      const fetcherContentEl = container.querySelector('[data-fetcher-content]');
      await waitFor(() => {
        expect(container.firstChild).toHaveClass('t-fetcher-fetching');
      });
      await waitFor(() => {
        expect(container.firstChild).not.toHaveClass('t-fetcher-fetching');
        expect(fetcherContentEl).toHaveAttribute('aria-busy', 'false');
        expect(fetcherContentEl).toHaveAttribute('aria-live', 'polite');
        expect(fetcherContentEl).toHaveAttribute('aria-hidden', 'true');
        expect(screen.queryByTitle('loading')).not.toBeInTheDocument();
        expect(screen.getByText(FETCH_ERROR_MESSAGE)).toBeInTheDocument();
        expect(onFetchError).toHaveBeenCalledWith(err);
      });
    });

    it('should optionally show banner with custom message on fetch error', async () => {
      const onFetch = jest.fn(() => Promise.reject());
      const fetchErrorMessage = 'Ops...';
      mount({ onFetch, fetchErrorMessage });
      await waitFor(() => {
        expect(screen.getByText(fetchErrorMessage)).toBeInTheDocument();
      });
    });

    it('should fetch again on banner retry button click', async () => {
      const onFetch = jest.fn(() => Promise.reject());
      const { userEvent } = mount({ onFetch });
      await waitFor(() => {
        expect(screen.getByLabelText(CLOSE_BUTTON_ARIA_LABEL)).toBeInTheDocument();
      });
      userEvent.click(screen.getByRole('button',{ name: TRIGGER_TEXT }));
      expect(onFetch).toHaveBeenCalledTimes(2);
    });

    it('should remove banner on banner close button click', async () => {
      const onFetch = jest.fn(() => Promise.reject());
      const { userEvent } = mount({ onFetch });
      await waitFor(() => {
        expect(screen.getByText(FETCH_ERROR_MESSAGE)).toBeInTheDocument();
      });
      userEvent.click(screen.getByLabelText(CLOSE_BUTTON_ARIA_LABEL));
      await waitFor(() => {
        expect(screen.queryByText(FETCH_ERROR_MESSAGE)).not.toBeInTheDocument();
      });
    });

    it('should execute mount callback on mount passing fetcher instance if callback has been given', done => {
      const onFetch = jest.fn(() => Promise.resolve());
      const onMount = jest.fn(fetcher => {
        fetcher.fetch();
        expect(onFetch).toHaveBeenCalledTimes(2);
        done();
      });
      mount({ onFetch, onMount });
    });
  });
}
