import { run } from '@base/tests/col';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tCol } from '@vue/';

function mount({
  xs,
  sm,
  md,
  lg,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  alignXs,
  alignSm,
  alignMd,
  alignLg,
  content,
  ...rest
} = {}){
  return customRender({
    components: { tCol },
    data(){
      return {
        xs,
        sm,
        md,
        lg,
        offsetXs,
        offsetSm,
        offsetMd,
        offsetLg,
        alignXs,
        alignSm,
        alignMd,
        alignLg
      };
    },
    template: `
      <t-col
        :xs="xs"
        :sm="sm"
        :md="md"
        :lg="lg"
        :offset-xs="offsetXs"
        :offset-sm="offsetSm"
        :offset-md="offsetMd"
        :offset-lg="offsetLg"
        :align-xs="alignXs"
        :align-sm="alignSm"
        :align-md="alignMd"
        :align-lg="alignLg"
        ${stringifyAttributes(rest)}
      >
        ${content}
      </t-col>
    `
  });
}

run(mount, { screen });
