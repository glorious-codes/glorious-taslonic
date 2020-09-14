import React, { useState } from 'react';
import stripeService from '@base/services/stripe/stripe';
import { Button } from '@react/components/button/button';

export const Stripe = ({
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
      <div className={stripeService.buildCssClasses({ theme })} {...rest}>
        <div className="t-stripe-content">
          { children }
        </div>
        { onTriggerClick && buildTrigger(triggerText, onTriggerClick) }
        <div className="t-stripe-close">
          <Button
            theme="lookless"
            onClick={onCloseButtonClick}
            data-stripe-close-button
          >
            ×
          </Button>
        </div>
      </div>
    );
};

function buildTrigger(triggerText, onTriggerClick){
  return (
    <div className="t-stripe-action">
      <Button theme="lookless" onClick={onTriggerClick} data-stripe-trigger>
        { triggerText }
      </Button>
    </div>
  );
}
