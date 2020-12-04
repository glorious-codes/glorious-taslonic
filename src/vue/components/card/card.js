import template from './card.html';

export const card = {
  name: 't-card',
  props: ['title', 'titleTagName'],
  computed: {
    tagName(){
      return this.titleTagName || 'h3';
    }
  },
  template
};
