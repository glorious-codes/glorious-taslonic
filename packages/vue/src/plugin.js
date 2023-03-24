import * as components from '@vue/components';
import alert from '@vue/services/alert/alert';
import confirm from '@vue/services/confirm/confirm';
import dialog from '@vue/services/dialog/dialog';
import toaster from '@vue/services/toaster/toaster';

export default {
  install(Vue) {
    Object.keys(components).forEach(key => {
      const component = components[key];
      Vue.component(component.name, component);
    });
  },
  alert,
  confirm,
  dialog,
  toaster
};
