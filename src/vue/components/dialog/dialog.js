import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { button } from '@vue/components/button/button';
import template from './dialog.html';

export const dialog = {
  name: 't-dialog',
  components: {
    tButton: button
  },
  props: ['width', 'title', 'onClose', 'hideCloseButton'],
  data(){
    return {
      keyboardSubscriptionId: null
    };
  },
  created(){
    document.activeElement.blur();
    if(!this.hideCloseButton) this.listenEscapeKeydown();
  },
  beforeDestroy(){
    this.dismissEscapeKeydown();
  },
  methods: {
    onCloseButtonClick(){
      this.onClose && this.onClose();
    },
    listenEscapeKeydown(){
      const { subscribe } = keyboardSubscriptionService;
      const escKeyCode = 27;
      this.keyboardSubscriptionId = subscribe(escKeyCode, () => {
        this.onClose && this.onClose();
      });
    },
    dismissEscapeKeydown(){
      const { keyboardSubscriptionId } = this;
      const { unsubscribe } = keyboardSubscriptionService;
      keyboardSubscriptionId && unsubscribe(keyboardSubscriptionId);
    }
  },
  computed: {
    styles(){
      const { width } = this;
      return `max-width: ${width}`;
    }
  },
  template
};
