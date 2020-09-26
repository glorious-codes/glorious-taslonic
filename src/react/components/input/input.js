import React from 'react';
import { FormControl } from '@react/components/form-control/form-control';
import inputService from '@base/services/input/input';

export const Input = ({
  type,
  value,
  placeholder,
  validations,
  blocked,
  disabled,
  required,
  ...rest
}) => {
  return (
    <FormControl
      value={value}
      required={required}
      blocked={blocked}
      validations={validations}
      formControlElSelector="input"
    >
      <input
        type={inputService.parseType(type)}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
    </FormControl>
  );
};
