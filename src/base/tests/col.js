export function run(mount, { screen }){
  describe('Column', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-col');
    });

    it('should optionally set size column for extra-small screens', () => {
      expectFirstChild(mount({ xs: '6' })).toHaveClass('t-col-xs-6');
    });

    it('should optionally set size column for small screens', () => {
      expectFirstChild(mount({ sm: '6' })).toHaveClass('t-col-sm-6');
    });

    it('should optionally set size column for medium screens', () => {
      expectFirstChild(mount({ md: '6' })).toHaveClass('t-col-md-6');
    });

    it('should optionally set size column for large screens', () => {
      expectFirstChild(mount({ lg: '6' })).toHaveClass('t-col-lg-6');
    });

    it('should optionally set offset column for extra-small screens', () => {
      expectFirstChild(mount({ offsetXs: '2' })).toHaveClass('t-col-offset-xs-2');
    });

    it('should optionally set offset column for small screens', () => {
      expectFirstChild(mount({ offsetSm: '2' })).toHaveClass('t-col-offset-sm-2');
    });

    it('should optionally set offset column for medium screens', () => {
      expectFirstChild(mount({ offsetMd: '2' })).toHaveClass('t-col-offset-md-2');
    });

    it('should optionally set offset column for large screens', () => {
      expectFirstChild(mount({ offsetLg: '2' })).toHaveClass('t-col-offset-lg-2');
    });

    it('should optionally align column text for extra-small screens', () => {
      expectFirstChild(mount({ alignXs: 'center' })).toHaveClass('t-col-align-xs-center');
    });

    it('should optionally align column text for small screens', () => {
      expectFirstChild(mount({ alignSm: 'center' })).toHaveClass('t-col-align-sm-center');
    });

    it('should optionally align column text for medium screens', () => {
      expectFirstChild(mount({ alignMd: 'center' })).toHaveClass('t-col-align-md-center');
    });

    it('should optionally align column text for large screens', () => {
      expectFirstChild(mount({ alignLg: 'center' })).toHaveClass('t-col-align-lg-center');
    });

    it('should render custom content', () => {
      const text = 'Hello!';
      mount({ content: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    function expectFirstChild({ container }){
      return expect(container.firstChild);
    }
  });
}
