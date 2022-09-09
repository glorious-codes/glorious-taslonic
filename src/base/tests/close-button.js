export function run(mount, { screen }){
  describe('Close Button', () => {
    it('should have base css class', () => {
      mount();
      expect(screen.getByRole('button', { name: '×' }).parentElement).toHaveClass('t-close-button');
    });

    it('should contain a lookless theme button', () => {
      mount();
      expect(screen.getByRole('button', { name: '×' })).toHaveClass('t-button-lookless');
    });
  });
}
