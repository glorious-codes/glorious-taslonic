import loaderService from '@base/services/loader/loader';
import template from './loader.html';

export const tLoader = {
  name: 't-loader',
  props: ['theme'],
  mounted(){
    loaderService.buildAnimatedElements().forEach(el => this.$el.appendChild(el));
  },
  computed: {
    classes(){
      const { theme } = this;
      return loaderService.buildCssClasses({ theme });
    }
  },
  template
};
