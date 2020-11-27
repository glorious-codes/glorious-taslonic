import { formBanner } from '@vue/components/form-banner/form-banner';
import { loader } from '@vue/components/loader/loader';
import formService from '@base/services/form/form';
import toasterService from '@vue/services/toaster/toaster';
import template from './form.html';

export const form = {
  name: 't-form',
  components: {
    tFormBanner: formBanner,
    tLoader: loader
  },
  props: [
    'onFetch',
    'onFetchSuccess',
    'onFetchError',
    'onSubmit',
    'onSubmitSuccess',
    'onSubmitError',
    'fetchErrorMessage',
    'submitErrorMessage',
    'submitSuccessMessage',
    'submitSuccessTitle'
  ],
  data(){
    return {
      form: null,
      isFetching: false,
      fetchFailed: false,
      banner: null
    };
  },
  mounted(){
    const form = formService.build(this.$el, {
      onFetch: () => this.handleRequest(this.onFetch),
      onFetchSuccess: this.onFetchSuccess,
      onFetchError: err => this.handleRequestError(err, 'fetch', this.onFetchError),
      onSubmit: () => this.handleRequest(this.onSubmit),
      onSubmitSuccess: this.handleSubmitSuccess,
      onSubmitError: err => this.handleRequestError(err, 'submit', this.onSubmitError)
    });
    form.onProcessChange(this.onProcessChange);
    this.setForm(form);
  },
  beforeDestroy(){
    formService.destroy(this.form.id);
  },
  methods: {
    onProcessChange({ isFetching }){
      this.setFetching(isFetching);
    },
    handleRequest(requestFn){
      this.setBanner(null);
      this.setFetchFailed(false);
      return requestFn && requestFn();
    },
    handleRequestError(err, requestType, callbackProp){
      this.setBanner({
        message: this.getBannerMessage(requestType),
        onTriggerClick: () => this.handleProcess(requestType)
      });
      this.handleCallbackProp(callbackProp, err);
      if(requestType == 'fetch') this.setFetchFailed(true);
    },
    handleSubmitSuccess(response){
      const message = this.submitSuccessMessage;
      if(message) toasterService.pop({ title: this.submitSuccessTitle, theme: 'success', message });
      this.handleCallbackProp(this.onSubmitSuccess, response);
    },
    handleCallbackProp(callback, data){
      callback && callback(data);
    },
    handleProcess(type){
      this.form.handleProcess(type);
    },
    setForm(form){
      this.form = form;
    },
    setFetching(isFetching){
      this.isFetching = isFetching;
    },
    setFetchFailed(hasFailed){
      this.fetchFailed = hasFailed;
    },
    setBanner(banner){
      this.banner = banner;
    },
    getBannerMessage(type){
      const message = type == 'fetch' ? this.fetchErrorMessage : this.submitErrorMessage;
      return message || formService.getMessage('REQUEST_ERROR_MESSAGE');
    }
  },
  computed: {
    classes(){
      const { isFetching, fetchFailed } = this;
      return formService.buildCssClasses({ fetching: isFetching, fetchFailed });
    },
    isBusy(){
      return this.isFetching ? 'true' : 'false';
    }
  },
  template
};
