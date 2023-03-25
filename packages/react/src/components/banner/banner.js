import React, { useState } from 'react';
import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/banner';
import bannerService from '@base/services/banner/banner';
import { Button } from '@react/components/button/button';
import { CloseButton } from '@react/components/close-button/close-button';

export const Banner = ({
  theme,
  triggerText,
  closeButtonAriaLabel = CLOSE_BUTTON_ARIA_LABEL,
  onTriggerClick,
  onClose,
  children,
  ...rest
}) => {
  const [isVisible, setVisibility] = useState(true);
  const onCloseButtonClick = () => {
    setVisibility(false);
    return onClose && onClose();
  };

  return isVisible &&
    (
      <div className={bannerService.buildCssClasses({ theme })} {...rest}>
        <div className="t-banner-content" data-banner-content>
          { children }
        </div>
        { onTriggerClick && buildTrigger(triggerText, onTriggerClick) }
        <CloseButton aria-label={closeButtonAriaLabel} onClick={onCloseButtonClick} />
      </div>
    );
};

function buildTrigger(triggerText, onTriggerClick){
  return (
    <div className="t-banner-action">
      <Button theme="lookless" onClick={onTriggerClick} data-banner-trigger>
        { triggerText }
      </Button>
    </div>
  );
}
