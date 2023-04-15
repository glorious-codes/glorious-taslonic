import React, { useState } from 'react';
import { run } from '@base/tests/fetcher';
import { customRender, screen, waitFor, within } from '@react/services/testing/testing';
import { Fetcher } from '@react/';

function mount(initialProps){
  const Component = () => {
    const [props, setProps] = useState(initialProps);
    const buildErrorHandler = () => {
      if(!props.fetchErrorMessage) {
        return (err = {}) => {
          err.message && setProps(prevState => ({ ...prevState, fetchErrorMessage: err.message }));
        };
      }
    };
    return (
      <Fetcher {...props} onFetchError={props.onFetchError || buildErrorHandler()}>
        <p>Some content</p>
      </Fetcher>
    );
  };
  return customRender(<Component />);
}

run(mount, { screen, waitFor, within });
