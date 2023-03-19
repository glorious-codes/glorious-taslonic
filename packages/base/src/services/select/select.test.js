import selectService from './select';

describe('Select Service', () => {
  it('should wrapper not contain modifier css classes by default', () => {
    const cssClasses = selectService.buildWrapperCssClasses();
    expect(cssClasses).toEqual('t-select-wrapper');
  });

  it('should wrapper append disabled modifier css class if it has been given as true', () => {
    const cssClasses = selectService.buildWrapperCssClasses({ disabled: true });
    expect(cssClasses).toEqual('t-select-wrapper t-select-wrapper-disabled');
  });

  it('should wrapper append disabled modifier css class if it has been given as true', () => {
    const cssClasses = selectService.buildWrapperCssClasses({ multiple: true });
    expect(cssClasses).toEqual('t-select-wrapper t-select-wrapper-multiple');
  });
});
