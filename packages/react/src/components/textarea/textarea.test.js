import React from 'react';
import { run } from '@base/tests/textarea';
import { customRender, screen, waitFor } from '@react/services/testing/testing';
import { Textarea } from '@react/';

function mount({
  value,
  placeholder,
  validations,
  block,
  disabled,
  required,
  ...rest
} = {}){
  return customRender(
    <Textarea
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

run(mount, { screen, waitFor });
