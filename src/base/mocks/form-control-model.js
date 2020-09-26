export const formControlModelInstanceMock = {
  setElementValue: jest.fn(),
  onRequiredChange: jest.fn()
};

export const FormControlModelMock = jest.fn((el, options) => {
  formControlModelInstanceMock.element = el;
  formControlModelInstanceMock.options = options;
  return formControlModelInstanceMock;
});
