export function run(mount, { screen }){
  describe('Card', () => {
    it('should have base css class', () => {
      const { container } = mount();
      expect(container.firstChild).toHaveClass('t-card');
    });

    it('should not contain a title by default', () => {
      mount();
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should optionally render a title', () => {
      const title = 'Users';
      mount({ title });
      expect(screen.getByRole('heading', { name: title, level: 3 })).toBeInTheDocument();
    });

    it('should optionally render a title with custom tag name', () => {
      const title = 'Users';
      const titleTagName = 'h1';
      mount({ title, titleTagName });
      expect(screen.getByRole('heading', { name: title, level: 1 })).toBeInTheDocument();
    });

    it('should render some content', () => {
      const text = 'Hello!';
      mount({ content: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render some custom prop', () => {
      const lang = 'pt-BR';
      const { container } = mount({ lang });
      expect(container.querySelector(`[lang='${lang}']`)).toBeInTheDocument();
    });
  });
}
