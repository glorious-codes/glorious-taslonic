import toasterService from './toaster';

describe('Toaster Service', () => {
  const CUSTOM_ATTR = 'data-toaster';

  function buildFakeToast(customAttrValue){
    const toast = document.createElement('div');
    toast.setAttribute('data-toast', customAttrValue);
    return toast;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should have a base css class', () => {
    toasterService.pop(buildFakeToast('one'));
    const toaster = document.querySelector(`[${CUSTOM_ATTR}]`);
    expect(toaster.getAttribute('class')).toEqual('t-toaster');
  });

  it('should build no more than one toaster', () => {
    const toast1 = buildFakeToast('one');
    const toast2 = buildFakeToast('two');
    toasterService.pop(toast1);
    toasterService.pop(toast2);
    expect(document.querySelectorAll(`[${CUSTOM_ATTR}]`).length).toEqual(1);
  });

  it('should last popped toast be o top of others', () => {
    const toast1 = buildFakeToast('one');
    const toast2 = buildFakeToast('two');
    toasterService.pop(toast1);
    toasterService.pop(toast2);
    const toasts = document.querySelectorAll(`[${CUSTOM_ATTR}] > div`);
    expect(toasts.length).toEqual(2);
    expect(toasts[0].getAttribute('data-toast')).toEqual('two');
    expect(toasts[1].getAttribute('data-toast')).toEqual('one');
  });
});
