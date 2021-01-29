import '@base/styles/tag.styl';
import React from 'react';
import tagService from '@base/services/tag/tag';

export const Tag = ({ theme, children }) => (
  <span className={tagService.buildCssClasses({ theme })}>
    { children }
  </span>
);
