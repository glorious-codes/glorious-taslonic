import { pause } from '@base/services/testing/testing';
import { ERROR_MESSAGES, FIELD_LABELS, SUBMIT_BUTTON_TEXT, customValidations, fruits } from '@base/mocks/form';
import { REQUEST_ERROR_MESSAGE } from '@base/constants/form';
import { CLOSE_BUTTON_ARIA_LABEL, TRIGGER_TEXT } from '@base/constants/form-banner';
import { TITLE_TEXT as LOADER_TITLE_TEXT } from '@base/constants/loader';
import { REQUIRED_ERROR_MESSAGE }  from '@base/constants/messages';
import { PendingPromiseMock } from '@base/mocks/promise';
import formService from '@base/services/form/form';

export function run(mountComponent, { screen, waitFor, within }){
  describe('Form', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    it('should have base css class', async () => {
      const { container } = await mount();
      const formEl = container.firstChild;
      expect(formEl).toHaveClass('t-form');
    });

    it('should fetch on initialize if fetch listener has been given', async () => {
      const onFetch = jest.fn(() => new PendingPromiseMock());
      const { container } = await mount({ onFetch });
      const formEl = container.firstChild;
      const formContentEl = container.querySelector('[data-form-content]');
      expect(formEl).toHaveClass('t-form-fetching');
      expect(formContentEl).toHaveAttribute('aria-busy', 'true');
      expect(formContentEl).toHaveAttribute('aria-live', 'polite');
      expect(screen.getByTitle('loading')).toBeInTheDocument();
    });

    it('should handle fetch success', async () => {
      let resolveFetchPromise;
      const response = { some: 'response' };
      const fetchPromise = new Promise(resolve => { resolveFetchPromise = resolve; });
      const onFetch = jest.fn(() => fetchPromise);
      const onFetchSuccess = jest.fn();
      const { container } = await mount({ onFetch, onFetchSuccess });
      const formEl = container.firstChild;
      const formContentEl = container.querySelector('[data-form-content]');
      resolveFetchPromise(response);
      await waitFor(() => {
        expect(formEl).not.toHaveClass('t-form-fetching');
      });
      expect(formContentEl).toHaveAttribute('aria-busy', 'false');
      expect(formContentEl).toHaveAttribute('aria-live', 'polite');
      expect(onFetchSuccess).toHaveBeenCalledWith(response);
      expect(screen.queryByTitle('loading')).not.toBeInTheDocument();
    });

    it('should handle fetch error', async () => {
      let rejectFetchPromise;
      const err = { some: 'err' };
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject; });
      const onFetch = jest.fn(() => fetchPromise);
      const onFetchError = jest.fn();
      const { container } = await mount({ onFetch, onFetchError });
      const formEl = container.firstChild;
      const formContentEl = container.querySelector('[data-form-content]');
      rejectFetchPromise(err);
      await waitFor(() => {
        expect(formEl).toHaveClass('t-form-fetch-failed');
      });
      expect(formContentEl).toHaveAttribute('aria-busy', 'false');
      expect(formContentEl).toHaveAttribute('aria-live', 'polite');
      expect(onFetchError).toHaveBeenCalledWith(err);
      expect(screen.queryByTitle('loading')).not.toBeInTheDocument();
      expect(screen.getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument();
    });

    it('should remove error banner on banner close button click', async () => {
      let rejectFetchPromise;
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject; });
      const onFetch = jest.fn(() => fetchPromise);
      const { userEvent } = await mount({ onFetch });
      rejectFetchPromise();
      await waitFor(() => {
        expect(screen.getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument();
      });
      expect(getBanner()).toHaveClass('t-banner-danger');
      userEvent.click(screen.getByLabelText(CLOSE_BUTTON_ARIA_LABEL));
      await waitFor(() => {
        expect(screen.queryByText(REQUEST_ERROR_MESSAGE)).not.toBeInTheDocument();
      });
    });

    it('should optionally show error banner with custom message on fetch error', async () => {
      let rejectFetchPromise;
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject; });
      const onFetch = jest.fn(() => fetchPromise);
      const fetchErrorMessage = 'Oops!';
      await mount({ onFetch, fetchErrorMessage });
      rejectFetchPromise();
      await waitFor(() => {
        expect(screen.getByText(fetchErrorMessage)).toBeInTheDocument();
      });
    });

    it('should optionally show error banner with custom dynamic message on fetch error', async () => {
      let rejectFetchPromise;
      const message = 'Ops, resource not found.'
      const fetchPromise = new Promise((resolve, reject) => { rejectFetchPromise = reject; });
      const onFetch = jest.fn(() => fetchPromise);
      const { userEvent } = await mount({ onFetch });
      rejectFetchPromise({ message });
      await waitFor(() => {
        const formErrorBannerElement = document.querySelector('[data-form-error-banner]');
        expect(within(formErrorBannerElement).getByText(message)).toBeInTheDocument();
      });
    });

    it('should execute fetch callback on error banner retry button click', async () => {
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
      const { userEvent } = await mount({ onFetch });
      rejectFetchPromise();
      await waitFor(() => {
        expect(screen.getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument();
      });
      userEvent.click(screen.getByRole('button', { name: TRIGGER_TEXT }));
      expect(onFetch).toHaveBeenCalledTimes(2);
    });

    it('should not execute submit callback if required fields are not filled', async () => {
      const onSubmit = jest.fn();
      const { userEvent } = await mount({ onSubmit });
      expect(screen.queryAllByText(REQUIRED_ERROR_MESSAGE)).toHaveLength(0);
      await submit(userEvent);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(getSubmitButton()).toBeInTheDocument();
      expect(screen.queryAllByText(REQUIRED_ERROR_MESSAGE)).toHaveLength(3);
    });

    it('should not execute submit callback if custom validations are not satisfied', async () => {
      const onSubmit = jest.fn();
      const { userEvent } = await mount({ onSubmit });
      await fillForm(userEvent, { name: 'a', fruit: 'papaya', bio: 'fuck' }, waitFor);
      await submit(userEvent);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(screen.queryByText(ERROR_MESSAGES.TOO_SHORT_NAME)).toBeInTheDocument();
      expect(screen.queryByText(ERROR_MESSAGES.NOT_CITRIC_FRUIT)).toBeInTheDocument();
      expect(screen.queryByText(ERROR_MESSAGES.OFFENSIVE_BIO)).toBeInTheDocument();
    });

    it('should execute submit callback on submit if form is valid', async () => {
      const onSubmit = jest.fn(() => new PendingPromiseMock());
      const { userEvent } = await mount({ onSubmit });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await submit(userEvent);
      expect(onSubmit).toHaveBeenCalled();
      await waitFor(() => {
        expect(getSubmitButton()).not.toBeInTheDocument();
        expect(screen.getByTitle(LOADER_TITLE_TEXT)).toBeInTheDocument();
      });
    });

    it('should not execute submit callback more than once', async () => {
      const onSubmit = jest.fn(() => new PendingPromiseMock());
      const { userEvent } = await mount({ onSubmit });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await waitFor(() => {
        userEvent.dblClick(getSubmitButton());
      });
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should execute submit success callback on submit success', async () => {
      const response = { some: 'data' };
      const onSubmit = jest.fn(() => Promise.resolve(response));
      const onSubmitSuccess = jest.fn();
      const { userEvent } = await mount({ onSubmit, onSubmitSuccess });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await submit(userEvent);
      await waitFor(() => {
        expect(onSubmitSuccess).toHaveBeenCalledWith(response);
        expect(screen.queryByTitle(LOADER_TITLE_TEXT)).not.toBeInTheDocument();
        expect(getSubmitButton()).toBeInTheDocument();
      });
    });

    it('should optionally show a success title and message on submit success', async () => {
      const onSubmit = jest.fn(() => Promise.resolve({}));
      const submitSuccessTitle = 'Good job!';
      const submitSuccessMessage = 'Form successfully sent';
      const { userEvent } = await mount({ onSubmit, submitSuccessTitle, submitSuccessMessage });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await submit(userEvent);
      await waitFor(() => {
        const toastElement = getToastElement();
        expect(within(toastElement).getByText(submitSuccessTitle)).toBeInTheDocument();
        expect(within(toastElement).getByText(submitSuccessMessage)).toBeInTheDocument();
      });
      userEvent.click(within(getToastElement()).getByRole('button'));
      expect(getToastElement()).not.toBeInTheDocument();
    });

    it('should execute submit error callback on submit error', async () => {
      const err = { some: 'err' };
      const onSubmit = jest.fn(() => Promise.reject(err));
      const onSubmitError = jest.fn();
      const { userEvent } = await mount({ onSubmit, onSubmitError });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await submit(userEvent);
      await waitFor(() => {
        const formErrorBannerElement = document.querySelector('[data-form-error-banner]');
        expect(within(formErrorBannerElement).getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument();
      });
      expect(getBanner()).toHaveClass('t-banner-danger');
      expect(onSubmitError).toHaveBeenCalledWith(err);
      expect(getSubmitButton()).toBeInTheDocument();
      expect(screen.queryByTitle(LOADER_TITLE_TEXT)).not.toBeInTheDocument();
    });

    it('should optionally show error banner with custom message on submit error', async () => {
      const onSubmit = jest.fn(() => Promise.reject({}));
      const submitErrorMessage = 'Ops...';
      const { userEvent } = await mount({ onSubmit, submitErrorMessage });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await submit(userEvent);
      await waitFor(() => {
        const formErrorBannerElement = document.querySelector('[data-form-error-banner]');
        expect(within(formErrorBannerElement).getByText(submitErrorMessage)).toBeInTheDocument();
      });
    });

    it('should optionally show error banner with custom dynamic message on submit error', async () => {
      const message = 'Ops, our fault. Please, try again.'
      const onSubmit = jest.fn(() => Promise.reject({ message }));
      const { userEvent } = await mount({ onSubmit });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await submit(userEvent);
      await waitFor(() => {
        const formErrorBannerElement = document.querySelector('[data-form-error-banner]');
        expect(within(formErrorBannerElement).getByText(message)).toBeInTheDocument();
      });
    });

    it('should execute submit callback on error banner retry button click', async () => {
      const onSubmit = jest.fn(() => Promise.reject({}));
      const { userEvent } = await mount({ onSubmit });
      await fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' }, waitFor);
      await submit(userEvent);
      await waitFor(() => {
        expect(getSubmitButton()).toBeInTheDocument();
        expect(screen.queryByTitle(LOADER_TITLE_TEXT)).not.toBeInTheDocument();
      });
      await waitFor(() => {
        const formErrorBannerElement = document.querySelector('[data-form-error-banner]');
        userEvent.click(within(formErrorBannerElement).getByRole('button', { name: TRIGGER_TEXT }));
      });
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });

    it('should destroy form model on component unmount', async () => {
      const { container, unmount } = await mount();
      const formId = container.firstChild.getAttribute('data-form-id');
      unmount();
      expect(formService.get(formId)).not.toBeDefined();
    });

    async function mount(props){
      const result = mountComponent(props, {
        FIELD_LABELS,
        SUBMIT_BUTTON_TEXT,
        customValidations,
        fruits
      });
      await pause();
      return result;
    }

    async function fillForm(userEvent, fields, waitFor){
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(FIELD_LABELS.NAME), fields.name);
      });
      await waitFor(() => {
        userEvent.selectOptions(screen.getByLabelText(FIELD_LABELS.FRUIT), fields.fruit);
      });
      await waitFor(() => {
        userEvent.type(screen.getByLabelText(FIELD_LABELS.BIO), fields.bio);
      });
    }

    async function submit(userEvent){
      await waitFor(() => {
        userEvent.click(getSubmitButton());
      });
    }

    function getSubmitButton(){
      return screen.queryByRole('button', { name: SUBMIT_BUTTON_TEXT });
    }

    function getToastElement(){
      return document.querySelector('[data-toast]');
    }

    function getBanner(){
      return screen.getByText(REQUEST_ERROR_MESSAGE).parentElement;
    }
  });
}
