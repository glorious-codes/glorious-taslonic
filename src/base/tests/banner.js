import { pause } from '@base/services/testing/testing';

export function run(mount, { screen }){
  describe('Banner', () => {
    it('should have base css class', () => {
      const { container } = mount();
      expect(container.firstChild).toHaveClass('t-banner');
    });

    it('should optionally set a warning theme', () => {
      const { container } = mount({ theme: 'warning' });
      expect(container.firstChild).toHaveClass('t-banner-warning');
    });

    it('should optionally set a danger theme', () => {
      const { container } = mount({ theme: 'danger' });
      expect(container.firstChild).toHaveClass('t-banner-danger');
    });

    it('should optionally set a success theme', () => {
      const { container } = mount({ theme: 'success' });
      expect(container.firstChild).toHaveClass('t-banner-success');
    });

    it('should render some content', () => {
      const text = 'Hello';
      mount({ content: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should optionally execute trigger callback on trigger click if callback has been given', () => {
      const triggerText = 'Retry';
      const onTriggerClick = jest.fn();
      const { userEvent } = mount({ triggerText, onTriggerClick });
      userEvent.click(screen.getByRole('button', { name: triggerText }));
      expect(onTriggerClick).toHaveBeenCalled();
    });

    it('should remove itself on close button click', async () => {
      const text = 'Content';
      const { userEvent } = mount({ content: text });
      userEvent.click(screen.getByRole('button', { name: 'close banner' }));
      await pause();
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });

    it('should execute close callback on close', () => {
      const onClose = jest.fn();
      const { userEvent } = mount({ onClose });
      userEvent.click(screen.getByRole('button', { name: 'close banner' }));
      expect(onClose).toHaveBeenCalled();
    });

    it('should render custom prop', () => {
      const title = 'banner';
      mount({ title });
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });
}
