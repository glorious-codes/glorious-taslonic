import loaderService from './loader';

describe('Loader Service', () => {
  it('should append theme modifier css class according given theme', () => {
    const cssClasses = loaderService.buildCssClasses({ theme: 'light' });
    expect(cssClasses).toEqual('t-loader t-loader-light');
  });

  it('should not append theme modifier css class if no theme has been given', () => {
    const cssClasses = loaderService.buildCssClasses();
    expect(cssClasses).toEqual('t-loader');
  });

  it('should not append theme modifier css class if theme is not valid', () => {
    const cssClasses = loaderService.buildCssClasses({ theme: 'colorful' });
    expect(cssClasses).toEqual('t-loader');
  });

  it('should append animated elements in a container', () => {
    const container = document.createElement('div');
    loaderService.appendAnimatedElements(container);
    const items = Array.from(container.querySelectorAll('span'));
    items.forEach(item => expect(item).toHaveClass('t-loader-item'));
    expect(items.length).toEqual(3);
  });
});
