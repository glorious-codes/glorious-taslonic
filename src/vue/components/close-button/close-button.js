import { tButton } from '@vue/components/button/button';
import template from './close-button.html';

export const tCloseButton = {
  name: 't-close-button',
  props: ['ariaLabel'],
  components: { tButton },
  template
};
