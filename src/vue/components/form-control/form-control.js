import { FormControlModel } from '@base/models/form-control/form-control';
import formControlService from '@base/services/form-control/form-control';
import template from './form-control.html';

export const formControl = {
  name: 't-form-control',
  props: ['value', 'autofocus', 'validations', 'querySelector', 'blocked'],
  data(){
    return {
      errorMessage: '',
      formControl: null
    };
  },
  mounted(){
    const formControlEl = this.$el.querySelector(this.querySelector);
    this.setFormControl(this.buildFormControlModel(formControlEl));
  },
  methods: {
    buildFormControlModel(formControlEl){
      return new FormControlModel(formControlEl, {
        onValidate: errorMessage => this.setErrorMessage(errorMessage),
        onInput: evt => this.$parent.$emit('input', evt.target.value),
        validations: this.validations,
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
    value(value) {
      this.formControl.setElementValue(value);
    },
  },
  computed: {
    classes(){
      const { blocked, errorMessage } = this;
      return formControlService.buildCssClasses({ blocked, errorMessage });
    }
  },
  template
};
