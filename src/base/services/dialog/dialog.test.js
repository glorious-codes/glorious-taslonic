import dialogService from './dialog';

jest.useFakeTimers();

describe('Dialog Service', () => {
  afterEach(() => {
    document.body.classList.remove(getOpenDialogCssClass());
    document.body.innerHTML = '';
  });

  function getOpenDialogCssClass(){
    return 't-dialog-open';
  }

  it('should build a dialog wrapper contained in a floating container', () => {
    const wrapper = dialogService.buildWrapper();
    const floatingContainerEl = wrapper.parentElement;
    expect(wrapper.getAttribute('class')).toEqual('t-dialog-wrapper');
    expect(floatingContainerEl.getAttribute('class')).toEqual('t-floating-container');
    expect(floatingContainerEl.getAttribute('data-floating-container')).toBeDefined();
  });

  it('should optionally name wrapper contained in a floating container', () => {
    const wrapper = dialogService.buildWrapper('confirm');
    expect(wrapper.getAttribute('class')).toEqual('t-confirm-wrapper');
  });

  it('should be able to prevent body scroll', () => {
    dialogService.buildWrapper();
    expect(document.body.classList.contains(getOpenDialogCssClass())).toEqual(true);
  });

  it('should not prevent body scroll more than once', () => {
    dialogService.buildWrapper();
    dialogService.buildWrapper();
    expect(document.body.getAttribute('class')).toEqual(getOpenDialogCssClass());
  });

  it('should release body scroll when no more dialog wrapper is inside dialog container', () => {
    const wrapper1 = dialogService.buildWrapper();
    const wrapper2 = dialogService.buildWrapper();
    dialogService.destroy(wrapper2);
    jest.runOnlyPendingTimers();
    expect(document.body.classList.contains(getOpenDialogCssClass())).toEqual(true);
    dialogService.destroy(wrapper1);
    jest.runOnlyPendingTimers();
    expect(document.body.classList.contains(getOpenDialogCssClass())).toEqual(false);
  });
});
