import React, { useEffect, useRef } from 'react';
import { CANCEL_BUTTON_TEXT, CONFIRM_BUTTON_TEXT } from '@base/constants/confirm';
import domService from '@base/services/dom/dom';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { Button } from '@react/components/button/button';

export const Confirm = ({
  children,
  cancelButtonText = CANCEL_BUTTON_TEXT,
  confirmButtonText = CONFIRM_BUTTON_TEXT,
  onCancel = () => {},
  onConfirm = () => {}
}) => {
  const confirmEl = useRef();
  const queryCancelButton = () => {
    return confirmEl.current.querySelectorAll('[data-confirm-footer] button')[0];
  };

  useEffect(() => {
    const { subscribe, unsubscribe } = keyboardSubscriptionService;
    const keyCodes = { esc: 27, enter: 13 };
    const escSubcriptionId = subscribe(keyCodes.esc, onCancel);
    const enterSubcriptionId = subscribe(keyCodes.enter, () => {
      const cancelButtonEl = queryCancelButton();
      if(!domService.isFocused(cancelButtonEl)) onConfirm();
    });
    return () => {
      unsubscribe(escSubcriptionId);
      unsubscribe(enterSubcriptionId);
    };
  }, [onCancel, onConfirm]);

  return (
    <div className="t-confirm-content" ref={confirmEl}>
      { children }
      <div className="t-confirm-footer" data-confirm-footer>
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
