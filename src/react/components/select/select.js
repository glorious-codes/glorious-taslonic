import React from 'react';
import { FormControl } from '@react/components/form-control/form-control';
import selectService from '@base/services/select/select';

export const Select = ({
  value,
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
      formControlElSelector="select"
    >
      <span className={selectService.buildWrapperCssClasses({ disabled })}>
        <select disabled={disabled} {...rest}>
          { children }
        </select>
      </span>
    </FormControl>
  );
};
