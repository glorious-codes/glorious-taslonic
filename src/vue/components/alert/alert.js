import { DISMISS_BUTTON_TEXT } from '@base/constants/alert';
import domService from '@base/services/dom/dom';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { tButton } from '@vue/components/button/button';
import template from './alert.html';

export const tAlert = {
  name: 't-alert',
  components: { tButton },
  props: {
    dismissButtonText: { default: DISMISS_BUTTON_TEXT },
    onDismiss: { default: function(){ return () => {}; } }
  },
  data(){
    return {
      enterSubscriptionId: null
    };
  },
  mounted(){
    const { subscribe } = keyboardSubscriptionService;
    const keycodes = { enter: 13 };
    const dismissButton = this.$refs.dismissButton.$el;
    this.enterSubscriptionId = subscribe(keycodes.enter, () => {
      if(!domService.isFocused(dismissButton)) this.onDismiss();
    });
  },
  beforeDestroy(){
    const { unsubscribe } = keyboardSubscriptionService;
    unsubscribe(this.enterSubscriptionId);
  },
  template
};
