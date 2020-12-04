import tagService from '@base/services/tag/tag';
import template from './tag.html';

export const tag = {
  name: 't-tag',
  props: ['theme'],
  computed: {
    classes(){
      const { theme } = this;
      return tagService.buildCssClasses({ theme });
    }
  },
  template
};
