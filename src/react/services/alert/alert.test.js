import React from 'react';
import testingService from '@base/services/testing/testing';
import dialogService from '@react/services/dialog/dialog';
import alertService from './alert';

describe('Alert Service', () => {
  beforeEach(() => {
    jest.spyOn(dialogService, 'open');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render a custom content', () => {
    const content = <p>Hello!</p>;
    alertService.open({ content });
    expect(document.querySelector('p').textContent).toEqual('Hello!');
  });

  it('should open a dialog with alert name', () => {
    alertService.open();
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'alert' })
    );
  });

  it('should open a dialog without close button', () => {
    alertService.open();
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ hideCloseButton: true })
    );
  });

  it('should open a dialog 400px wide by default', () => {
    alertService.open();
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ width: '400px' })
    );
  });

  it('should optionally open a dialog with custom width', () => {
    const width = '300px';
    alertService.open({ width });
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ width: '300px' })
    );
  });

  it('should optionally open a dialog with title', () => {
    const title = 'Custom Title';
    alertService.open({ title });
    expect(dialogService.open).toHaveBeenCalledWith(
      expect.objectContaining({ title })
    );
  });

  it('should execute dismiss callback on dismiss button click', () => {
    const onDismiss = jest.fn();
    alertService.open({ onDismiss });
    document.querySelector('button').click();
    expect(onDismiss).toHaveBeenCalled();
  });

  it('should close dialog on dimiss button click', done => {
    const content = <p>Hello!</p>;
    alertService.open({ content });
    document.querySelector('button').click();
    setTimeout(() => {
      expect(document.querySelector('p')).toEqual(null);
      done();
    });
  });

  it('should optionally set custom dismiss button text', () => {
    const dismissButtonText = 'Dismiss';
    alertService.open({ dismissButtonText });
    expect(document.querySelector('button').textContent.trim()).toEqual(dismissButtonText);
  });

  it('should execute dismiss callback on Enter keydown', done => {
    const enterKeyCode = 13;
    const onDismiss = jest.fn();
    alertService.open({ content: 'Hello!', onDismiss });
    setTimeout(() => {
      testingService.simulateKeydown(enterKeyCode);
      expect(onDismiss).toHaveBeenCalled();
      done();
    });
  });
});
