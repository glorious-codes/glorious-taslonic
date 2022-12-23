import React, { useState } from 'react';
import { run } from '@base/tests/dialog';
import { customRender, screen } from '@react/services/testing/testing';
import { dialog } from '@react/';

function mount(dialogOptions){
  const Component = () => {
    const [openDialog, setOpenDialog] = useState();
    return (
      <>
        <button onClick={() => setOpenDialog(dialog.open(dialogOptions))}>
          Open dialog
        </button>
        <button onClick={() => openDialog.close()}>Close dialog</button>
      </>
    );
  };
  return customRender(<Component />);
}

function buildContentMarkup({ title, paragraph }){
  return (
    <p title={title}>
      {paragraph}
    </p>
  );
}

run(mount, { screen, buildContentMarkup });
