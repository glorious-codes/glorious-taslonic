import React from 'react';
import tagService from '@base/services/tag/tag';

export const Tag = ({ theme, children, ...rest }) => (
  <span className={tagService.buildCssClasses({ theme })} {...rest}>
    {children}
  </span>
);
