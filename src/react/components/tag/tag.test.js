import React from 'react';
import { run } from '@base/tests/tag';
import { customRender, screen } from '@react/services/testing/testing';
import { Tag } from '@react/';

function mount({ content, theme, ...rest } = {}){
  return customRender(
    <Tag theme={theme} {...rest}>
      {content}
    </Tag>
  );
}

run(mount, { screen });
