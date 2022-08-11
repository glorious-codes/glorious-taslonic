import { run } from '@base/tests/alert';
import { customRender, screen } from '@vue/services/testing/testing';
import { tAlert } from './alert';

function mount({ content = '', ...props } = {}){
  return customRender(tAlert, { props, slots: { default: content } });
}

function buildContentMarkup(text){
  return `<p>${text}</p>`;
}

run(mount, { screen, buildContentMarkup });
