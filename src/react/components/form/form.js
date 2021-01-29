import '@base/styles/form.styl';
import React, { Component, createRef } from 'react';
import { Loader } from '@react/components/loader/loader';
import { FormBanner } from '@react/components/form-banner/form-banner';
import toasterService from '@react/services/toaster/toaster';
import formService from '@base/services/form/form';

export class Form extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.formEl = createRef();
  }

  handleRequest(requestFn){
    this.setBanner(null);
    this.setFetchFailed(false);
    return requestFn && requestFn();
  }

  handleRequestError(requestType, callbackProp){
    this.setBanner({
      message: this.getBannerMessage(requestType),
      onTriggerClick: () => this.handleProcess(requestType)
    });
    callbackProp();
    if(requestType == 'fetch') this.setFetchFailed(true);
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

  getBannerMessage(type){
    const { fetchErrorMessage, submitErrorMessage } = this.props;
    const message = type == 'fetch' ? fetchErrorMessage : submitErrorMessage;
    return message || formService.getMessage('REQUEST_ERROR_MESSAGE');
  }

  handleSubmitSuccess(response){
    const message = this.props.submitSuccessMessage;
    const title = this.props.submitSuccessTitle;
    if(message) toasterService.pop({ title, message, theme: 'success' });
    this.handleCallbackProp(this.props.onSubmitSuccess, response);
  }

  onProcessChange({ isFetching }){
    this.setFetching(isFetching);
  }

  handleCallbackProp(callback, data){
    callback && callback(data);
  }

  handleProcess(type){
    this.state.form.handleProcess(type);
  }

  handleLoader(){
    if(this.state.fetching) return <Loader data-form-loader />;
  }

  handleBanner(){
    const { banner } = this.state;
    if(banner)
      return (
        <FormBanner
          theme="danger"
          triggerText="Retry"
          message={banner.message}
          onTriggerClick={banner.onTriggerClick}
          onClose={() => this.setBanner(null)}
          data-form-error-banner
        />
      );
  }

  componentDidMount(){
    const form = formService.build(this.formEl.current, {
      onFetch: this.props.onFetch ? () => this.handleRequest(() => this.props.onFetch()) : null,
      onFetchSuccess: response => this.handleCallbackProp(this.props.onFetchSuccess, response),
      onFetchError: err => this.handleRequestError('fetch', () => this.handleCallbackProp(this.props.onFetchError, err)),
      onSubmit: () => this.handleRequest(() => this.props.onSubmit()),
      onSubmitSuccess: response => this.handleSubmitSuccess(response),
      onSubmitError: err => this.handleRequestError('submit', () => this.handleCallbackProp(this.props.onSubmitError, err))
    });
    form.onProcessChange(process => this.onProcessChange(process));
    this.setState({ form });
  }

  componentWillUnmount(){
    formService.destroy(this.state.form.id);
  }

  render(){
    const { fetching, fetchFailed } = this.state;
    const { children } = this.props;
    return (
      <form
        className={formService.buildCssClasses({ fetching, fetchFailed })}
        ref={this.formEl}
        noValidate>
        { this.handleLoader() }
        { this.handleBanner() }
        <div className="t-form-content" aria-live="polite" aria-busy={fetching} data-form-content>
          { children }
        </div>
      </form>
    );
  }
}
