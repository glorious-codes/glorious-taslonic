import React, { useState, useEffect, useRef } from 'react';
import fieldService from '@base/services/field/field';

export const Field = ({ label, required, block, children }) => {
  const [cssClasses, setCssClasses] = useState('');
  const fieldElement = useRef();

  useEffect(() => {
    setCssClasses(buildCssClasses(required, block, fieldElement.current));
  }, [required, block, fieldElement, setCssClasses]);

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

function buildCssClasses(required, block, element){
  return fieldService.buildCssClasses({ required, block, element });
}
