import { expectFirstChild, pause } from '@base/services/testing/testing';

export function run(mount, { screen }){
  describe('Loader', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-loader');
    });

    it('should optionally set a light theme', () => {
      expectFirstChild(mount({ theme: 'light' })).toHaveClass('t-loader-light');
    });

    it('should contain animated elements', async () => {
      const { container } = mount();
      await pause();
      expect(container.querySelectorAll('.t-loader-item')).toHaveLength(3);
    });

    it('should contain a title', () => {
      mount();
      expect(screen.getByTitle('loading')).toBeInTheDocument();
    });

    it('should render a custom prop', () => {
      const lang = 'pt-BR';
      const { container } = mount({ lang });
      expect(container.querySelector(`[lang='${lang}']`)).toBeInTheDocument();
    });
  });
}
