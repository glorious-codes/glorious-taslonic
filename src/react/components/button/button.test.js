import React from 'react';
import { run } from '@base/tests/button';
import { customRender, screen } from '@react/services/testing/testing';
import { Button } from '@react/';

function mount({ content, block, tag, theme, ...rest } = {}){
  return customRender(
    <Button theme={theme} block={block} tag={tag} {...rest}>
      {content}
    </Button>
  );
}

run(mount, { screen });
