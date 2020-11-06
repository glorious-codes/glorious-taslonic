import React from 'react';
import { shallow } from 'enzyme';
import { Banner } from '@react/components/banner/banner';
import { FormBanner } from './form-banner';

describe('Form Banner', () => {
  function mount({ message, theme, triggerText, onTriggerClick, onClose } = {}){
    return shallow(
      <FormBanner
        message={message}
        theme={theme}
        triggerText={triggerText}
        onTriggerClick={onTriggerClick}
        onClose={onClose}
      />
    );
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-form-banner');
  });

  it('should contain a banner', () => {
    const message = 'Some message';
    const theme = 'danger';
    const triggerText = 'Retry';
    const onTriggerClick = jest.fn();
    const onClose = jest.fn();
    const wrapper = mount({ message, theme, triggerText, onTriggerClick, onClose });
    const formBanner = wrapper.find(Banner);
    expect(formBanner.prop('children')).toEqual(message);
    expect(formBanner.prop('theme')).toEqual(theme);
    expect(formBanner.prop('triggerText')).toEqual(triggerText);
    expect(formBanner.prop('onTriggerClick')).toEqual(onTriggerClick);
    expect(formBanner.prop('onClose')).toEqual(onClose);
  });
});
