import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@react/components/loader/loader';
import { FormBanner } from '@react/components/form-banner/form-banner';
import toasterService from '@react/services/toaster/toaster';
import formService from '@base/services/form/form';

export const Form = ({
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
}) => {
  let form;
  const [fetching, setFetching] = useState();
  const [fetchFailed, setFetchFailed] = useState();
  const [banner, setBanner] = useState();
  const formEl = useRef();
  const handleRequest = requestFn => {
    setBanner(null);
    setFetchFailed(false);
    return requestFn && requestFn();
  };
  const handleRequestError = (err, requestType, callbackProp) => {
    setBanner({
      message: getBannerMessage(requestType),
      onTriggerClick: () => handleProcess(requestType)
    });
    handleCallbackProp(callbackProp, err);
    if(requestType == 'fetch') setFetchFailed(true);
  };
  const getBannerMessage = type => {
    const message = type == 'fetch' ? fetchErrorMessage : submitErrorMessage;
    return message || formService.getMessage('REQUEST_ERROR_MESSAGE');
  };
  const handleSubmitSuccess = response => {
    const message = submitSuccessMessage;
    if(message) toasterService.pop({ title: submitSuccessTitle, theme: 'success', message });
    handleCallbackProp(onSubmitSuccess, response);
  };
  const onProcessChange = ({ isFetching }) => setFetching(isFetching);
  const handleCallbackProp = (callback, data) => callback && callback(data);
  const handleProcess = type => form.handleProcess(type);
  const handleLoader = () => {
    if(fetching) return <Loader data-form-loader />;
  };
  const handleBanner = () => {
    if(banner)
      return (
        <FormBanner
          theme="danger"
          triggerText="Retry"
          message={banner.message}
          onTriggerClick={banner.onTriggerClick}
          onClose={() => setBanner(null)}
          data-form-error-banner
        />
      );
  };

  useEffect(() => {
    form = formService.build(formEl.current, {
      onFetch: onFetch ? () => handleRequest(onFetch) : null,
      onFetchSuccess: onFetchSuccess,
      onFetchError: err => handleRequestError(err, 'fetch', onFetchError),
      onSubmit: () => handleRequest(onSubmit),
      onSubmitSuccess: handleSubmitSuccess,
      onSubmitError: err => handleRequestError(err, 'submit', onSubmitError)
    });
    form.onProcessChange(onProcessChange);
    return () => formService.destroy(form.id);
  }, []);

  return (
    <form
      className={formService.buildCssClasses({ fetching, fetchFailed })}
      ref={formEl}
      noValidate
      {...rest}>
      { handleLoader(fetching) }
      { handleBanner(banner) }
      <div className="t-form-content">
        { children }
      </div>
    </form>
  );
};
