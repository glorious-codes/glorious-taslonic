import React, { useState, useEffect, useRef } from 'react';
import fieldService from '@base/services/field/field';

export const Field = ({ label, required, blocked, children }) => {
  const [cssClasses, setCssClasses] = useState('');
  const fieldElement = useRef();

  useEffect(() => {
    setCssClasses(buildCssClasses(required, blocked, fieldElement.current));
  }, [required, blocked, fieldElement, setCssClasses]);

  return (
    <span ref={fieldElement} className={cssClasses}>
      <label className="t-field-label">
        { label }
      </label>
      <div className="t-field-content">
        {children}
      </div>
    </span>
  );
};

function buildCssClasses(required, blocked, element){
  return fieldService.buildCssClasses({ required, blocked, element });
}
