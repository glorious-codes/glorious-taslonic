import toastService from '@base/services/toast/toast';
import { tCloseButton } from '@vue/components/close-button/close-button';
import template from './toast.html';

export const tToast = {
  name: 't-toast',
  components: { tCloseButton },
  props: ['title', 'theme', 'onClose'],
  methods: {
    handleClose(){
      this.onClose && this.onClose();
    }
  },
  computed: {
    classes(){
      const { theme } = this;
      return toastService.buildCssClasses({ theme });
    }
  },
  template
};
