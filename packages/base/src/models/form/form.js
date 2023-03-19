import { FORM_ID_CUSTOM_ATTR }  from '@base/constants/form';
import idService from '@base/services/id/id';

export class Form {
  constructor(formEl, options = {}){
    this.identify(formEl);
    this.setOptions(options);
    this.setErrors({});
    this.configListeners(formEl);
    setTimeout(() => this.handleFetch(options));
  }
  identify(formEl){
    const id = idService.generate();
    this.setId(id);
    this.setElementId(formEl, id);
  }
  setId(id){
    this.id = id;
  }
  setElementId(formEl, id){
    formEl.setAttribute(FORM_ID_CUSTOM_ATTR, id);
  }
  setOptions(options){
    this.options = options;
  }
  configListeners(formEl){
    formEl.addEventListener('submit', evt => this.handleSubmit(evt));
  }
  handleProcess(process){
    return process == 'fetch' ? this.handleFetch(this.options) : this.handleSubmit();
  }
  handleFetch({ onFetch, onFetchSuccess, onFetchError }){
    onFetch && this.processRequest(onFetch, onFetchSuccess, onFetchError, 'isFetching');
  }
  handleSubmit(evt){
    const { onSubmit, onSubmitSuccess, onSubmitError } = this.options;
    evt && evt.preventDefault();
    this.notifyListeners(this.submitListeners);
    return this.isValid() ?
      this.processRequest(onSubmit, onSubmitSuccess, onSubmitError, 'isSubmitting') :
      this.highlightFirstErroredFormControl();
  }
  notifyListeners(listeners, data){
    listeners && listeners.forEach(listener => listener.notifyFn(data));
  }
  isValid(){
    return this.getErrorObjectKeys().length === 0;
  }
  getErrorObjectKeys(){
    return Object.keys(this.errors);
  }
  processRequest(requestFn, successCallback, errorCallback, processDescription){
    const result = !this.isProcessing ? this.runCallbackOption(requestFn) : null;
    if(this.isPromise(result)){
      this.setProcessing(true);
      this.notifyListeners(this.processListeners, { [processDescription]: true });
      result
        .then(response => this.runCallbackOption(successCallback, response))
        .catch(err => this.runCallbackOption(errorCallback, err))
        .finally(() => this.onProcessRequestComplete(processDescription));
    }
  }
  isPromise(obj){
    return obj && obj.then;
  }
  onProcessRequestComplete(processDescription){
    this.setProcessing(false);
    this.notifyListeners(this.processListeners, { [processDescription]: false });
  }
  runCallbackOption(callback, data){
    return callback && callback(data);
  }
  setProcessing(isProcessing){
    this.isProcessing = isProcessing;
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
  highlightFirstErroredFormControl(){
    const [ firstKey ] = this.getErrorObjectKeys();
    this.errors[firstKey].element.focus();
  }
  onProcessChange(notifyFn){
    this.processListeners = this.addListener(this.processListeners, { notifyFn });
  }
  onSubmit(notifyFn){
    const listener = { id: idService.generate(), notifyFn };
    this.submitListeners = this.addListener(this.submitListeners, listener);
    return listener.id;
  }
  addListener(listeners = [], newListener){
    listeners.push(newListener);
    return listeners;
  }
  removeSubmitListener(id){
    this.submitListeners = this.submitListeners.filter(listener => listener.id !== id);
  }
}
