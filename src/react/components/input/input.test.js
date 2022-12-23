import React, { useState } from 'react';
import { run } from '@base/tests/input';
import { customRender, screen } from '@react/services/testing/testing';
import { Input, Button } from '@react/';

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
  const Component = () => {
    const [props, setProps] = useState({ value, required, disabled, validations });

    return (
      <div>
        <Input
          type={type}
          value={props.value}
          placeholder={placeholder}
          block={block}
          validations={props.validations}
          disabled={props.disabled}
          required={props.required}
          {...rest}
        />
        <Button onClick={() => setProps({ required: !required })}>
          toggle required
        </Button>
        <Button onClick={() => setProps({ disabled: !disabled })}>
          toggle disabled
        </Button>
        <Button onClick={() => setProps({ value: 'Fernando' })}>
          update value
        </Button>
        <Button onClick={() => setProps({ validations: [] })}>
          remove custom validations
        </Button>
      </div>
    );
  };
  return customRender(<Component />);
}

run(mount, { screen });
