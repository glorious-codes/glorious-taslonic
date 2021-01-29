import '@base/styles/dialog.styl';
import React, { useEffect } from 'react';
import keyboardSubscriptionService from '@base/services/keyboardSubscription/keyboardSubscription';
import { Button } from '@react/components/button/button';

export const Dialog = ({ width, title, hideCloseButton, onClose, children }) => {
  document.activeElement.blur();

  useEffect(() => {
    if(!hideCloseButton) {
      const escKeyCode = 27;
      const id = keyboardSubscriptionService.subscribe(escKeyCode, onClose);
      return () => keyboardSubscriptionService.unsubscribe(id);
    }
  }, []);

  return (
    <div className="t-dialog-backdrop">
      <div
        className="t-dialog"
        style={ buildStyle(width) }
        data-dialog>
        <div className="t-dialog-header">
          { buildTitle(title) }
          { !hideCloseButton && buildCloseButton(onClose) }
        </div>
        <div className="t-dialog-content">
          { children }
        </div>
      </div>
    </div>
  );
};

function buildStyle(width){
  return width ? { maxWidth: width } : {};
}

function buildTitle(title){
  if(title)
    return (
      <h2 className="t-dialog-title" data-dialog-title>
        { title }
      </h2>
    );
}

function buildCloseButton(onClose){
  return (
    <span className="t-dialog-close-button-container">
      <Button
        aria-label="close"
        theme="lookless"
        onClick={ onClose }
        data-dialog-close-button>
        ×
      </Button>
    </span>
  );
}
