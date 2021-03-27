import '@base/styles/row.styl';
import rowService from '@base/services/row/row';
import React from 'react';

export const Row = ({
  align,
  alignXs,
  alignSm,
  alignMd,
  alignLg,
  offset,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  verticalAlign,
  verticalAlignXs,
  verticalAlignSm,
  verticalAlignMd,
  verticalAlignLg,
  children,
  ...rest
}) => {
  const cssClassOrientedProps = {
    align,
    alignXs,
    alignSm,
    alignMd,
    alignLg,
    offset,
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    verticalAlign,
    verticalAlignXs,
    verticalAlignSm,
    verticalAlignMd,
    verticalAlignLg
  };
  return (
    <div className={rowService.buildCssClasses(cssClassOrientedProps)} {...rest}>
      { children }
    </div>
  );
};
