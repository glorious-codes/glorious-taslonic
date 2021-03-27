import '@base/styles/col.styl';
import colService from '@base/services/col/col';
import React from 'react';

export const Col = ({
  xs,
  sm,
  md,
  lg,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  alignXs,
  alignSm,
  alignMd,
  alignLg,
  children,
  ...rest
}) => {
  return (
    <div
      className={buildCssClasses({
        xs,
        sm,
        md,
        lg,
        offsetXs,
        offsetSm,
        offsetMd,
        offsetLg,
        alignXs,
        alignSm,
        alignMd,
        alignLg
      })} {...rest}>
      { children }
    </div>
  );
};

function buildCssClasses({
  xs,
  sm,
  md,
  lg,
  offsetXs,
  offsetSm,
  offsetMd,
  offsetLg,
  alignXs,
  alignSm,
  alignMd,
  alignLg
}){
  return colService.buildCssClasses({
    xs,
    sm,
    md,
    lg,
    offsetXs,
    offsetSm,
    offsetMd,
    offsetLg,
    alignXs,
    alignSm,
    alignMd,
    alignLg
  });
}
