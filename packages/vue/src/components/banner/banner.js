import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/banner';
import bannerService from '@base/services/banner/banner';
import { tButton } from '@vue/components/button/button';
import { tCloseButton } from '@vue/components/close-button/close-button';
import template from './banner.html';

export const tBanner = {
  name: 't-banner',
  components: { tButton, tCloseButton },
  props: ['theme', 'triggerText', 'closeButtonAriaLabel', 'onTriggerClick', 'onClose'],
  data(){
    return {
      isVisible: true,
      defaultCloseButtonAriaLabel: CLOSE_BUTTON_ARIA_LABEL
    };
  },
  methods: {
    onCloseButtonClick(){
      this.setVisibility(false);
      return this.onClose && this.onClose();
    },
    setVisibility(isVisible){
      this.isVisible = isVisible;
    }
  },
  computed: {
    classes(){
      const { theme } = this;
      return bannerService.buildCssClasses({ theme });
    }
  },
  template
};
