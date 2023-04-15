import React, { useState, useEffect } from 'react';
import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/banner';
import { TRIGGER_TEXT } from '@base/constants/fetcher';
import { Loader } from '@react/components/loader/loader';
import { Banner } from '@react/components/banner/banner';
import fetcherService from '@base/services/fetcher/fetcher';

export const Fetcher = ({
  onFetch,
  onFetchSuccess,
  onFetchError,
  fetchErrorMessage,
  onMount,
  children,
  ...rest
}) => {
  const [fetcher, setFetcher] = useState();
  const [banner, setBanner] = useState();
  const [fetchStatus, setFetchStatus] = useState({});
  const { isFetching, fetchFailed, fetchSucceeded } = fetchStatus;
  const shouldShowBanner = () => !!fetchFailed && !!banner;
  const getFetcherContent = () => !!fetchSucceeded && children;
  const handleFetchError = (err, fetcher) => {
    setBanner({ onTriggerClick: () => fetcher.fetch() });
    handleCallbackProp(onFetchError, err);
  };
  const handleProcessChange = ({ isFetching, fetchFailed, fetchSucceeded }) => {
    setFetchStatus({ isFetching, fetchFailed, fetchSucceeded });
  };
  const handleCallbackProp = (callback, data) => callback && callback(data);
  const getBannerMessage = () => {
    return fetchErrorMessage || fetcherService.getMessage('FETCH_ERROR_MESSAGE');
  };
  const buildFetcherOptions = fetcher => ({
    onFetch,
    onFetchSuccess: response => handleCallbackProp(onFetchSuccess, response),
    onFetchError: err => handleFetchError(err, fetcher),
    onProcessChange: process => handleProcessChange(process)
  });

  useEffect(() => {
    const fetcher = fetcherService.build();
    fetcher.setOptions(buildFetcherOptions(fetcher));
    handleCallbackProp(onMount, fetcher);
    setFetcher(fetcher);
  }, []);

  useEffect(() => {
    if(fetcher && !fetcher.initialized) fetcher.init();
  }, [fetcher]);

  useEffect(() => {
    if(fetcher) fetcher.setOptions(buildFetcherOptions(fetcher));
  }, [fetcher, onFetch, onFetchSuccess, onFetchError, fetchErrorMessage]);

  return (
    <div className={fetcherService.buildCssClasses({ isFetching, fetchFailed })} {...rest}>
      {isFetching && <Loader />}
      { shouldShowBanner() && (
        <Banner
          closeButtonAriaLabel={CLOSE_BUTTON_ARIA_LABEL}
          triggerText={TRIGGER_TEXT}
          onTriggerClick={banner.onTriggerClick}
          onClose={() => setBanner(null)}
          theme="danger"
          data-fetcher-error-banner
        >
          {getBannerMessage()}
        </Banner>
      )}
      <div
        className="t-fetcher-content"
        aria-live="polite"
        aria-busy={!!isFetching}
        data-fetcher-content
      >
        { getFetcherContent() }
      </div>
    </div>
  );
};
