import Vue from 'vue';

const _public = {};

_public.build = ({ controller = {}, template }) => {
  const container = document.createElement('div');
  const vm = new Vue({ template, ...controller });
  vm.$mount(container);
  return { vm, element: vm.$el };
};

export default _public;
