import formService from '@base/services/form/form';
import buttonService from './button';

jest.useFakeTimers();

describe('Button Service', () => {
  it('should append theme modifier css class according given theme', () => {
    const cssClasses = buttonService.buildCssClasses({ theme: 'primary' });
    expect(cssClasses).toEqual('t-button t-button-primary');
  });

  it('should not append theme modifier css class if no theme has been given', () => {
    const cssClasses = buttonService.buildCssClasses();
    expect(cssClasses).toEqual('t-button');
  });

  it('should not append theme modifier css class if theme is not valid', () => {
    const cssClasses = buttonService.buildCssClasses({ theme: 'tertiary' });
    expect(cssClasses).toEqual('t-button');
  });

  it('should append blocked modifier css class if it has been given as true', () => {
    const cssClasses = buttonService.buildCssClasses({ blocked: true });
    expect(cssClasses).toEqual('t-button t-button-blocked');
  });

  it('should not append blocked modifier css class if it has not been given', () => {
    const cssClasses = buttonService.buildCssClasses();
    expect(cssClasses).toEqual('t-button');
  });

  it('should build tag name with prop value if tag prop value is valid', () => {
    const tagName = buttonService.buildTagName('a');
    expect(tagName).toEqual('a');
  });

  it('should build a button tag name if tag prop value has not been given', () => {
    const tagName = buttonService.buildTagName();
    expect(tagName).toEqual('button');
  });

  it('should build a button tag name if tag prop value is not valid', () => {
    const tagName = buttonService.buildTagName('ul');
    expect(tagName).toEqual('button');
  });

  it('should find parent form model', () => {
    const buttonEl = document.createElement('button');
    const fakeModel = {some: 'model'};
    const onFind = jest.fn();
    formService.findParentFormModel = jest.fn(() => fakeModel);
    buttonService.findParentFormModel(buttonEl, onFind);
    jest.runOnlyPendingTimers();
    expect(formService.findParentFormModel).toHaveBeenCalledWith(buttonEl);
    expect(onFind).toHaveBeenCalledWith(fakeModel);
  });

  it('should parse button type as button if no type has been given', () => {
    expect(buttonService.parseType()).toEqual('button');
  });

  it('should parse button type as button if type given is invalid', () => {
    expect(buttonService.parseType('unknown')).toEqual('button');
  });

  it('should parse button type as given type if given type is valid', () => {
    expect(buttonService.parseType('submit')).toEqual('submit');
  });
});
