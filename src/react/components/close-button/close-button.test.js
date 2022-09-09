import React from 'react';
import { run } from '@base/tests/close-button';
import { customRender, screen } from '@react/services/testing/testing';
import { CloseButton } from './close-button';

function mount(){
  return customRender(<CloseButton />);
}

run(mount, { screen });
