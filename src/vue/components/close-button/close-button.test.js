import { run } from '@base/tests/close-button';
import { customRender, screen } from '@vue/services/testing/testing';
import { tCloseButton } from './close-button';

function mount(){
  return customRender({
    components: { tCloseButton },
    template: '<t-close-button />'
  });
}

run(mount, { screen });
