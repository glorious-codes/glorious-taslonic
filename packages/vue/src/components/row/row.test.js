import { run } from '@base/tests/row';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tRow } from '@vue/';

function mount({
  content,
  align,
  alignXs,
  alignSm,
  alignMd,
  alignLg,
  offset,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  verticalAlign,
  verticalAlignXs,
  verticalAlignSm,
  verticalAlignMd,
  verticalAlignLg,
  ...rest
} = {}){
  return customRender({
    components: { tRow },
    data(){
      return {
        content,
        align,
        alignXs,
        alignSm,
        alignMd,
        alignLg,
        offset,
        offsetXs,
        offsetSm,
        offsetMd,
        offsetLg,
        verticalAlign,
        verticalAlignXs,
        verticalAlignSm,
        verticalAlignMd,
        verticalAlignLg
      };
    },
    template: `
      <t-row
        :align="align"
        :align-xs="alignXs"
        :align-sm="alignSm"
        :align-md="alignMd"
        :align-lg="alignLg"
        :offset="offset"
        :offset-xs="offsetXs"
        :offset-sm="offsetSm"
        :offset-md="offsetMd"
        :offset-lg="offsetLg"
        :vertical-align="verticalAlign"
        :vertical-align-xs="verticalAlignXs"
        :vertical-align-sm="verticalAlignSm"
        :vertical-align-md="verticalAlignMd"
        :vertical-align-lg="verticalAlignLg"
        ${stringifyAttributes(rest)}
      >
        ${content}
      </t-row>
    `
  });
}

run(mount, { screen });
