import buttonService from '@base/services/button/button';
import { loader } from '@vue/components/loader/loader';
import template from './button.html';

export const button = {
  name: 't-button',
  components: {
    tLoader: loader
  },
  props: ['theme', 'block', 'tag', 'type'],
  data(){
    return {
      submitting: false
    };
  },
  mounted(){
    if(this.type == 'submit')
      buttonService.findParentFormModel(this.$el, this.onParentFormModelFind);
  },
  methods: {
    onParentFormModelFind(form){
      form.onProcessChange(this.handleFormProcessChange);
    },
    handleFormProcessChange({ isSubmitting }){
      const button = this.$el;
      this.setSubmitting(isSubmitting);
      return isSubmitting ? button.focus() : button.blur();
    },
    setSubmitting(submitting){
      this.submitting = submitting;
    }
  },
  computed: {
    classes(){
      const { theme, block } = this;
      return buttonService.buildCssClasses({ theme, block });
    },
    tagName(){
      return buttonService.buildTagName(this.tag);
    },
    buttonType(){
      return buttonService.parseType(this.type);
    }
  },
  template
};
