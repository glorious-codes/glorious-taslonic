import React from 'react';
import { run } from '@base/tests/confirm';
import { customRender, screen } from '@react/services/testing/testing';
import { confirm } from '@react/';

function mount(confirmOptions){
  return customRender(
    <button onClick={() => confirm.open(confirmOptions)}>
      Open confirm
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
