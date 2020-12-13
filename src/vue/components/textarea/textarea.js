import { formControl } from '@vue/components/form-control/form-control';
import template from './textarea.html';

export const textarea = {
  name: 't-textarea',
  components: {
    tFormControl: formControl
  },
  props: {
    cols: { type: String },
    rows: { type: String },
    value: { type: String },
    name: { type: String },
    placeholder: { type: String },
    validations: { type: Array },
    autofocus: { type: Boolean },
    readonly: { type: Boolean },
    blocked: { type: Boolean },
    required: { type: Boolean },
    disabled: { type: Boolean }
  },
  template
};
