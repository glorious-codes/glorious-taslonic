import React from 'react';
import { run } from '@base/tests/field';
import { customRender, screen } from '@react/services/testing/testing';
import { Field, Input } from '@react/';

function mount({ content, label, required, block, ...rest } = {}){
  return customRender(
    <Field label={label} required={required} block={block} {...rest}>
      {content}
    </Field>
  );
}

function buildContentMarkup({ required } = {}){
  return <Input required={required} />;
}

run(mount, { screen, buildContentMarkup });
