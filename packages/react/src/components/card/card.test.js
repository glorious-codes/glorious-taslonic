import React from 'react';
import { run } from '@base/tests/card';
import { customRender, screen } from '@react/services/testing/testing';
import { Card } from '@react/';

function mount({ content, title, titleTagName, ...rest } = {}){
  return customRender(
    <Card title={title} titleTagName={titleTagName} {...rest}>
      { content }
    </Card>
  );
}

run(mount, { screen });
