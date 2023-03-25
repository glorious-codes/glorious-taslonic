import { expectFirstChild } from '@base/services/testing/testing';

export function run(mount, { screen }){
  describe('Tag', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-tag');
    });

    it('should optionally set a primary theme', () => {
      expectFirstChild(mount({ theme: 'primary' })).toHaveClass('t-tag-primary');
    });

    it('should optionally set a secondary theme', () => {
      expectFirstChild(mount({ theme: 'secondary' })).toHaveClass('t-tag-secondary');
    });

    it('should optionally set a warning theme', () => {
      expectFirstChild(mount({ theme: 'warning' })).toHaveClass('t-tag-warning');
    });

    it('should optionally set a danger theme', () => {
      expectFirstChild(mount({ theme: 'danger' })).toHaveClass('t-tag-danger');
    });

    it('should optionally set a success theme', () => {
      expectFirstChild(mount({ theme: 'success' })).toHaveClass('t-tag-success');
    });

    it('should optionally set a info theme', () => {
      expectFirstChild(mount({ theme: 'info' })).toHaveClass('t-tag-info');
    });

    it('should render some content', () => {
      const text = 'Hello';
      mount({ content: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render custom prop', () => {
      const title = 'tag';
      mount({ title });
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });
}
