import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from '@base/constants/confirm';
import domService from '@base/services/dom/dom';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { tButton } from '@vue/components/button/button';
import template from './confirm.html';

export const tConfirm = {
  name: 't-confirm',
  components: { tButton },
  props: ['cancelButtonText', 'confirmButtonText', 'onCancel', 'onConfirm'],
  data(){
    return {
      defaultCancelButtonText: CANCEL_BUTTON_TEXT,
      defaultConfirmButtonText: CONFIRM_BUTTON_TEXT,
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
