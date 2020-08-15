import rowService from './row';

describe('Row Service', () => {
  it('should append align modifier css class according given alignment', () => {
    const cssClasses = rowService.buildCssClasses({ align: 'center' });
    expect(cssClasses).toEqual('t-row t-row-center');
  });

  it('should not append align modifier css class if no alignment has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append align modifier css class if alignment is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ align: 'invalid' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append vertical align modifier css class according given vertical alignment', () => {
    const cssClasses = rowService.buildCssClasses({ verticalAlign: 'middle' });
    expect(cssClasses).toEqual('t-row t-row-middle');
  });

  it('should not append vertical align modifier css class if no vertical alignment has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append vertical align modifier css class if vertical alignment is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ verticalAlign: 'invalid' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append offset modifier css class according given offset', () => {
    const cssClasses = rowService.buildCssClasses({ offset: '2' });
    expect(cssClasses).toEqual('t-row t-row-offset-2');
  });

  it('should not append offset modifier css class if no offset has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append offset modifier css class if offset is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ offset: '11' });
    expect(cssClasses).toEqual('t-row');
  });
});
