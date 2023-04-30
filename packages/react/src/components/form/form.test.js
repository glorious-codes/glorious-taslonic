import React, { useState } from 'react';
import { run } from '@base/tests/form';
import { customRender, screen, waitFor, within } from '@react/services/testing/testing';
import { Button, Field, Form, Input, Select, Textarea } from '@react/';

function mount(initialProps = {}, testOptions){
  const Component = () => {
    const [props, setProps] = useState(initialProps);
    const [formData, setFormData] = useState({});
    const { FIELDS, SUBMIT_BUTTON_TEXT } = testOptions;
    const getFormFieldValue = fieldAttr => formData[fieldAttr] || '';
    const handleFieldValueChange = ({ target: { name, value } }) => {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const buildRequestErrorHandler = errorMessageProp => {
      if(!props[errorMessageProp]) {
        return (err = {}) => {
          err.message && setProps(prevState => ({ ...prevState, [errorMessageProp]: err.message }));
        };
      }
    };
    return (
      <Form {...props}
        onSubmitError={props.onSubmitError || buildRequestErrorHandler('submitErrorMessage')}
        onFetchError={props.onFetchError || buildRequestErrorHandler('fetchErrorMessage')}
      >
        <Field label={FIELDS.NAME.LABEL}>
          <Input
            name={FIELDS.NAME.NAME}
            value={getFormFieldValue(FIELDS.NAME.NAME)}
            validations={FIELDS.NAME.VALIDATIONS}
            onChange={handleFieldValueChange}
            required
          />
        </Field>
        <Field label={FIELDS.FRUIT.LABEL}>
          <Select
            name={FIELDS.FRUIT.NAME}
            value={getFormFieldValue(FIELDS.FRUIT.NAME)}
            validations={FIELDS.FRUIT.VALIDATIONS}
            onChange={handleFieldValueChange}
            required
          >
            <option value="">Select</option>
            {
              FIELDS.FRUIT.OPTIONS.map(({ value, text }) => (
                <option value={value} key={value}>{text}</option>
              ))
            }
          </Select>
        </Field>
        <Field label={FIELDS.BIO.LABEL}>
          <Textarea
            name={FIELDS.BIO.NAME}
            value={getFormFieldValue(FIELDS.BIO.NAME)}
            validations={FIELDS.BIO.VALIDATIONS}
            onChange={handleFieldValueChange}
            required
          />
        </Field>
        <Button type="submit">{SUBMIT_BUTTON_TEXT}</Button>
      </Form>
    );
  };
  return customRender(<Component />);
}

run(mount, { screen, waitFor, within });
