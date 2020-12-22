import React from 'react';
import { FormControl } from '@react/components/form-control/form-control';

export const Textarea = ({
  cols,
  rows,
  value,
  placeholder,
  validations,
  block,
  disabled,
  required,
  children,
  ...rest
}) => {
  return (
    <FormControl
      value={value}
      required={required}
      block={block}
      validations={validations}
      formControlElSelector="textarea"
    >
      <textarea
        disabled={disabled}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
        {...rest}
      >{ children }</textarea>
    </FormControl>
  );
};
