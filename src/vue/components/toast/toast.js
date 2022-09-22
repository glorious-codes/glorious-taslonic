import { CLOSE_BUTTON_ARIAL_LABEL } from '@base/constants/toast';
import toastService from '@base/services/toast/toast';
import { renderContent } from '@vue/services/content/content';
import { tCloseButton } from '@vue/components/close-button/close-button';
import template from './toast.html';

export const tToast = {
  name: 't-toast',
  components: { tCloseButton },
  props: ['title', 'message', 'theme', 'onClose'],
  data(){
    return {
      closeButtonAriaLabel: CLOSE_BUTTON_ARIAL_LABEL
    };
  },
  methods: {
    handleClose(){
      this.onClose && this.onClose();
    }
  },
  mounted(){
    this.title && renderContent(this.title, this.$el.querySelector('[data-toast-title]'));
    this.message && renderContent(this.message, this.$el.querySelector('[data-toast-content]'));
  },
  computed: {
    classes(){
      const { theme } = this;
      return toastService.buildCssClasses({ theme });
    }
  },
  template
};
