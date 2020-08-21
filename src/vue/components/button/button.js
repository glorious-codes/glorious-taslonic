import buttonService from '@base/services/button/button';
import template from './button.html';

export const button = {
  name: 't-button',
  props: ['theme', 'blocked'],
  computed: {
    classes(){
      const { theme, blocked } = this;
      return buttonService.buildCssClasses({ theme, blocked });
    }
  },
  template
};
