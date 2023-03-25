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

  it('should append xs align modifier css class according given xs alignment', () => {
    expect(rowService.buildCssClasses({ alignXs: 'left' })).toEqual('t-row t-row-xs-left');
    expect(rowService.buildCssClasses({ alignXs: 'center' })).toEqual('t-row t-row-xs-center');
    expect(rowService.buildCssClasses({ alignXs: 'right' })).toEqual('t-row t-row-xs-right');
  });

  it('should not append xs align modifier css class if no xs align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append xs align modifier css class if xs align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ alignXs: 'middle' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append sm align modifier css class according given sm alignment', () => {
    expect(rowService.buildCssClasses({ alignSm: 'left' })).toEqual('t-row t-row-sm-left');
    expect(rowService.buildCssClasses({ alignSm: 'center' })).toEqual('t-row t-row-sm-center');
    expect(rowService.buildCssClasses({ alignSm: 'right' })).toEqual('t-row t-row-sm-right');
  });

  it('should not append sm align modifier css class if no sm align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append sm align modifier css class if sm align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ alignSm: 'middle' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append md align modifier css class according given md alignment', () => {
    expect(rowService.buildCssClasses({ alignMd: 'left' })).toEqual('t-row t-row-md-left');
    expect(rowService.buildCssClasses({ alignMd: 'center' })).toEqual('t-row t-row-md-center');
    expect(rowService.buildCssClasses({ alignMd: 'right' })).toEqual('t-row t-row-md-right');
  });

  it('should not append md align modifier css class if no md align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append md align modifier css class if md align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ alignMd: 'middle' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append lg align modifier css class according given lg alignment', () => {
    expect(rowService.buildCssClasses({ alignLg: 'left' })).toEqual('t-row t-row-lg-left');
    expect(rowService.buildCssClasses({ alignLg: 'center' })).toEqual('t-row t-row-lg-center');
    expect(rowService.buildCssClasses({ alignLg: 'right' })).toEqual('t-row t-row-lg-right');
  });

  it('should not append lg align modifier css class if no lg align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append lg align modifier css class if lg align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ alignLg: 'middle' });
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

  it('should append xs vertical align modifier css class according given xs vertical alignment', () => {
    expect(rowService.buildCssClasses({ verticalAlignXs: 'top' })).toEqual('t-row t-row-xs-top');
    expect(rowService.buildCssClasses({ verticalAlignXs: 'middle' })).toEqual('t-row t-row-xs-middle');
    expect(rowService.buildCssClasses({ verticalAlignXs: 'bottom' })).toEqual('t-row t-row-xs-bottom');
  });

  it('should not append xs vertical align modifier css class if no xs vertical align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append xs vertical align modifier css class if xs vertical align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ verticalAlignXs: 'above' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append sm vertical align modifier css class according given sm vertical alignment', () => {
    expect(rowService.buildCssClasses({ verticalAlignSm: 'top' })).toEqual('t-row t-row-sm-top');
    expect(rowService.buildCssClasses({ verticalAlignSm: 'middle' })).toEqual('t-row t-row-sm-middle');
    expect(rowService.buildCssClasses({ verticalAlignSm: 'bottom' })).toEqual('t-row t-row-sm-bottom');
  });

  it('should not append sm vertical align modifier css class if no sm vertical align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append sm vertical align modifier css class if sm vertical align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ verticalAlignSm: 'above' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append md vertical align modifier css class according given md vertical alignment', () => {
    expect(rowService.buildCssClasses({ verticalAlignMd: 'top' })).toEqual('t-row t-row-md-top');
    expect(rowService.buildCssClasses({ verticalAlignMd: 'middle' })).toEqual('t-row t-row-md-middle');
    expect(rowService.buildCssClasses({ verticalAlignMd: 'bottom' })).toEqual('t-row t-row-md-bottom');
  });

  it('should not append md vertical align modifier css class if no md vertical align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append md vertical align modifier css class if md vertical align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ verticalAlignMd: 'above' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append lg vertical align modifier css class according given lg vertical alignment', () => {
    expect(rowService.buildCssClasses({ verticalAlignLg: 'top' })).toEqual('t-row t-row-lg-top');
    expect(rowService.buildCssClasses({ verticalAlignLg: 'middle' })).toEqual('t-row t-row-lg-middle');
    expect(rowService.buildCssClasses({ verticalAlignLg: 'bottom' })).toEqual('t-row t-row-lg-bottom');
  });

  it('should not append lg vertical align modifier css class if no lg vertical align has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append lg vertical align modifier css class if lg vertical align is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ verticalAlignLg: 'above' });
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

  it('should append xs offset modifier css class according given xs offset', () => {
    expect(rowService.buildCssClasses({ offsetXs: '2' })).toEqual('t-row t-row-offset-xs-2');
    expect(rowService.buildCssClasses({ offsetXs: '0' })).toEqual('t-row t-row-offset-xs-0');
    expect(rowService.buildCssClasses({ offsetXs: '10' })).toEqual('t-row t-row-offset-xs-10');
  });

  it('should not append xs offset modifier css class if no xs offset has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append xs offset modifier css class if xs offset is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ offsetXs: '-1' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append sm offset modifier css class according given sm offset', () => {
    expect(rowService.buildCssClasses({ offsetSm: '2' })).toEqual('t-row t-row-offset-sm-2');
    expect(rowService.buildCssClasses({ offsetSm: '0' })).toEqual('t-row t-row-offset-sm-0');
    expect(rowService.buildCssClasses({ offsetSm: '10' })).toEqual('t-row t-row-offset-sm-10');
  });

  it('should not append sm offset modifier css class if no sm offset has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append sm offset modifier css class if sm offset is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ offsetSm: '-1' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append md offset modifier css class according given md offset', () => {
    expect(rowService.buildCssClasses({ offsetMd: '2' })).toEqual('t-row t-row-offset-md-2');
    expect(rowService.buildCssClasses({ offsetMd: '0' })).toEqual('t-row t-row-offset-md-0');
    expect(rowService.buildCssClasses({ offsetMd: '10' })).toEqual('t-row t-row-offset-md-10');
  });

  it('should not append md offset modifier css class if no md offset has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append md offset modifier css class if md offset is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ offsetMd: '-1' });
    expect(cssClasses).toEqual('t-row');
  });

  it('should append lg offset modifier css class according given lg offset', () => {
    expect(rowService.buildCssClasses({ offsetLg: '2' })).toEqual('t-row t-row-offset-lg-2');
    expect(rowService.buildCssClasses({ offsetLg: '0' })).toEqual('t-row t-row-offset-lg-0');
    expect(rowService.buildCssClasses({ offsetLg: '10' })).toEqual('t-row t-row-offset-lg-10');
  });

  it('should not append lg offset modifier css class if no lg offset has been given', () => {
    const cssClasses = rowService.buildCssClasses();
    expect(cssClasses).toEqual('t-row');
  });

  it('should not append lg offset modifier css class if lg offset is not valid', () => {
    const cssClasses = rowService.buildCssClasses({ offsetLg: '-1' });
    expect(cssClasses).toEqual('t-row');
  });
});
