import toastService from './toast';

describe('Toast Service', () => {
  it('should append theme modifier css class according given theme', () => {
    const cssClasses = toastService.buildCssClasses({ theme: 'warning' });
    expect(cssClasses).toEqual('t-toast t-toast-warning');
  });

  it('should not append theme modifier css class if no theme has been given', () => {
    const cssClasses = toastService.buildCssClasses();
    expect(cssClasses).toEqual('t-toast');
  });

  it('should not append theme modifier css class if theme is not valid', () => {
    const cssClasses = toastService.buildCssClasses({ theme: 'colorful' });
    expect(cssClasses).toEqual('t-toast');
  });
});
