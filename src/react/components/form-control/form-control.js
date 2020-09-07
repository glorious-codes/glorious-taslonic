import React, { useState, useEffect, useRef } from 'react';
import { FormControlModel } from '@base/models/form-control/form-control';
import formControlService from '@base/services/form-control/form-control';

export const FormControl = ({ value, validations, querySelector, blocked, children }) => {
  const [formControlModel, setFormControlModel] = useState();
  const [currentValue, setCurrentValue] = useState(value);
  const [errorMessage, setErrorMessage] = useState();
  const { buildCssClasses } = formControlService;
  const onValidate = errorMessage => setErrorMessage(errorMessage);
  const formControlEl = useRef();

  useEffect(() => {
    const formControlModel = new FormControlModel(formControlEl.current.querySelector(querySelector), {
      onValidate,
      validations,
      value
    });
    setFormControlModel(formControlModel);
  }, []);

  useEffect(() => {
    if(formControlModel && value !== currentValue) {
      formControlModel.setElementValue(value);
      setCurrentValue(value);
    }
  });

  return (
    <span className={buildCssClasses({ errorMessage, blocked })} ref={formControlEl}>
      { children }
      <span className="t-form-control-error-message" data-form-control-error-message>
        { errorMessage }
      </span>
    </span>
  );
};
