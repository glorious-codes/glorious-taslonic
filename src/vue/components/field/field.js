import fieldService from '@base/services/field/field';
import template from './field.html';

export const field = {
  name: 't-field',
  props: ['label', 'required', 'blocked'],
  data(){
    return {
      element: null
    };
  },
  mounted(){
    this.setElement(this.$el);
  },
  methods: {
    setElement(element){
      this.element = element;
    }
  },
  computed: {
    classes(){
      const { required, blocked, element } = this;
      return fieldService.buildCssClasses({ required, blocked, element });
    }
  },
  template
};
