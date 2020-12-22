import React, { useState, useEffect, useRef } from 'react';
import { FormControlModel } from '@base/models/form-control/form-control';
import formControlService from '@base/services/form-control/form-control';

export const FormControl = ({ value, required, validations, formControlElSelector, block, children }) => {
  const [formControlModel, setFormControlModel] = useState();
  const [currentValue, setCurrentValue] = useState(value);
  const [errorMessage, setErrorMessage] = useState();
  const { buildCssClasses } = formControlService;
  const onValidate = errorMessage => setErrorMessage(errorMessage);
  const formControlEl = useRef();

  useEffect(() => {
    const formControlModel = new FormControlModel(
      formControlEl.current.querySelector(formControlElSelector), {
        onValidate,
        validations,
        required,
        value
      });
    setFormControlModel(formControlModel);
    return () => formControlModel.destroy();
  }, []);

  useEffect(() => {
    if(formControlModel && value !== currentValue) {
      formControlModel.setElementValue(value);
      setCurrentValue(value);
    }
  });

  useEffect(() => {
    if(formControlModel) formControlModel.onRequiredChange(required);
  }, [required]);

  return (
    <span className={buildCssClasses({ errorMessage, block })} ref={formControlEl}>
      { children }
      <span className="t-form-control-error-message" data-form-control-error-message>
        { errorMessage }
      </span>
    </span>
  );
};
