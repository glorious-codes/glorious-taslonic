import { DISMISS_BUTTON_TEXT } from '@base/constants/alert';
import domService from '@base/services/dom/dom';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { tButton } from '@vue/components/button/button';
import { renderContent } from '@vue/services/content/content';
import template from './alert.html';

export const tAlert = {
  name: 't-alert',
  components: { tButton },
  props: {
    content: { type: [String, Object] },
    dismissButtonText: { default: DISMISS_BUTTON_TEXT },
    onDismiss: { type: Function }
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
      !domService.isFocused(dismissButton) && this.dismiss();
    });
    renderContent(this.content, this.$el);
  },
  beforeDestroy(){
    const { unsubscribe } = keyboardSubscriptionService;
    unsubscribe(this.enterSubscriptionId);
  },
  methods: {
    onDismissButtonClick(){
      this.dismiss();
    },
    dismiss(){
      this.onDismiss && this.onDismiss();
    }
  },
  template
};
