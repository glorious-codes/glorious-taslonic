import React from 'react';
import { run } from '@base/tests/row';
import { customRender, screen } from '@react/services/testing/testing';
import { Row } from '@react/';

function mount({
  content,
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
  ...rest
} = {}){
  return customRender(
    <Row
      align={align}
      alignXs={alignXs}
      alignSm={alignSm}
      alignMd={alignMd}
      alignLg={alignLg}
      offset={offset}
      offsetXs={offsetXs}
      offsetSm={offsetSm}
      offsetMd={offsetMd}
      offsetLg={offsetLg}
      verticalAlign={verticalAlign}
      verticalAlignXs={verticalAlignXs}
      verticalAlignSm={verticalAlignSm}
      verticalAlignMd={verticalAlignMd}
      verticalAlignLg={verticalAlignLg}
      {...rest}
    >
      {content}
    </Row>
  );
}

run(mount, { screen });
