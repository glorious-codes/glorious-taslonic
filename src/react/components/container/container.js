import '@base/styles/container.styl';
import containerService from '@base/services/container/container';
import React from 'react';

export const Container = ({ size, children }) => {
  return (
    <div className={buildCssClasses(size)}>
      { children }
    </div>
  );
};

function buildCssClasses(size){
  return containerService.buildCssClasses({ size });
}
