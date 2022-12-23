import React from 'react';
import { run } from '@base/tests/select';
import { customRender, screen } from '@react/services/testing/testing';
import { Select } from '@react/';

function mount({
  value,
  placeholder,
  validations,
  block,
  disabled,
  required,
  multiple,
  content,
  ...rest
} = {}){
  return customRender(
    <Select
      value={value}
      placeholder={placeholder}
      validations={validations}
      block={block}
      disabled={disabled}
      required={required}
      multiple={multiple}
      {...rest}
    >
      {content}
    </Select>
  );
}

function buildOptions(opts){
  return opts.map(value => (
    <option value={value} key={value}>{value}</option>
  ));
}

run(mount, { screen, buildOptions });
