import '@base/styles/fetcher.styl';
import React, { Component } from 'react';
import { Loader } from '@react/components/loader/loader';
import { Banner } from '@react/components/banner/banner';
import fetcherService from '@base/services/fetcher/fetcher';

export class Fetcher extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  handleFetchError(err){
    this.setBanner({
      message: this.getBannerMessage(),
      onTriggerClick: () => this.state.fetcher.fetch()
    });
    this.handleCallbackProp(this.props.onFetchError, err);
  }

  handleProcessChange({ isFetching, fetchFailed }){
    this.setFetching(isFetching);
    this.setFetchFailed(fetchFailed);
    if(isFetching) this.setBanner(null);
  }

  handleCallbackProp(callback, data){
    callback && callback(data);
  }

  setBanner(banner){
    this.setState({ banner });
  }

  setFetching(fetching){
    this.setState({ fetching });
  }

  setFetchFailed(fetchFailed){
    this.setState({ fetchFailed });
  }

  getBannerMessage(){
    return this.props.fetchErrorMessage || fetcherService.getMessage('FETCH_ERROR_MESSAGE');
  }

  componentDidMount(){
    const fetcher = fetcherService.build({
      onFetch: () => this.props.onFetch(),
      onFetchSuccess: response => this.handleCallbackProp(this.props.onFetchSuccess, response),
      onFetchError: err => this.handleFetchError(err),
      onProcessChange: process => this.handleProcessChange(process)
    });
    this.setState({ fetcher });
    this.handleCallbackProp(this.props.onMount, fetcher);
  }

  render(){
    const { fetching, fetchFailed, banner } = this.state;

    return (
      <div className={fetcherService.buildCssClasses({ fetching, fetchFailed })}>
        { handleLoader(fetching) }
        { handleBanner(banner, () => this.setBanner(null)) }
        <div
          className="t-fetcher-content"
          aria-live="polite"
          aria-busy={fetching}
          aria-hidden={fetchFailed || fetching}
          data-fetcher-content
        >
          { this.props.children }
        </div>
      </div>
    );
  }
}

function handleLoader(fetching){
  if(fetching) return <Loader data-form-loader />;
}

function handleBanner(banner, onBannerClose){
  if(banner)
    return (
      <Banner
        theme="danger"
        triggerText="Retry"
        onTriggerClick={banner.onTriggerClick}
        onClose={onBannerClose}
        data-fetcher-error-banner
      >
        {banner.message}
      </Banner>
    );
}
