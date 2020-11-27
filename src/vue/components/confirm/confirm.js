import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from '@base/constants/confirm';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { button } from '@vue/components/button/button';
import template from './confirm.html';

export const confirm = {
  name: 't-confirm',
  components: {
    tButton: button
  },
  props: {
    cancelButtonText: { default: CANCEL_BUTTON_TEXT },
    confirmButtonText: { default: CONFIRM_BUTTON_TEXT },
    onCancel: { default: function(){ return () => {}; } },
    onConfirm: { default: function(){ return () => {}; } }
  },
  data(){
    return {
      escSubcriptionId: null,
      enterSubscriptionId: null
    };
  },
  created(){
    const { subscribe } = keyboardSubscriptionService;
    const keycodes = { esc: 27, enter: 13 };
    this.escSubcriptionId = subscribe(keycodes.esc, () => this.onCancel());
    this.enterSubscriptionId = subscribe(keycodes.enter, () => this.onConfirm());
  },
  beforeDestroy(){
    const { unsubscribe } = keyboardSubscriptionService;
    unsubscribe(this.escSubcriptionId);
    unsubscribe(this.enterSubscriptionId);
  },
  template
};
