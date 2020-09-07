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
      blocked={blocked}
      validations={validations}
      querySelector="input"
    >
      <input
        type={inputService.parseType(type)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...rest}
      />
    </FormControl>
  );
};
