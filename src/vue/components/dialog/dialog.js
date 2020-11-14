import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { button } from '@vue/components/button/button';
import template from './dialog.html';

export const dialog = {
  name: 't-dialog',
  components: {
    tButton: button
  },
  props: ['width', 'title', 'onClose'],
  data(){
    return {
      keyboardSubscriptionId: null
    };
  },
  created(){
    this.listenEscapeKeydown();
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
      if(this.onClose) this.keyboardSubscriptionId = subscribe(escKeyCode, () => this.onClose());
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
