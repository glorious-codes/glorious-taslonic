import React from 'react';
import { run } from '@base/tests/fetcher';
import { customRender, screen, waitFor } from '@react/services/testing/testing';
import { Fetcher } from '@react/';

function mount(props){
  return customRender(
    <Fetcher
      onFetch={props.onFetch}
      onFetchSuccess={props.onFetchSuccess}
      onFetchError={props.onFetchError}
      onMount={props.onMount}
      fetchErrorMessage={props.fetchErrorMessage}
    >
      <p>Content Mock</p>
    </Fetcher>
  );
}

run(mount, { screen, waitFor });
