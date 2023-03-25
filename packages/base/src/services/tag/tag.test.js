import tagService from './tag';

describe('Tag Service', () => {
  it('should return just base css class if no theme has been given', () => {
    const cssClasses = tagService.buildCssClasses();
    expect(cssClasses).toEqual('t-tag');
  });

  it('should not append theme modifier css class if no theme has been given', () => {
    const cssClasses = tagService.buildCssClasses();
    expect(cssClasses).toEqual('t-tag');
  });

  it('should append theme modifier css class if theme is valid', () => {
    const cssClasses = tagService.buildCssClasses({ theme: 'primary' });
    expect(cssClasses).toEqual('t-tag t-tag-primary');
  });

  it('should not append theme modifier css class if theme is not valid', () => {
    const cssClasses = tagService.buildCssClasses({ theme: 'summer' });
    expect(cssClasses).toEqual('t-tag');
  });
});
