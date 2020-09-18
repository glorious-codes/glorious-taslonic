import bannerService from './banner';

describe('Banner Service', () => {
  it('should append theme modifier css class according given theme', () => {
    const cssClasses = bannerService.buildCssClasses({ theme: 'warning' });
    expect(cssClasses).toEqual('t-banner t-banner-warning');
  });

  it('should not append theme modifier css class if no theme has been given', () => {
    const cssClasses = bannerService.buildCssClasses();
    expect(cssClasses).toEqual('t-banner');
  });

  it('should not append theme modifier css class if theme is not valid', () => {
    const cssClasses = bannerService.buildCssClasses({ theme: 'colorful' });
    expect(cssClasses).toEqual('t-banner');
  });
});
