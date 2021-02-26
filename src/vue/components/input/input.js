import { tFormControl } from '@vue/components/form-control/form-control';
import inputService from '@base/services/input/input';
import template from './input.html';

export const tInput = {
  name: 't-input',
  components: { tFormControl },
  props: {
    type: { type: String },
    value: { type: String },
    name: { type: String },
    placeholder: { type: String },
    validations: { type: Array },
    autofocus: { type: Boolean },
    readonly: { type: Boolean },
    block: { type: Boolean },
    required: { type: Boolean },
    disabled: { type: Boolean }
  },
  computed: {
    inputType(){
      return inputService.parseType(this.type);
    }
  },
  template
};
