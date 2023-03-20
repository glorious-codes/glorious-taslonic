import React from 'react';
import { run } from '@base/tests/container';
import { customRender, screen } from '@react/services/testing/testing';
import { Container } from '@react/';

function mount({ content, size, ...rest } = {}){
  return customRender(
    <Container size={size} {...rest}>
      {content}
    </Container>
  );
}

run(mount, { screen });
