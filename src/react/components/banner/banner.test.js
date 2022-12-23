import React from 'react';
import { run } from '@base/tests/banner';
import { customRender, screen } from '@react/services/testing/testing';
import { Banner } from '@react/';

function mount({ content, ...props } = {}){
  return customRender(
    <Banner
      theme={props.theme}
      triggerText={props.triggerText}
      onTriggerClick={props.onTriggerClick}
      onClose={props.onClose}
      {...props}
    >
      { content }
    </Banner>
  );
}

run(mount, { screen });
