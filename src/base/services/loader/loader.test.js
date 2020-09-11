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

  it('should build animated elements', () => {
    const items = loaderService.buildAnimatedElements();
    expect(items.length).toEqual(3);
  });

  it('should items have appropriate css class', () => {
    const items = loaderService.buildAnimatedElements();
    items.forEach(item => expect(item.getAttribute('class')).toEqual('t-loader-item'));
  });
});
