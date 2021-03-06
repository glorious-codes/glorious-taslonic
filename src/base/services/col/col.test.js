import colService from './col';

describe('Col Service', () => {
  it('should append xs size modifier css class according given xs size', () => {
    const cssClasses = colService.buildCssClasses({ xs: '2' });
    expect(cssClasses).toEqual('t-col t-col-xs-2');
  });

  it('should not append xs size modifier css class if no xs size has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append xs size modifier css class if xs size is not valid', () => {
    const cssClasses = colService.buildCssClasses({ xs: '14' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append sm size modifier css class according given sm size', () => {
    const cssClasses = colService.buildCssClasses({ sm: '2' });
    expect(cssClasses).toEqual('t-col t-col-sm-2');
  });

  it('should not append sm size modifier css class if no sm size has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append sm size modifier css class if sm size is not valid', () => {
    const cssClasses = colService.buildCssClasses({ sm: '14' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append md size modifier css class according given md size', () => {
    const cssClasses = colService.buildCssClasses({ md: '2' });
    expect(cssClasses).toEqual('t-col t-col-md-2');
  });

  it('should not append md size modifier css class if no md size has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append md size modifier css class if md size is not valid', () => {
    const cssClasses = colService.buildCssClasses({ md: '14' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append lg size modifier css class according given lg size', () => {
    const cssClasses = colService.buildCssClasses({ lg: '2' });
    expect(cssClasses).toEqual('t-col t-col-lg-2');
  });

  it('should not append lg size modifier css class if no lg size has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append lg size modifier css class if lg size is not valid', () => {
    const cssClasses = colService.buildCssClasses({ lg: '14' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append xs offset modifier css class according given xs offset', () => {
    expect(colService.buildCssClasses({ offsetXs: '11' })).toEqual('t-col t-col-offset-xs-11');
    expect(colService.buildCssClasses({ offsetXs: '0' })).toEqual('t-col t-col-offset-xs-0');
  });

  it('should not append xs offset modifier css class if no xs offset has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append xs offset modifier css class if xs offset is not valid', () => {
    const cssClasses = colService.buildCssClasses({ offsetXs: '12' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append sm offset modifier css class according given sm offset', () => {
    expect(colService.buildCssClasses({ offsetSm: '11' })).toEqual('t-col t-col-offset-sm-11');
    expect(colService.buildCssClasses({ offsetSm: '0' })).toEqual('t-col t-col-offset-sm-0');
  });

  it('should not append sm offset modifier css class if no sm offset has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append sm offset modifier css class if sm offset is not valid', () => {
    const cssClasses = colService.buildCssClasses({ offsetSm: '12' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append md offset modifier css class according given md offset', () => {
    expect(colService.buildCssClasses({ offsetMd: '11' })).toEqual('t-col t-col-offset-md-11');
    expect(colService.buildCssClasses({ offsetMd: '0' })).toEqual('t-col t-col-offset-md-0');
  });

  it('should not append md offset modifier css class if no md offset has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append md offset modifier css class if md offset is not valid', () => {
    const cssClasses = colService.buildCssClasses({ offsetMd: '12' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append lg offset modifier css class according given lg offset', () => {
    expect(colService.buildCssClasses({ offsetLg: '11' })).toEqual('t-col t-col-offset-lg-11');
    expect(colService.buildCssClasses({ offsetLg: '0' })).toEqual('t-col t-col-offset-lg-0');
  });

  it('should not append lg offset modifier css class if no lg offset has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append lg offset modifier css class if lg offset is not valid', () => {
    const cssClasses = colService.buildCssClasses({ offsetLg: '12' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append xs align modifier css class according given xs align', () => {
    expect(colService.buildCssClasses({ alignXs: 'left' })).toEqual('t-col t-col-align-xs-left');
    expect(colService.buildCssClasses({ alignXs: 'center' })).toEqual('t-col t-col-align-xs-center');
    expect(colService.buildCssClasses({ alignXs: 'right' })).toEqual('t-col t-col-align-xs-right');
  });

  it('should not append xs align modifier css class if no xs align has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append xs align modifier css class if xs align is not valid', () => {
    const cssClasses = colService.buildCssClasses({ alignXs: 'up' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append sm align modifier css class according given sm align', () => {
    expect(colService.buildCssClasses({ alignSm: 'left' })).toEqual('t-col t-col-align-sm-left');
    expect(colService.buildCssClasses({ alignSm: 'center' })).toEqual('t-col t-col-align-sm-center');
    expect(colService.buildCssClasses({ alignSm: 'right' })).toEqual('t-col t-col-align-sm-right');
  });

  it('should not append sm align modifier css class if no sm align has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append sm align modifier css class if sm align is not valid', () => {
    const cssClasses = colService.buildCssClasses({ alignSm: 'up' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append md align modifier css class according given md align', () => {
    expect(colService.buildCssClasses({ alignMd: 'left' })).toEqual('t-col t-col-align-md-left');
    expect(colService.buildCssClasses({ alignMd: 'center' })).toEqual('t-col t-col-align-md-center');
    expect(colService.buildCssClasses({ alignMd: 'right' })).toEqual('t-col t-col-align-md-right');
  });

  it('should not append md align modifier css class if no md align has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append md align modifier css class if md align is not valid', () => {
    const cssClasses = colService.buildCssClasses({ alignMd: 'up' });
    expect(cssClasses).toEqual('t-col');
  });

  it('should append lg align modifier css class according given lg align', () => {
    expect(colService.buildCssClasses({ alignLg: 'left' })).toEqual('t-col t-col-align-lg-left');
    expect(colService.buildCssClasses({ alignLg: 'center' })).toEqual('t-col t-col-align-lg-center');
    expect(colService.buildCssClasses({ alignLg: 'right' })).toEqual('t-col t-col-align-lg-right');
  });

  it('should not append lg align modifier css class if no lg align has been given', () => {
    const cssClasses = colService.buildCssClasses();
    expect(cssClasses).toEqual('t-col');
  });

  it('should not append lg align modifier css class if lg align is not valid', () => {
    const cssClasses = colService.buildCssClasses({ alignLg: 'up' });
    expect(cssClasses).toEqual('t-col');
  });
});
