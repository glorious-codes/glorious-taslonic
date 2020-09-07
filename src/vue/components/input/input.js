import { formControl } from '@vue/components/form-control/form-control';
import inputService from '@base/services/input/input';
import template from './input.html';

export const input = {
  name: 't-input',
  components: {
    tFormControl: formControl
  },
  props: [
    'type',
    'value',
    'placeholder',
    'validations',
    'autofocus',
    'readonly',
    'blocked',
    'disabled',
    'required'
  ],
  computed: {
    inputType(){
      return inputService.parseType(this.type);
    }
  },
  template
};
