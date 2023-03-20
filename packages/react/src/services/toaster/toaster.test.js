import React from 'react';
import { run } from '@base/tests/toaster';
import { customRender, screen } from '@react/services/testing/testing';
import { toaster } from '@react/';

function mount(toastOptions){
  return customRender(
    <button onClick={() => toaster.pop(toastOptions)}>Pop toast</button>
  );
}

function buildContentMarkup({ title, paragraph }){
  return (
    <span title={title}>
      {paragraph}
    </span>
  );
}

run(mount, { screen, buildContentMarkup });
