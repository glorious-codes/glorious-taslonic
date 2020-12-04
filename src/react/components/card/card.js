import React from 'react';

export const Card = ({ title, titleTagName, children }) => (
  <div className="t-card">
    { handleTitle(title, titleTagName) }
    <div className="t-card-content">
      { children }
    </div>
  </div>
);

function handleTitle(title, Tag = 'h3'){
  if(title) return <Tag className="t-card-title">{ title }</Tag>;
}
