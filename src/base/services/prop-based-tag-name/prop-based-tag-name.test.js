import propBaseTagNameService from './prop-based-tag-name';

describe('Prop Based Tag Name Service', () => {
  it('should return prop value if given prop is valid', () => {
    const defaultTagName = 'button';
    const isValidTagName = prop => ['a', 'button'].includes(prop);
    const tagName = propBaseTagNameService.buildTagName('a', isValidTagName, { defaultTagName });
    expect(tagName).toEqual('a');
  });

  it('should return default tag name if given prop is not valid', () => {
    const defaultTagName = 'button';
    const isValidTagName = prop => ['a', 'button'].includes(prop);
    const tagName = propBaseTagNameService.buildTagName('ul', isValidTagName, { defaultTagName });
    expect(tagName).toEqual('button');
  });

  it('should return default tag name if prop has not been given', () => {
    const defaultTagName = 'button';
    const isValidTagName = prop => ['a', 'button'].includes(prop);
    const tagName = propBaseTagNameService.buildTagName(undefined, isValidTagName, { defaultTagName });
    expect(tagName).toEqual('button');
  });
});
