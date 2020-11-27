import React, { useEffect } from 'react';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from '@base/constants/confirm';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { Button } from '@react/components/button/button';

export const Confirm = ({
  children,
  cancelButtonText = CANCEL_BUTTON_TEXT,
  confirmButtonText = CONFIRM_BUTTON_TEXT,
  onCancel = () => {},
  onConfirm = () => {}
}) => {
  useEffect(() => {
    const { subscribe, unsubscribe } = keyboardSubscriptionService;
    const keyCodes = { esc: 27, enter: 13 };
    const escSubcriptionId = subscribe(keyCodes.esc, onCancel);
    const enterSubcriptionId = subscribe(keyCodes.enter, onConfirm);
    return () => {
      unsubscribe(escSubcriptionId);
      unsubscribe(enterSubcriptionId);
    };
  }, [onCancel, onConfirm]);

  return (
    <div className="t-confirm-content">
      { children }
      <div className="t-confirm-footer">
        <Button onClick={ onCancel }>
          { cancelButtonText }
        </Button>
        <Button theme="primary" onClick={ onConfirm }>
          { confirmButtonText }
        </Button>
      </div>
    </div>
  );
};
