import rowService from '@base/services/row/row';
import template from './row.html';

export const tRow = {
  name: 't-row',
  props: ['align', 'offset', 'vertical-align'],
  computed: {
    classes(){
      const { align, offset, verticalAlign } = this;
      return rowService.buildCssClasses({ align, offset, verticalAlign });
    }
  },
  template
};
