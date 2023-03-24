import { tFormControl } from '@vue/components/form-control/form-control';
import template from './textarea.html';

export const tTextarea = {
  name: 't-textarea',
  components: { tFormControl },
  inheritAttrs: false,
  props: {
    cols: { type: String },
    rows: { type: String },
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
  template
};
