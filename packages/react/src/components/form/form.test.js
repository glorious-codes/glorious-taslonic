import React from 'react';
import { run } from '@base/tests/form';
import { customRender, screen, waitFor, within } from '@react/services/testing/testing';
import { Button, Field, Form, Input, Select, Textarea } from '@react/';

function mount(props, testOptions){
  const { FIELD_LABELS, SUBMIT_BUTTON_TEXT, customValidations, fruits } = testOptions;
  return customRender(
    <Form {...props}>
      <Field label={FIELD_LABELS.NAME}>
        <Input validations={customValidations.name} required />
      </Field>
      <Field label={FIELD_LABELS.FRUIT}>
        <Select validations={customValidations.fruit} required>
          <option value="">Select</option>
          {fruits.map(({ value, text }) => <option value={value} key={value}>{text}</option>)}
        </Select>
      </Field>
      <Field label={FIELD_LABELS.BIO}>
        <Textarea validations={customValidations.bio} required />
      </Field>
      <Button type="submit">{SUBMIT_BUTTON_TEXT}</Button>
    </Form>
  );
}

run(mount, { screen, waitFor, within });
