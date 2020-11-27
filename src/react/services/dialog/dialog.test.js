import React from 'react';
import dialogService from './dialog';

jest.useFakeTimers();

describe('Dialog Service', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render a custom content', () => {
    dialogService.open({ content: <p>Hello!</p> });
    expect(document.querySelector('p').textContent).toEqual('Hello!');
  });

  it('should optionally set a title', () => {
    const title = 'Custom Title';
    dialogService.open({ title });
    expect(document.querySelector('[data-dialog-title]').textContent).toEqual(title);
  });

  it('should optionally set a width', () => {
    const width = '300px';
    dialogService.open({ width });
    expect(document.querySelector('[data-dialog]').style.maxWidth).toEqual(width);
  });

  it('should optionally set a custom dialog wrapper name', () => {
    dialogService.open({ name: 'confirm' });
    expect(document.querySelector('[data-confirm-wrapper]')).toBeDefined();
  });

  it('should execute close callback on close', () => {
    const onClose = jest.fn();
    dialogService.open({ onClose });
    document.querySelector('[aria-label="close"]').click();
    expect(onClose).toHaveBeenCalled();
  });

  it('should optionally not render close button', () => {
    dialogService.open({ hideCloseButton: true });
    expect(document.querySelector('[aria-label="close"]')).toEqual(null);
  });

  it('should destroy dialog', () => {
    const dialog = dialogService.open();
    dialog.close();
    jest.runOnlyPendingTimers();
    expect(document.querySelector('[data-dialog-wrapper]')).toEqual(null);
  });
});
