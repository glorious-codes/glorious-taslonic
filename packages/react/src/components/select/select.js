import React from 'react';
import { FormControl } from '@react/components/form-control/form-control';
import selectService from '@base/services/select/select';

export const Select = ({
  value,
  placeholder,
  validations,
  block,
  disabled,
  required,
  multiple,
  children,
  ...rest
}) => {
  return (
    <FormControl
      value={value}
      required={required}
      block={block}
      validations={validations}
      formControlElSelector="select"
    >
      <span className={selectService.buildWrapperCssClasses({ disabled, multiple })}>
        <select disabled={disabled} multiple={multiple} {...rest}>
          { placeholder && <option value="">{placeholder}</option> }
          { children }
        </select>
      </span>
    </FormControl>
  );
};
