import containerService from '@base/services/container/container';
import React from 'react';

export const Container = ({ size, children, ...rest }) => {
  return (
    <div className={buildCssClasses(size)} {...rest}>
      {children}
    </div>
  );
};

function buildCssClasses(size){
  return containerService.buildCssClasses({ size });
}
