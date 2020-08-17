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
    const cssClasses = colService.buildCssClasses({ offsetXs: '11' });
    expect(cssClasses).toEqual('t-col t-col-offset-xs-11');
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
    const cssClasses = colService.buildCssClasses({ offsetSm: '11' });
    expect(cssClasses).toEqual('t-col t-col-offset-sm-11');
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
    const cssClasses = colService.buildCssClasses({ offsetMd: '11' });
    expect(cssClasses).toEqual('t-col t-col-offset-md-11');
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
    const cssClasses = colService.buildCssClasses({ offsetLg: '11' });
    expect(cssClasses).toEqual('t-col t-col-offset-lg-11');
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
    const cssClasses = colService.buildCssClasses({ alignXs: 'center' });
    expect(cssClasses).toEqual('t-col t-col-align-xs-center');
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
    const cssClasses = colService.buildCssClasses({ alignSm: 'right' });
    expect(cssClasses).toEqual('t-col t-col-align-sm-right');
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
    const cssClasses = colService.buildCssClasses({ alignMd: 'center' });
    expect(cssClasses).toEqual('t-col t-col-align-md-center');
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
    const cssClasses = colService.buildCssClasses({ alignLg: 'center' });
    expect(cssClasses).toEqual('t-col t-col-align-lg-center');
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
