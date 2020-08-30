import { REQUIRED_ERROR_MESSAGE }  from '@base/constants/messages';
import idService from '@base/services/id/id';
import formService from '@base/services/form/form';

class FormControlModel {
  constructor(formControlEl, options = {}){
    this.setId(idService.generate());
    this.setOptions(options);
    this.configForm(formControlEl);
    this.configValidations(formControlEl, options.validations);
    this.configElement(formControlEl, options.value);
  }
  setId(id){
    this.id = id;
  }
  configElement(element, value){
    this.element = element;
    if(value) this.setElementValue(value);
    this.handleAutofocus();
    this.validate(this.element);
  }
  handleAutofocus(){
    const { element } = this;
    if(element.getAttribute('autofocus')) element.focus();
  }
  setElementValue(value){
    this.element.value = value;
  }
  setOptions(options){
    this.options = options;
  }
  configForm(formControlEl){
    this.setForm(formService.findParentFormModel(formControlEl));
    if(this.form)
      this.form.onSubmit(() => {
        this.setBlurred(true);
        this.validate(formControlEl);
      });
  }
  setForm(form){
    this.form = form;
  }
  configValidations(formControlEl, validations = []){
    if(formControlEl.required)
      validations.unshift(this.buildRequiredValidation());
    this.setValidations(validations);
    this.configValidationListeners(formControlEl);
  }
  buildRequiredValidation(){
    return { isValid: data => !!data, errorMessage: REQUIRED_ERROR_MESSAGE };
  }
  setValidations(validations){
    this.validations = validations;
  }
  configValidationListeners(formControlEl){
    formControlEl.addEventListener('input', evt => this.onInput(evt));
    formControlEl.addEventListener('blur', evt => this.onBlur(evt));
  }
  onInput(evt){
    this.validate(evt.target);
    this.handleCallbackOption('onInput', evt);
  }
  validate({ checked, value }){
    const data = checked || value;
    const errors = [];
    this.validations.forEach(({ isValid, errorMessage }) => {
      if(!isValid(data))
        errors.push(errorMessage);
    });
    return errors.length ? this.emitError(errors[0]) : this.emitSuccess();
  }
  emitError(err){
    if(this.form)
      this.form.setError(this.id, err);
    if(this.hasBeenBlured)
      this.handleCallbackOption('onValidate', err);
  }
  emitSuccess(){
    if(this.form)
      this.form.clearError(this.id);
    if(this.hasBeenBlured)
      this.handleCallbackOption('onValidate');
  }
  handleCallbackOption(option, data){
    const callback = this.options[option];
    return callback && callback(data);
  }
  onBlur({ target }){
    this.setBlurred(true);
    this.validate(target);
  }
  setBlurred(hasBeenBlured){
    this.hasBeenBlured = hasBeenBlured;
  }
}

export { FormControlModel };
