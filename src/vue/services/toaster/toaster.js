import idService from '@base/services/id/id';
import toasterService from '@base/services/toaster/toaster';
import componentBuilder from '@vue/builders/component/component';
import { tToast } from '@vue/components/toast/toast';

const _public = {};

_public.pop = ({ title, message = '', theme } = {}) => {
  const toastEl = buildToastElement(title, message, theme);
  toasterService.pop(toastEl);
};

function buildToastElement(title, message, theme){
  const id = idService.generate();
  const { element } = componentBuilder.build({
    controller: {
      components: { tToast },
      data(){
        return {
          title,
          message,
          theme
        };
      },
      mounted(){
        setTimeout(this.onClose, 5000);
      },
      methods: {
        onClose(){
          const toastEl = document.querySelector(`[data-toast-id="${id}"]`);
          this.$destroy();
          toastEl && toastEl.remove();
        }
      }
    },
    template: `
    <t-toast
      :title="title"
      :message="message"
      :theme="theme"
      :on-close="onClose"
      data-toast-id=${id}
    />`
  });
  return element;
}

export default _public;
