import fieldService from '@base/services/field/field';
import template from './field.html';

export const tField = {
  name: 't-field',
  props: ['label', 'required', 'block'],
  data(){
    return {
      element: null,
      formControlId: null
    };
  },
  mounted(){
    this.setElement(this.$el);
    this.setFormControlId(fieldService.findFormControlId({ element: this.$el }));
  },
  methods: {
    setElement(element){
      this.element = element;
    },
    setFormControlId(id){
      this.formControlId = id;
    }
  },
  computed: {
    classes(){
      const { required, block, element } = this;
      return fieldService.buildCssClasses({ required, block, element });
    }
  },
  template
};
