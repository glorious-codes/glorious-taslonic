import toastService from '@base/services/toast/toast';
import { closeButton } from '@vue/components/close-button/close-button';
import template from './toast.html';

export const toast = {
  name: 't-toast',
  components: {
    tCloseButton: closeButton
  },
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
