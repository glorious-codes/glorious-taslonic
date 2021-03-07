import rowService from '@base/services/row/row';
import template from './row.html';

export const tRow = {
  name: 't-row',
  props: [
    'align',
    'align-xs',
    'align-sm',
    'align-md',
    'align-lg',
    'offset',
    'offset-xs',
    'offset-sm',
    'offset-md',
    'offset-lg',
    'vertical-align',
    'vertical-align-xs',
    'vertical-align-sm',
    'vertical-align-md',
    'vertical-align-lg'
  ],
  computed: {
    classes(){
      const {
        align,
        alignXs,
        alignSm,
        alignMd,
        alignLg,
        offset,
        offsetXs,
        offsetSm,
        offsetMd,
        offsetLg,
        verticalAlign,
        verticalAlignXs,
        verticalAlignSm,
        verticalAlignMd,
        verticalAlignLg
      } = this;
      return rowService.buildCssClasses({
        align,
        alignXs,
        alignSm,
        alignMd,
        alignLg,
        offset,
        offsetXs,
        offsetSm,
        offsetMd,
        offsetLg,
        verticalAlign,
        verticalAlignXs,
        verticalAlignSm,
        verticalAlignMd,
        verticalAlignLg
      });
    }
  },
  template
};
