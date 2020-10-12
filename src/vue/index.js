import * as components from '@vue/components';
import toaster from '@vue/services/toaster/toaster';

export default {
  install(Vue) {
    Object.keys(components).forEach(key => {
      const component = components[key];
      Vue.component(component.name, component);
    });
  },
  toaster
};
