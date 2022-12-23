import { run } from '@base/tests/banner';
import { customRender, screen, stringifyAttributes } from '@vue/services/testing/testing';
import { tBanner } from '@vue/';

function mount({
  content,
  theme,
  triggerText,
  onTriggerClick,
  onClose,
  ...rest
} = {}){
  return customRender({
    components: { tBanner },
    data(){
      return {
        theme,
        triggerText,
        onTriggerClick,
        onClose
      };
    },
    template: `
      <t-banner
        :theme="theme"
        :trigger-text="triggerText"
        :on-trigger-click="onTriggerClick"
        :on-close="onClose"
        ${stringifyAttributes(rest)}
      >
        ${content}
      </t-banner>`
  });
}

run(mount, { screen });
