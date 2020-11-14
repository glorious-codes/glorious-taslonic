import dialogService from './dialog';

jest.useFakeTimers();

describe('Dialog Service', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render a custom content', () => {
    const content = { template: '<p>Hello!</p>' };
    dialogService.open({ content });
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

  it('should execute close callback on close', () => {
    const onClose = jest.fn();
    dialogService.open({ onClose });
    document.querySelector('[aria-label="close"]').click();
    expect(onClose).toHaveBeenCalled();
  });

  it('should destroy dialog', () => {
    const dialog = dialogService.open();
    dialog.close();
    jest.runOnlyPendingTimers();
    expect(document.querySelector('[data-dialog-wrapper]')).toEqual(null);
  });
});
