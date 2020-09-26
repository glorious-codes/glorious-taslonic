import { FormControlModel } from '@base/models/form-control/form-control';
import formControlService from '@base/services/form-control/form-control';
import template from './form-control.html';

export const formControl = {
  name: 't-form-control',
  props: ['value', 'required', 'autofocus', 'validations', 'formControlElSelector', 'blocked'],
  data(){
    return {
      errorMessage: '',
      formControl: null
    };
  },
  mounted(){
    this.setFormControlElement(this.$el.querySelector(this.formControlElSelector));
    this.setFormControl(this.buildFormControlModel(this.formControlEl));
  },
  methods: {
    setFormControlElement(element){
      this.formControlEl = element;
    },
    buildFormControlModel(formControlEl){
      return new FormControlModel(formControlEl, {
        onValidate: errorMessage => this.setErrorMessage(errorMessage),
        onInput: evt => this.$parent.$emit('input', evt.target.value),
        validations: this.validations,
        required: this.required,
        value: this.value
      });
    },
    setFormControl(formControl){
      this.formControl = formControl;
    },
    setErrorMessage(errorMessage){
      this.errorMessage = errorMessage;
    }
  },
  watch: {
    required(required){
      this.formControl.onRequiredChange(required);
    },
    value(value) {
      this.formControl.setElementValue(value);
    }
  },
  computed: {
    classes(){
      const { blocked, errorMessage } = this;
      return formControlService.buildCssClasses({ blocked, errorMessage });
    }
  },
  template
};
