import React, { useEffect, useRef } from 'react';
import loaderService from '@base/services/loader/loader';

export const Loader = ({ theme, ...rest }) => {
  const wrapper = useRef();

  useEffect(() => {
    loaderService.appendAnimatedElements(wrapper.current);
  }, []);

  return (
    <div className={loaderService.buildCssClasses({ theme })} ref={wrapper} {...rest} />
  );
};
