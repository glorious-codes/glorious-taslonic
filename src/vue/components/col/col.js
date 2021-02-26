import colService from '@base/services/col/col';
import template from './col.html';

export const tCol = {
  name: 't-col',
  props: [
    'xs',
    'sm',
    'md',
    'lg',
    'offset-xs',
    'offset-sm',
    'offset-md',
    'offset-lg',
    'align-xs',
    'align-sm',
    'align-md',
    'align-lg'
  ],
  computed: {
    classes(){
      const {
        xs,
        sm,
        md,
        lg,
        offsetXs,
        offsetSm,
        offsetMd,
        offsetLg,
        alignXs,
        alignSm,
        alignMd,
        alignLg
      } = this;
      return colService.buildCssClasses({
        xs,
        sm,
        md,
        lg,
        offsetXs,
        offsetSm,
        offsetMd,
        offsetLg,
        alignXs,
        alignSm,
        alignMd,
        alignLg
      });
    }
  },
  template
};
