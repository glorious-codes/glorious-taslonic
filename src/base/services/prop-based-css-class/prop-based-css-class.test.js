import propBaseCssClassService from './prop-based-css-class';

describe('Prop Based Css Class Service', () => {
  it('should append css class if given prop is valid', () => {
    const baseCssClass = 't-base';
    const currentCssClasses = [baseCssClass];
    const isValidProp = prop => ['small', 'large'].includes(prop);
    propBaseCssClassService.handleProp(
      'small',
      isValidProp,
      currentCssClasses,
      baseCssClass
    );
    expect(currentCssClasses).toEqual([baseCssClass, `${baseCssClass}-small`]);
  });

  it('should not append css class if given prop is not valid', () => {
    const baseCssClass = 't-base';
    const currentCssClasses = [baseCssClass];
    const isValidProp = prop => ['small', 'large'].includes(prop);
    propBaseCssClassService.handleProp(
      'giant',
      isValidProp,
      currentCssClasses,
      baseCssClass
    );
    expect(currentCssClasses).toEqual([baseCssClass]);
  });

  it('should not append css class if no prop has been given', () => {
    const baseCssClass = 't-base';
    const currentCssClasses = [baseCssClass];
    const isValidProp = prop => ['small', 'large'].includes(prop);
    propBaseCssClassService.handleProp(
      null,
      isValidProp,
      currentCssClasses,
      baseCssClass
    );
    expect(currentCssClasses).toEqual([baseCssClass]);
  });
});
