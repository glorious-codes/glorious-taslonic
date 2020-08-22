import buttonService from '@base/services/button/button';
import React from 'react';

export const Button = ({ theme, blocked, tag, children, ...rest }) => {
  const TagName = buttonService.buildTagName(tag);
  return (
    <TagName
      className={buildCssClasses(theme, blocked)} { ...rest }
      tabindex="0">
      { children }
    </TagName>
  );
};

function buildCssClasses(theme, blocked){
  return buttonService.buildCssClasses({ theme, blocked });
}
