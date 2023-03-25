import { expectFirstChild } from '@base/services/testing/testing';

export function run(mount, { screen }){
  describe('Row', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-row');
    });

    it('should optionally align content at left', () => {
      expectFirstChild(mount({ align: 'left' })).toHaveClass('t-row-left');
    });

    it('should optionally align content at center on extra small screens', () => {
      expectFirstChild(mount({ alignXs: 'center' })).toHaveClass('t-row-xs-center');
    });

    it('should optionally align content at right on large screens', () => {
      expectFirstChild(mount({ alignLg: 'right' })).toHaveClass('t-row-lg-right');
    });

    it('should optionally align content vertically at top', () => {
      expectFirstChild(mount({ verticalAlign: 'top' })).toHaveClass('t-row-top');
    });

    it('should optionally align content vertically at bottom on medium screens', () => {
      expectFirstChild(mount({ verticalAlignMd: 'bottom' })).toHaveClass('t-row-md-bottom');
    });

    it('should optionally align content vertically at middle on small screens', () => {
      expectFirstChild(mount({ verticalAlignSm: 'middle' })).toHaveClass('t-row-sm-middle');
    });

    it('should optionally offset row', () => {
      expectFirstChild(mount({ offset: '2' })).toHaveClass('t-row-offset-2');
    });

    it('should optionally offset row on extra small screens', () => {
      expectFirstChild(mount({ offsetXs: '2' })).toHaveClass('t-row-offset-xs-2');
    });

    it('should optionally offset row on large screens', () => {
      expectFirstChild(mount({ offsetLg: '0' })).toHaveClass('t-row-offset-lg-0');
    });

    it('should render some content', () => {
      const text = 'Hello';
      mount({ content: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render custom prop', () => {
      const title = 'row';
      mount({ title });
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });
}
