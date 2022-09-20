import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from '@base/constants/confirm';
import domService from '@base/services/dom/dom';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { tButton } from '@vue/components/button/button';
import { renderContent } from '@vue/services/content/content';
import template from './confirm.html';

export const tConfirm = {
  name: 't-confirm',
  components: { tButton },
  props: {
    content: { type: [String, Object] },
    cancelButtonText: { default: CANCEL_BUTTON_TEXT },
    confirmButtonText: { default: CONFIRM_BUTTON_TEXT },
    onCancel: { type: Function },
    onConfirm: { type: Function }
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
    this.escSubcriptionId = subscribe(keycodes.esc, () => this.handleCallbackProp(this.onCancel));
    this.enterSubscriptionId = subscribe(keycodes.enter, () => {
      if(!this.isCancelButtonFocused() && !this.isConfirmButtonFocused())
        this.handleCallbackProp(this.onConfirm);
    });
  },
  mounted(){
    renderContent(this.content, this.$el);
  },
  beforeDestroy(){
    const { unsubscribe } = keyboardSubscriptionService;
    unsubscribe(this.escSubcriptionId);
    unsubscribe(this.enterSubscriptionId);
  },
  methods: {
    isCancelButtonFocused(){
      return this.isButtonFocused('cancelButton');
    },
    isConfirmButtonFocused(){
      return this.isButtonFocused('confirmButton');
    },
    isButtonFocused(refName){
      const button = this.$refs[refName].$el;
      return domService.isFocused(button);
    },
    onCancelButtonClick(){
      this.handleCallbackProp(this.onCancel);
    },
    onConfirmButtonClick(){
      this.handleCallbackProp(this.onConfirm);
    },
    handleCallbackProp(callback){
      callback && callback();
    }
  },
  template
};
