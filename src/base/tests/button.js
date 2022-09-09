export function run(mount, { screen }){
  describe('Button', () => {
    it('should have base css class', () => {
      mount();
      expect(screen.getByRole('button')).toHaveClass('t-button');
    });

    it('should optionally set a primary theme', () => {
      mount({ theme: 'primary' });
      expect(screen.getByRole('button')).toHaveClass('t-button-primary');
    });

    it('should optionally set a secondary theme', () => {
      mount({ theme: 'secondary' });
      expect(screen.getByRole('button')).toHaveClass('t-button-secondary');
    });

    it('should optionally set a lookless theme', () => {
      mount({ theme: 'lookless' });
      expect(screen.getByRole('button')).toHaveClass('t-button-lookless');
    });

    it('should optionally set as block', () => {
      mount({ block: true });
      expect(screen.getByRole('button')).toHaveClass('t-button-block');
    });

    it('should optionally render a button using a anchor tag name', () => {
      const text = 'click';
      mount({ content: text, tag: 'a', href: 'https://rafaelcamargo.com' });
      expect(screen.getByRole('link', { name: text })).toBeInTheDocument();
    });

    it('should render some custom prop', () => {
      const title = 'Title';
      mount({ title });
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });
}
