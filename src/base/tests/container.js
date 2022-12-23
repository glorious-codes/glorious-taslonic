import { expectFirstChild } from '@base/services/testing/testing';

export function run(mount, { screen }){
  describe('Container', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-container');
    });

    it('should optionally set a small size', () => {
      expectFirstChild(mount({ size: 'sm' })).toHaveClass('t-container-sm');
    });

    it('should optionally set a large size', () => {
      expectFirstChild(mount({ size: 'lg' })).toHaveClass('t-container-lg');
    });

    it('should render some content', () => {
      const text = 'Hello!';
      mount({ content: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render some custom prop', () => {
      const title = 'Title';
      mount({ title });
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });
}
