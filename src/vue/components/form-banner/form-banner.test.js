import { shallowMount } from '@vue/test-utils';
import { tBanner } from '@vue/components/banner/banner';
import { tFormBanner } from './form-banner';

describe('Form Banner', () => {
  function mount(propsData = {}){
    return shallowMount(tFormBanner, { propsData });
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.classes()).toContain('t-form-banner');
  });

  it('should contain a banner', () => {
    const message = 'Some message';
    const theme = 'danger';
    const triggerText = 'Retry';
    const onTriggerClick = jest.fn();
    const onClose = jest.fn();
    const wrapper = mount({ message, theme, triggerText, onTriggerClick, onClose });
    const formBanner = wrapper.findComponent(tBanner);
    expect(formBanner.text()).toEqual(message);
    expect(formBanner.props('theme')).toEqual(theme);
    expect(formBanner.props('triggerText')).toEqual(triggerText);
    expect(formBanner.props('onTriggerClick')).toEqual(onTriggerClick);
    expect(formBanner.props('onClose')).toEqual(onClose);
  });
});
