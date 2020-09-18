import React, { useState } from 'react';
import bannerService from '@base/services/banner/banner';
import { Button } from '@react/components/button/button';

export const Banner = ({
  theme,
  triggerText,
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
        <div className="t-banner-content">
          { children }
        </div>
        { onTriggerClick && buildTrigger(triggerText, onTriggerClick) }
        <div className="t-banner-close">
          <Button
            theme="lookless"
            onClick={onCloseButtonClick}
            data-banner-close-button
          >
            ×
          </Button>
        </div>
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
