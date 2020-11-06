import { banner } from '@vue/components/banner/banner';
import template from './form-banner.html';

export const formBanner = {
  name: 't-form-banner',
  components: {
    tBanner: banner
  },
  props: ['message', 'theme', 'triggerText', 'onTriggerClick', 'onClose'],
  template
};
