import React from 'react';
import { run } from '@base/tests/input';
import { customRender, screen } from '@react/services/testing/testing';
import { Input } from '@react/';

function mount({
  type,
  value,
  placeholder,
  validations,
  block,
  disabled,
  required,
  ...rest
} = {}){
  return customRender(
    <Input
      type={type}
      value={value}
      placeholder={placeholder}
      validations={validations}
      block={block}
      disabled={disabled}
      required={required}
      {...rest}
    />
  );
}

run(mount, { screen });
