import React from 'react';
import testingService from '@base/services/testing/testing';
import dialogService from '@react/services/dialog/dialog';
import confirmService from './confirm';

describe('Confirm Service', () => {
  beforeEach(() => {
    jest.spyOn(dialogService, 'open');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  function getButton(type){
    const index = type == 'cancel' ? 0 : 1;
    return document.querySelectorAll('button')[index];
  }

  it('should render a custom content', () => {
    const content = <p>Hello!</p>;
    confirmService.open({ content });
    expect(document.querySelector('p').textContent).toEqual('Hello!');
  });

  it('should open a dialog with confirm name', () => {
    confirmService.open();
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'confirm' })
    );
  });

  it('should open a dialog without close button', () => {
    confirmService.open();
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ hideCloseButton: true })
    );
  });

  it('should open a dialog 400px wide by default', () => {
    confirmService.open();
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ width: '400px' })
    );
  });

  it('should optionally open a dialog with custom width', () => {
    const width = '300px';
    confirmService.open({ width });
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ width: '300px' })
    );
  });

  it('should optionally open a dialog with title', () => {
    const title = 'Custom Title';
    confirmService.open({ title });
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ title })
    );
  });

  it('should execute cancel callback on cancel button click', () => {
    const onCancel = jest.fn();
    confirmService.open({ onCancel });
    getButton('cancel').click();
    expect(onCancel).toHaveBeenCalled();
  });

  it('should close dialog on cancel button click', done => {
    const content = <p>Hello!</p>;
    confirmService.open({ content });
    getButton('cancel').click();
    setTimeout(() => {
      expect(document.querySelector('p')).toEqual(null);
      done();
    });
  });

  it('should optionally set custom cancel button text', () => {
    const cancelButtonText = 'Abort';
    confirmService.open({ cancelButtonText });
    expect(getButton('cancel').textContent.trim()).toEqual(cancelButtonText);
  });

  it('should execute confirm callback on confirm button click', () => {
    const onConfirm = jest.fn();
    confirmService.open({ onConfirm });
    getButton('confirm').click();
    expect(onConfirm).toHaveBeenCalled();
  });

  it('should not execute confirm callback on Enter keydown if cancel button is focused', done => {
    const enterKeyCode = 13;
    const onConfirm = jest.fn();
    confirmService.open({ onConfirm });
    setTimeout(() => {
      const cancelButtonEl = getButton('cancel');
      cancelButtonEl.focus();
      testingService.simulateKeydown(enterKeyCode);
      expect(onConfirm).not.toHaveBeenCalled();
      done();
    });
  });

  it('should optionally set custom confirm button text', () => {
    const confirmButtonText = 'Go!';
    confirmService.open({ confirmButtonText });
    expect(getButton('confirm').textContent.trim()).toEqual(confirmButtonText);
  });

  it('should close dialog on confirm button click', done => {
    const content = <p>Hello!</p>;
    confirmService.open({ content });
    getButton('confirm').click();
    setTimeout(() => {
      expect(document.querySelector('p')).toEqual(null);
      done();
    });
  });
});
