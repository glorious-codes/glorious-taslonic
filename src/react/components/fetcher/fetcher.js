import '@base/styles/fetcher.styl';
import React, { useState, useEffect } from 'react';
import { Loader } from '@react/components/loader/loader';
import { Banner } from '@react/components/banner/banner';
import fetcherService from '@base/services/fetcher/fetcher';

export const Fetcher = ({
  onFetch,
  onFetchSuccess,
  onFetchError,
  fetchErrorMessage,
  children,
  ...rest
}) => {
  let fetcher;
  const [fetching, setFetching] = useState();
  const [fetchFailed, setFetchFailed] = useState();
  const [banner, setBanner] = useState();
  const handleFetchError = err => {
    setBanner({
      message: getBannerMessage(),
      onTriggerClick: () => fetcher.fetch()
    });
    handleCallbackProp(onFetchError, err);
  };
  const getBannerMessage = () => {
    return fetchErrorMessage || fetcherService.getMessage('FETCH_ERROR_MESSAGE');
  };
  const handleProcessChange = ({ isFetching, fetchFailed }) => {
    setFetching(isFetching);
    setFetchFailed(fetchFailed);
    if(isFetching) setBanner(null);
  };
  const handleCallbackProp = (callback, data) => callback && callback(data);
  const handleLoader = () => {
    if(fetching) return <Loader data-form-loader />;
  };
  const handleBanner = () => {
    if(banner)
      return (
        <Banner
          theme="danger"
          triggerText="Retry"
          onTriggerClick={banner.onTriggerClick}
          onClose={() => setBanner(null)}
          data-fetcher-error-banner
        >
          {banner.message}
        </Banner>
      );
  };

  useEffect(() => {
    fetcher = fetcherService.build({
      onFetch: () => handleCallbackProp(onFetch),
      onFetchSuccess: response => handleCallbackProp(onFetchSuccess, response),
      onFetchError: err => handleFetchError(err),
      onProcessChange: handleProcessChange
    });
  }, []);

  return (
    <div className={fetcherService.buildCssClasses({ fetching, fetchFailed })} {...rest}>
      { handleLoader(fetching) }
      { handleBanner(banner) }
      <div className="t-fetcher-content" aria-live="polite" aria-busy={fetching} data-fetcher-content>
        { children }
      </div>
    </div>
  );
};
