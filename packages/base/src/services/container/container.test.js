import containerService from './container';

describe('Container Service', () => {
  it('should append size modifier css class according given size', () => {
    const cssClasses = containerService.buildCssClasses({ size: 'sm' });
    expect(cssClasses).toEqual('t-container t-container-sm');
  });

  it('should not append size modifier css class if no size has been given', () => {
    const cssClasses = containerService.buildCssClasses();
    expect(cssClasses).toEqual('t-container');
  });

  it('should not append size modifier css class if size is not valid', () => {
    const cssClasses = containerService.buildCssClasses({ size: 'x-large' });
    expect(cssClasses).toEqual('t-container');
  });
});
