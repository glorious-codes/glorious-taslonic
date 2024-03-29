import { tFormBanner } from '@vue/components/form-banner/form-banner';
import { tLoader } from '@vue/components/loader/loader';
import formService from '@base/services/form/form';
import toasterService from '@vue/services/toaster/toaster';
import template from './form.html';

export const tForm = {
  name: 't-form',
  components: { tFormBanner, tLoader },
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
    this.setForm(formService.build(this.$el, {
      onFetch: () => this.handleRequest(this.onFetch),
      onFetchSuccess: this.onFetchSuccess,
      onFetchError: err => this.handleRequestError(err, 'fetch', this.onFetchError),
      onSubmit: () => this.handleRequest(this.onSubmit),
      onSubmitSuccess: this.handleSubmitSuccess,
      onSubmitError: err => this.handleRequestError(err, 'submit', this.onSubmitError),
      onProcessChange: this.onProcessChange
    }));
    this.form.init();
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
  },
  computed: {
    classes(){
      const { isFetching, fetchFailed } = this;
      return formService.buildCssClasses({ isFetching, fetchFailed });
    },
    isBusy(){
      return this.isFetching ? 'true' : 'false';
    },
    bannerMessage(){
      const message = this.fetchFailed ? this.fetchErrorMessage : this.submitErrorMessage;
      return message || formService.getMessage('REQUEST_ERROR_MESSAGE');
    }
  },
  template
};
