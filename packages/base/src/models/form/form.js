import {
  FORM_ID_CUSTOM_ATTR,
  SUBMIT_PROCESS_DESCRIPTION,
  FETCH_PROCESS_DESCRIPTION
}  from '@base/constants/form';
import idService from '@base/services/id/id';

export class Form {
  constructor(formEl, options = {}){
    this.identify(formEl);
    this.setOptions(options);
    this.setErrors({});
    this.configListeners(formEl);
    this.onProcessChange(options.onProcessChange);
  }
  init(){
    this.handleFetch(this.options);
    this.initialized = true;
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
    onFetch && this.processRequest(onFetch, onFetchSuccess, onFetchError, FETCH_PROCESS_DESCRIPTION);
  }
  handleSubmit(evt){
    const { onSubmit, onSubmitSuccess, onSubmitError } = this.options;
    evt && evt.preventDefault();
    this.notifyListeners(this.submitListeners);
    return this.isValid() ?
      this.processRequest(onSubmit, onSubmitSuccess, onSubmitError, SUBMIT_PROCESS_DESCRIPTION) :
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
        .then(response => {
          if(processDescription == SUBMIT_PROCESS_DESCRIPTION) {
            this.notifyListeners(this.submitSuccessListeners);
          }
          this.runCallbackOption(successCallback, response);
        })
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
    this.addEventToExistingListeners(notifyFn, 'submitListeners');
  }
  onSubmitSuccess(notifyFn){
    this.addEventToExistingListeners(notifyFn, 'submitSuccessListeners');
  }
  addEventToExistingListeners(notifyFn, existingListenersKey){
    const listener = { id: idService.generate(), notifyFn };
    this[existingListenersKey] = this.addListener(this[existingListenersKey], listener);
    return listener.id;
  }
  addListener(listeners = [], newListener){
    listeners.push(newListener);
    return listeners;
  }
  removeSubmitListener(id){
    this.removeEventFromExistingListeners(id, 'submitListeners');
  }
  removeSubmitSuccessListener(id){
    this.removeEventFromExistingListeners(id, 'submitSuccessListeners');
  }
  removeEventFromExistingListeners(id, existingListenersKey){
    this[existingListenersKey] = this[existingListenersKey].filter(listener => listener.id !== id);
  }
}
