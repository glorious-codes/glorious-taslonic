import stripeService from './stripe';

describe('Stripe Service', () => {
  it('should append theme modifier css class according given theme', () => {
    const cssClasses = stripeService.buildCssClasses({ theme: 'warning' });
    expect(cssClasses).toEqual('t-stripe t-stripe-warning');
  });

  it('should not append theme modifier css class if no theme has been given', () => {
    const cssClasses = stripeService.buildCssClasses();
    expect(cssClasses).toEqual('t-stripe');
  });

  it('should not append theme modifier css class if theme is not valid', () => {
    const cssClasses = stripeService.buildCssClasses({ theme: 'colorful' });
    expect(cssClasses).toEqual('t-stripe');
  });
});
