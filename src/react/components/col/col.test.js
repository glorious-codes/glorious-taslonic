import React from 'react';
import { run } from '@base/tests/col';
import { customRender, screen } from '@react/services/testing/testing';
import { Col } from '@react/';

function mount({
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
  content,
  ...rest
} = {}){
  return customRender(
    <Col
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      offsetXs={offsetXs}
      offsetSm={offsetSm}
      offsetMd={offsetMd}
      offsetLg={offsetLg}
      alignXs={alignXs}
      alignSm={alignSm}
      alignMd={alignMd}
      alignLg={alignLg}
      {...rest}
    >
      {content}
    </Col>
  );
}

run(mount, { screen });
