import buttonService from '@base/services/button/button';
import React from 'react';

export const Button = ({ theme, blocked, children, ...rest }) => {
  return (
    <button className={buildCssClasses(theme, blocked)} { ...rest }>
      { children }
    </button>
  );
};

function buildCssClasses(theme, blocked){
  return buttonService.buildCssClasses({ theme, blocked });
}
