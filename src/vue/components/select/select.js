import selectService from '@base/services/select/select';
import { tFormControl } from '@vue/components/form-control/form-control';
import template from './select.html';

export const tSelect = {
  name: 't-select',
  components: { tFormControl },
  props: {
    value: { type: String },
    name: { type: String },
    placeholder: { type: String },
    validations: { type: Array },
    autofocus: { type: Boolean },
    block: { type: Boolean },
    required: { type: Boolean },
    disabled: { type: Boolean }
  },
  computed: {
    wrapperCssClasses(){
      const { disabled } = this;
      return selectService.buildWrapperCssClasses({ disabled });
    }
  },
  template
};
