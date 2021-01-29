import '@base/styles/row.styl';
import rowService from '@base/services/row/row';
import React from 'react';

export const Row = ({ align, offset, verticalAlign, children }) => {
  return (
    <div className={buildCssClasses({ align, offset, verticalAlign })}>
      { children }
    </div>
  );
};

function buildCssClasses({ align, offset, verticalAlign }){
  return rowService.buildCssClasses({ align, offset, verticalAlign });
}
