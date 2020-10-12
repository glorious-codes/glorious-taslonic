import toasterService from './toaster';

jest.useFakeTimers();

describe('Toaster Service', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function queryEl(selector){
    return document.querySelector(selector);
  }

  it('should pop a toast', () => {
    const message = 'Testing';
    toasterService.pop({ message });
    expect(queryEl('[data-toast-content]').innerHTML.trim()).toEqual(message);
  });

  it('should pop a toast with a title', () => {
    const title = 'Taslonic';
    toasterService.pop({ title });
    expect(queryEl('[data-toast-title]').innerHTML.trim()).toEqual(title);
  });

  it('should pop a toast with theme', () => {
    toasterService.pop({ theme: 'success' });
    expect(queryEl('[data-toast]').classList.contains('t-toast-success')).toEqual(true);
  });

  it('should toast be destroyed on close button click', () => {
    toasterService.pop({ message: 'Closing' });
    queryEl('[data-toast] [data-close-button]').click();
    expect(queryEl('[data-toaster]').innerHTML).toEqual('');
  });

  it('should toast last for five seconds on screen', () => {
    toasterService.pop({ message: 'Auto closing' });
    jest.advanceTimersByTime(4999);
    expect(queryEl('[data-toast]')).toBeDefined();
    jest.advanceTimersByTime(5000);
    expect(queryEl('[data-toast]')).toEqual(null);
  });
});
