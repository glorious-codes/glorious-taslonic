import '@base/styles/button.styl';
import React, { useState, useEffect, useRef } from 'react';
import buttonService from '@base/services/button/button';
import { Loader } from '@react/components/loader/loader';

export const Button = ({ theme, block, tag, type = 'button', children, ...rest }) => {
  const { buildCssClasses, findParentFormModel } = buttonService;
  const TagName = buttonService.buildTagName(tag);
  const [submitting, setSubmitting] = useState();
  const buttonEl = useRef();
  const handleType = () => (!tag || tag == 'button') && { type };
  const handleLoader = submitting => {
    return submitting ? <Loader data-button-loader /> : null;
  };
  const handleContent = (submitting, children) => {
    return !submitting ? children : null;
  };
  const onProcessChange = ({ isSubmitting }) => {
    setSubmitting(isSubmitting);
    return isSubmitting ? dispatchButtonEvent('focus') : dispatchButtonEvent('blur');
  };
  const dispatchButtonEvent = eventType => {
    const button = buttonEl.current;
    button && button[eventType]();
  };

  useEffect(() => {
    if(type == 'submit')
      findParentFormModel(buttonEl.current, formModel => {
        formModel.onProcessChange(onProcessChange);
      });
  }, [type]);

  return (
    <TagName
      className={buildCssClasses({ theme, block })}
      tabIndex="0"
      ref={buttonEl}
      {...handleType()}
      {...rest}
    >
      {handleLoader(submitting)}
      {handleContent(submitting, children)}
    </TagName>
  );
};
