import React from 'react';
import { Button } from '@react/components/button/button';

export const CloseButton = ({ ...rest }) => {
  return (
    <span className="t-close-button">
      <Button theme="lookless" { ...rest } data-close-button>×</Button>
    </span>
  );
};
