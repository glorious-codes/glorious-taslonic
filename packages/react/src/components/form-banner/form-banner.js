import React from 'react';
import { CLOSE_BUTTON_ARIA_LABEL, TRIGGER_TEXT } from '@base/constants/form-banner';
import { Banner } from '@react/components/banner/banner';

export const FormBanner = ({ message, onTriggerClick, onClose, ...rest }) => {
  return (
    <div className="t-form-banner" {...rest}>
      <Banner
        theme="danger"
        closeButtonAriaLabel={CLOSE_BUTTON_ARIA_LABEL}
        triggerText={TRIGGER_TEXT}
        onTriggerClick={onTriggerClick}
        onClose={onClose}
      >
        { message }
      </Banner>
    </div>
  );
};
