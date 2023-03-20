import React from 'react';

export const Card = ({ title, titleTagName, children, ...rest }) => (
  <div className="t-card" {...rest}>
    {handleTitle(title, titleTagName)}
    <div className="t-card-content">
      {children}
    </div>
  </div>
);

function handleTitle(title, Tag = 'h3'){
  return title && <Tag className="t-card-title">{ title }</Tag>;
}
