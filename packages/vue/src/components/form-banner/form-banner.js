import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/form-banner';
import { tBanner } from '@vue/components/banner/banner';
import template from './form-banner.html';

export const tFormBanner = {
  name: 't-form-banner',
  components: { tBanner },
  props: ['message', 'theme', 'triggerText', 'onTriggerClick', 'onClose'],
  data(){
    return { closeButtonAriaLabel: CLOSE_BUTTON_ARIA_LABEL };
  },
  template
};
