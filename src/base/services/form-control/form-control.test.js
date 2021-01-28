import { REQUIRED_ERROR_MESSAGE }  from '@base/constants/messages';
import formService from '@base/services/form/form';
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

  it('should append block modifier css class if it has been given as true', () => {
    const cssClasses = formControlService.buildCssClasses({ block: true });
    expect(cssClasses).toEqual('t-form-control t-form-control-block');
  });

  it('should build required validation model', () => {
    const validationModel = formControlService.buildRequiredValidation();
    expect(validationModel.isValid('')).toEqual(false);
    expect(validationModel.isValid('  ')).toEqual(false);
    expect(validationModel.isValid('Rafael')).toEqual(true);
    expect(validationModel.isValid(12)).toEqual(true);
    expect(validationModel.errorMessage).toEqual(REQUIRED_ERROR_MESSAGE);
  });

  it('should find parent form model', () => {
    const formControlElMock = document.createElement('input');
    formService.findParentFormModel = jest.fn();
    formControlService.findParentFormModel(formControlElMock);
    expect(formService.findParentFormModel).toHaveBeenCalledWith(formControlElMock);
  });
});
