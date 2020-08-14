import containerService from '@base/services/container/container';
import template from './container.html';

export const container = {
  name: 't-container',
  props: ['size'],
  computed: {
    classes(){
      return containerService.buildCssClasses({ size: this.size });
    }
  },
  template
};
