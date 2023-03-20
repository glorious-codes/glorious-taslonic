import React from 'react';
import { CLOSE_BUTTON_ARIAL_LABEL } from '@base/constants/toast';
import toastService from '@base/services/toast/toast';
import { CloseButton } from '@react/components/close-button/close-button';

export const Toast = ({ title, message, theme, onClose, ...rest }) => {
  const handleClose = () => onClose && onClose();

  return (
    <div className={toastService.buildCssClasses({ theme })} {...rest} data-toast>
      {title && <h3 className="t-toast-title" data-toast-title>{title}</h3>}
      <div className="t-toast-content" data-toast-content>{message}</div>
      <CloseButton aria-label={CLOSE_BUTTON_ARIAL_LABEL} onClick={handleClose} />
    </div>
  );
};
