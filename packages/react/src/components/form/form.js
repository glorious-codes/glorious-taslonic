import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@react/components/loader/loader';
import { FormBanner } from '@react/components/form-banner/form-banner';
import toasterService from '@react/services/toaster/toaster';
import formService from '@base/services/form/form';

export const Form  = ({
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  onFetch,
  onFetchSuccess,
  onFetchError,
  submitSuccessTitle,
  submitSuccessMessage,
  submitErrorMessage,
  fetchErrorMessage,
  children
}) => {
  const [form, setForm] = useState();
  const [banner, setBanner] = useState(null);
  const [isFetching, setFetching] = useState();
  const [fetchFailed, setFetchFailed] = useState(false);
  const formEl = useRef();
  const handleRequest = requestFn => {
    if(requestFn) {
      setBanner(null);
      setFetchFailed(false);
      return requestFn();
    }
  };
  const handleSubmitSuccess = response => {
    if(submitSuccessMessage) {
      toasterService.pop({
        title: submitSuccessTitle,
        message: submitSuccessMessage,
        theme: 'success'
      });
    }
    handleCallbackProp(onSubmitSuccess, response);
  };
  const handleRequestError = (requestType, callbackProp, form) => {
    if(requestType == 'fetch') setFetchFailed(true);
    setBanner({ onTriggerClick: () => form.handleProcess(requestType) });
    callbackProp();
  };
  const getBannerMessage = () => {
    const message = fetchFailed ? fetchErrorMessage : submitErrorMessage;
    return message || formService.getMessage('REQUEST_ERROR_MESSAGE');
  };
  const onProcessChange = ({ isFetching }) => setFetching(isFetching);
  const handleCallbackProp = (callback, data) => callback && callback(data);
  const buildFormModelOptions = form => ({
    onFetch: () => handleRequest(onFetch),
    onFetchSuccess: response => handleCallbackProp(onFetchSuccess, response),
    onSubmit: () => handleRequest(onSubmit),
    onSubmitSuccess: response => handleSubmitSuccess(response),
    onFetchError: err => handleRequestError('fetch', () => handleCallbackProp(onFetchError, err), form),
    onSubmitError: err => handleRequestError('submit', () => handleCallbackProp(onSubmitError, err), form)
  });

  useEffect(() => {
    const form = formService.build(formEl.current, { onProcessChange });
    form.setOptions(buildFormModelOptions(form));
    setForm(form);
    return () => formService.destroy(form.id);
  }, []);

  useEffect(() => {
    if(form && !form.initialized) form.init();
  }, [form]);

  useEffect(() => {
    if(form) form.setOptions(buildFormModelOptions(form));
  }, [form, onSubmit, onSubmitSuccess, onSubmitError, onFetch, onFetchSuccess, onFetchError]);

  return (
    <form
      className={formService.buildCssClasses({ isFetching, fetchFailed })}
      ref={formEl}
      noValidate>
      {isFetching && <Loader />}
      { banner && (
        <FormBanner
          message={getBannerMessage()}
          onTriggerClick={banner.onTriggerClick}
          onClose={() => setBanner(null)}
          data-form-error-banner
        />
      )}
      <div className="t-form-content" aria-live="polite" aria-busy={isFetching} data-form-content>
        { children }
      </div>
    </form>
  );
};
