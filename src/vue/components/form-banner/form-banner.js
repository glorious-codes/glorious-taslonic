import { tBanner } from '@vue/components/banner/banner';
import template from './form-banner.html';

export const tFormBanner = {
  name: 't-form-banner',
  components: { tBanner },
  props: ['message', 'theme', 'triggerText', 'onTriggerClick', 'onClose'],
  template
};
