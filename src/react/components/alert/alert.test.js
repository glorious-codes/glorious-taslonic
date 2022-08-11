import React from 'react';
import { run } from '@base/tests/alert';
import { customRender, screen } from '@react/services/testing/testing';
import { Alert } from './alert';

function mount({ content, dismissButtonText, onDismiss } = {}){
  return customRender(
    <Alert dismissButtonText={dismissButtonText} onDismiss={onDismiss}>
      {content}
    </Alert>
  );
}

function buildContentMarkup(text){
  return <p>{text}</p>;
}

run(mount, { screen, buildContentMarkup });
