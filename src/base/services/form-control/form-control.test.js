import formControlService from './form-control';

describe('Form Control Service', () => {
  it('should append invalid modifier css class if error message has been given', () => {
    const errorMessage = 'Required';
    const cssClasses = formControlService.buildCssClasses({ errorMessage });
    expect(cssClasses).toEqual('t-form-control t-form-control-invalid');
  });

  it('should not append invalid modifier css class if no error message has been given', () => {
    const cssClasses = formControlService.buildCssClasses();
    expect(cssClasses).toEqual('t-form-control');
  });

  it('should append blocked modifier css class if it has been given as true', () => {
    const cssClasses = formControlService.buildCssClasses({ blocked: true });
    expect(cssClasses).toEqual('t-form-control t-form-control-blocked');
  });
});
