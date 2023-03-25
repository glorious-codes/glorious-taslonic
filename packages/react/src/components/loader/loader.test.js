import React from 'react';
import { run } from '@base/tests/loader';
import { customRender, screen } from '@react/services/testing/testing';
import { Loader } from '@react/';

function mount({ theme, ...rest } = {}){
  return customRender(
    <Loader theme={theme} {...rest} />
  );
}

run(mount, { screen });
