import { FORM_ID_CUSTOM_ATTR }  from '@base/constants/form';
import idService from '@base/services/id/id';

export class Form {
  constructor(formEl, options){
    this.identify(formEl);
    this.setOptions(options);
    this.setErrors({});
    this.configListeners(formEl);
  }
  identify(formEl){
    this.setId(idService.generate());
    this.setElementId(formEl);
  }
  setId(id){
    this.id = id;
  }
  setElementId(formEl){
    formEl.setAttribute(FORM_ID_CUSTOM_ATTR, this.id);
  }
  setOptions(options = {}){
    this.options = options;
  }
  configListeners(formEl){
    formEl.addEventListener('submit', evt => this.handleSubmit(evt));
  }
  handleSubmit({ preventDefault, ...rest }){
    preventDefault();
    this.notifySubmitListeners(this.submitListeners);
    if(this.isValid())
      this.processSubmission({ preventDefault, ...rest });
  }
  notifySubmitListeners(listeners = []){
    listeners.forEach(notify => notify());
  }
  isValid(){
    return Object.keys(this.errors).length === 0;
  }
  processSubmission(evt){
    const result = this.handleCallbackOption('onSubmit', evt);
    if(result && result.then){
      this.handleCallbackOption('onProcessChange', { isSubmitting: true });
      result
        .then(response => this.handleSubmitSuccess(response))
        .catch(err => this.handleSubmitError(err))
        .finally(() => this.handleSubmitComplete());
    }
  }
  handleSubmitSuccess(response){
    this.handleCallbackOption('onSubmitSuccess', response);
  }
  handleSubmitError(err){
    this.handleCallbackOption('onSubmitError', err);
  }
  handleSubmitComplete(){
    this.handleCallbackOption('onProcessChange', { isSubmitting: false });
  }
  handleCallbackOption(option, data){
    const callback = this.options[option];
    return callback && callback(data);
  }
  setErrors(errors){
    this.errors = errors;
  }
  setError(id, err){
    this.errors[id] = err;
  }
  clearError(id){
    delete this.errors[id];
  }
  onSubmit(notifyFn){
    this.submitListeners = this.submitListeners || [];
    this.submitListeners.push(notifyFn);
  }
}
