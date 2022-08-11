import '@base/styles/alert.styl';
import React, { useEffect } from 'react';
import { DISMISS_BUTTON_TEXT } from '@base/constants/alert';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { Button } from '@react/components/button/button';

export const Alert = ({
  children,
  dismissButtonText = DISMISS_BUTTON_TEXT,
  onDismiss
}) => {

  useEffect(() => {
    const { subscribe, unsubscribe } = keyboardSubscriptionService;
    const enterKeyCode = 13;
    const enterSubcriptionId = subscribe(enterKeyCode, () => onDismiss());
    return () => unsubscribe(enterSubcriptionId);
  }, [onDismiss]);

  return (
    <div className="t-alert-content">
      {children}
      <div className="t-alert-footer">
        <Button theme="primary" onClick={() => onDismiss && onDismiss()}>
          {dismissButtonText}
        </Button>
      </div>
    </div>
  );
};
