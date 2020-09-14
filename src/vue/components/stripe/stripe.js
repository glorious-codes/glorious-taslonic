import stripeService from '@base/services/stripe/stripe';
import { button } from '@vue/components/button/button';
import template from './stripe.html';

export const stripe = {
  name: 't-stripe',
  components: {
    tButton: button
  },
  props: ['theme', 'triggerText', 'onTriggerClick', 'onClose'],
  data(){
    return {
      isVisible: true
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
      return stripeService.buildCssClasses({ theme });
    }
  },
  template
};
