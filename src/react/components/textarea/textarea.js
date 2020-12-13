import React from 'react';
import { FormControl } from '@react/components/form-control/form-control';

export const Textarea = ({
  cols,
  rows,
  value,
  placeholder,
  validations,
  blocked,
  disabled,
  required,
  children,
  ...rest
}) => {
  return (
    <FormControl
      value={value}
      required={required}
      blocked={blocked}
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
