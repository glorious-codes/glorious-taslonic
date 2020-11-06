import React from 'react';
import { Banner } from '@react/components/banner/banner';

export const FormBanner = ({ message, theme, triggerText, onTriggerClick, onClose, ...rest }) => {
  return (
    <div className="t-form-banner" {...rest}>
      <Banner theme={theme} onTriggerClick={onTriggerClick} triggerText={triggerText} onClose={onClose}>
        { message }
      </Banner>
    </div>
  );
};
