import { simulateKeydown } from '@base/services/testing/testing';

export function run(mount, { screen, buildContentMarkup }){
  describe('Alert', () => {
    it('should have base css class', () => {
      const { container } = mount();
      expect(container.firstChild).toHaveClass('t-alert-content');
    });

    it('should render custom content', () => {
      const message = 'It\'s an alert.';
      mount({ content: buildContentMarkup(message) });
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    it('should dismiss button text be "Ok" by default', () => {
      mount();
      expect(screen.getByText('Ok')).toBeInTheDocument();
    });

    it('should optionally customize dismiss button text', () => {
      const dismissButtonText = 'Dismiss';
      mount({ dismissButtonText });
      expect(screen.getByText(dismissButtonText)).toBeInTheDocument();
    });

    it('should execute dismiss callback on dismiss button click', () => {
      const onDismiss = jest.fn();
      const { userEvent } = mount({ onDismiss });
      userEvent.click(screen.getByText('Ok'));
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should execute dismiss callback on Enter keydown', () => {
      const enterKeyCode = 13;
      const onDismiss = jest.fn();
      mount({ onDismiss });
      simulateKeydown(enterKeyCode);
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should stop listening Enter keydown on component unmount', () => {
      const enterKeyCode = 13;
      const onDismiss = jest.fn();
      const { unmount } = mount({ onDismiss });
      unmount();
      simulateKeydown(enterKeyCode);
      expect(onDismiss).not.toHaveBeenCalled();
    });
  });
}
