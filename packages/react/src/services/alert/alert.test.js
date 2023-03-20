import React from 'react';
import { run } from '@base/tests/alert';
import { customRender, screen } from '@react/services/testing/testing';
import { alert } from '@react/';

function mount(alertOptions){
  return customRender(
    <button onClick={() => alert.open(alertOptions)}>
      Open alert
    </button>
  );
}

function buildContentMarkup({ title, paragraph }){
  return (
    <p title={title}>
      {paragraph}
    </p>
  );
}

run(mount, { screen, buildContentMarkup });
