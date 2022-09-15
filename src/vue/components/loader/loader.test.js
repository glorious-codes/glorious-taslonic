import { run } from '@base/tests/loader';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tLoader } from '@vue/';

function mount({ theme, ...rest} = {}){
  return customRender({
    components: { tLoader },
    data(){
      return {
        theme
      };
    },
    template: `<t-loader :theme="theme" ${stringifyAttributes(rest)} />`
  });
}

run(mount, { screen });
