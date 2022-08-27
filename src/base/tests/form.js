import { pause } from '@base/services/testing/testing';
import { ERROR_MESSAGES, FIELD_LABELS, SUBMIT_BUTTON_TEXT, customValidations, fruits } from '@base/mocks/form';
import { REQUEST_ERROR_MESSAGE } from '@base/constants/form';
import { CLOSE_BUTTON_ARIA_LABEL, TRIGGER_TEXT } from '@base/constants/form-banner';
import { TITLE_TEXT as LOADER_TITLE_TEXT } from '@base/constants/loader';
import { REQUIRED_ERROR_MESSAGE }  from '@base/constants/messages';
import { PromiseMock } from '@base/mocks/promise';
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
      const onFetch = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
      const { container } = await mount({ onFetch });
      const formEl = container.firstChild;
      const formContentEl = container.querySelector('[data-form-content]');
      await waitFor(() => {
        expect(formEl).toHaveClass('t-form-fetching');
      });
      expect(formContentEl).toHaveAttribute('aria-busy', 'true');
      expect(formContentEl).toHaveAttribute('aria-live', 'polite');
      expect(screen.getByTitle('loading')).toBeInTheDocument();
    });

    it('should handle fetch success', async () => {
      const response = { some: 'response' };
      const onFetch = jest.fn(() => new PromiseMock('success', { response }));
      const onFetchSuccess = jest.fn();
      const { container } = await mount({ onFetch, onFetchSuccess });
      const formEl = container.firstChild;
      const formContentEl = container.querySelector('[data-form-content]');
      await waitFor(() => {
        expect(formEl).not.toHaveClass('t-form-fetching');
      });
      expect(formContentEl).toHaveAttribute('aria-busy', 'false');
      expect(formContentEl).toHaveAttribute('aria-live', 'polite');
      expect(onFetchSuccess).toHaveBeenCalledWith(response);
      expect(screen.queryByTitle('loading')).not.toBeInTheDocument();
    });

    it('should handle fetch error', async () => {
      const err = { some: 'err' };
      const onFetch = jest.fn(() => new PromiseMock('error', { err }));
      const onFetchError = jest.fn();
      const { container } = await mount({ onFetch, onFetchError });
      const formEl = container.firstChild;
      const formContentEl = container.querySelector('[data-form-content]');
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
      const onFetch = jest.fn(() => new PromiseMock('error'));
      const { userEvent } = await mount({ onFetch });
      await waitFor(() => {
        expect(screen.getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument();
      });
      userEvent.click(screen.getByLabelText(CLOSE_BUTTON_ARIA_LABEL));
      await waitFor(() => {
        expect(screen.queryByText(REQUEST_ERROR_MESSAGE)).not.toBeInTheDocument();
      });
    });

    it('should optionally show error banner with custom message on fetch error', async () => {
      const fetchErrorMessage = 'Oops!';
      const onFetch = jest.fn(() => new PromiseMock('error'));
      await mount({ onFetch, fetchErrorMessage });
      expect(screen.getByText(fetchErrorMessage)).toBeInTheDocument();
    });

    it('should execute fetch callback on error banner retry button click', async () => {
      const onFetch = jest.fn(() => new PromiseMock('error'));
      const { userEvent } = await mount({ onFetch });
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
      submit(userEvent);
      expect(onSubmit).not.toHaveBeenCalled();
      expect(getSubmitButton()).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.queryAllByText(REQUIRED_ERROR_MESSAGE)).toHaveLength(3);
      });
    });

    it('should not execute submit callback if custom validations are not satisfied', async () => {
      const onSubmit = jest.fn();
      const { userEvent } = await mount({ onSubmit });
      fillForm(userEvent, { name: 'a', fruit: 'papaya', bio: 'fuck' });
      submit(userEvent);
      expect(onSubmit).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.queryByText(ERROR_MESSAGES.TOO_SHORT_NAME)).toBeInTheDocument();
        expect(screen.queryByText(ERROR_MESSAGES.NOT_CITRIC_FRUIT)).toBeInTheDocument();
        expect(screen.queryByText(ERROR_MESSAGES.OFFENSIVE_BIO)).toBeInTheDocument();
      });
    });

    it('should execute submit callback on submit if form is valid', async () => {
      const onSubmit = jest.fn(() => new PromiseMock('success', { shouldAbort: true }));
      const { userEvent } = await mount({ onSubmit });
      fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' });
      submit(userEvent);
      expect(onSubmit).toHaveBeenCalled();
      await waitFor(() => {
        expect(getSubmitButton()).not.toBeInTheDocument();
      });
      expect(screen.getByTitle(LOADER_TITLE_TEXT)).toBeInTheDocument();
    });

    it('should execute submit success callback on submit success', async () => {
      const response = { some: 'data' };
      const onSubmit = jest.fn(() => new PromiseMock('success', { response }));
      const onSubmitSuccess = jest.fn();
      const { userEvent } = await mount({ onSubmit, onSubmitSuccess });
      fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' });
      submit(userEvent);
      expect(onSubmitSuccess).toHaveBeenCalledWith(response);
      expect(getSubmitButton()).toBeInTheDocument();
      expect(screen.queryByTitle(LOADER_TITLE_TEXT)).not.toBeInTheDocument();
    });

    it('should optionally show a success title and message on submit success', async () => {
      const onSubmit = jest.fn(() => new PromiseMock('success', { response: {} }));
      const submitSuccessTitle = 'Good job!';
      const submitSuccessMessage = 'Form successfully sent';
      const { userEvent } = await mount({ onSubmit, submitSuccessTitle, submitSuccessMessage });
      fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' });
      submit(userEvent);
      const toastElement = document.querySelector('[data-toast]');
      expect(within(toastElement).getByText(submitSuccessTitle)).toBeInTheDocument();
      expect(within(toastElement).getByText(submitSuccessMessage)).toBeInTheDocument();
      userEvent.click(within(toastElement).getByRole('button'));
      expect(toastElement).not.toBeInTheDocument();
    });

    it('should execute submit error callback on submit error', async () => {
      const err = { some: 'err' };
      const onSubmit = jest.fn(() => new PromiseMock('error', { err }));
      const onSubmitError = jest.fn();
      const { userEvent } = await mount({ onSubmit, onSubmitError });
      fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' });
      submit(userEvent);
      expect(onSubmitError).toHaveBeenCalledWith(err);
      await waitFor(() => {
        const formErrorBannerElement = document.querySelector('[data-form-error-banner]');
        expect(within(formErrorBannerElement).getByText(REQUEST_ERROR_MESSAGE)).toBeInTheDocument();
      });
      expect(getSubmitButton()).toBeInTheDocument();
      expect(screen.queryByTitle(LOADER_TITLE_TEXT)).not.toBeInTheDocument();
    });

    it('should optionally show error banner with custom message on submit error', async () => {
      const onSubmit = jest.fn(() => new PromiseMock('error', { err: {} }));
      const submitErrorMessage = 'Ops...';
      const { userEvent } = await mount({ onSubmit, submitErrorMessage });
      fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' });
      submit(userEvent);
      await waitFor(() => {
        const formErrorBannerElement = document.querySelector('[data-form-error-banner]');
        expect(within(formErrorBannerElement).getByText(submitErrorMessage)).toBeInTheDocument();
      });
    });

    it('should execute submit callback on error banner retry button click', async () => {
      const onSubmit = jest.fn(() => new PromiseMock('error', { err: {} }));
      const { userEvent } = await mount({ onSubmit });
      fillForm(userEvent, { name: 'Jim', fruit: 'lemmon', bio: 'Hi' });
      submit(userEvent);
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

    function fillForm(userEvent, fields){
      const actions = {
        name: value => userEvent.type(screen.getByLabelText(FIELD_LABELS.NAME), value),
        fruit: value => userEvent.selectOptions(screen.getByLabelText(FIELD_LABELS.FRUIT), value),
        bio: value => userEvent.type(screen.getByLabelText(FIELD_LABELS.BIO), value)
      };
      Object.entries(fields).forEach(([fieldName, fieldValue]) => actions[fieldName](fieldValue));
    }

    function submit(userEvent){
      userEvent.click(getSubmitButton());
    }

    function getSubmitButton(){
      return screen.queryByRole('button', { name: SUBMIT_BUTTON_TEXT });
    }
  });
}
