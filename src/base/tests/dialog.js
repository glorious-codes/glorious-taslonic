import { simulateKeydown, pause } from '@base/services/testing/testing';

export function run(mount, { screen, buildContentMarkup }){
  describe('Dialog', () => {
    afterEach(() => {
      closeDialog();
    });

    it('should have base css classes', async () => {
      await open();
      expect(getDialog()).toHaveClass('t-dialog');
      expect(getDialog().parentElement).toHaveClass('t-dialog-backdrop');
    });

    it('should blur the trigger element responsible to open confirm on click', async () => {
      const { userEvent } = mount();
      await pause();
      const trigger = screen.getByRole('button', { name: 'Open dialog' });
      const blur = jest.spyOn(trigger, 'blur');
      userEvent.click(trigger);
      expect(blur).toHaveBeenCalled();
    });

    it('should render custom content as plain text', async () => {
      const text = 'Hello';
      await open({ content: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render custom content as html', async () => {
      const title = 'rich content';
      const paragraph = 'Rich content.';
      await open({ content: buildContentMarkup({ title, paragraph }) });
      expect(screen.getByTitle(title)).toBeInTheDocument();
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    it('should optionally set a title', async () => {
      const title = 'Custom Title';
      await open({ title });
      expect(screen.getByRole('heading', { name: title, level: 2 })).toBeInTheDocument();
    });

    it('should optionally set custom width', async () => {
      const width = '500px';
      await open({ width });
      expect(getDialog()).toHaveAttribute('style', `max-width: ${width};`);
    });

    it('should optionally set a custom dialog wrapper name', async () => {
      await open({ name: 'confirm' });
      expect(document.querySelector('[data-confirm-wrapper]')).toBeInTheDocument();
    });

    it('should execute close callback on close', async () => {
      const onClose = jest.fn();
      const text = 'Hello';
      const { userEvent } = await open({ text, onClose });
      userEvent.click(screen.getByLabelText('close'));
      expect(onClose).toHaveBeenCalled();
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });

    it('should execute close callback on Esc keydown', async () => {
      const escKeyCode = 27;
      const onClose = jest.fn();
      await open({ onClose });
      simulateKeydown(escKeyCode);
      expect(onClose).toHaveBeenCalled();
    });

    it('should optionally not render close button', async () => {
      const { userEvent } = await open({ hideCloseButton: true });
      expect(screen.queryByRole('button', { name: 'close' })).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    });

    it('should not execute close callback on Esc keydown if dialog has no close button', async () => {
      const escKeyCode = 27;
      const onClose = jest.fn();
      await open({ onClose, hideCloseButton: true });
      simulateKeydown(escKeyCode);
      expect(onClose).not.toHaveBeenCalled();
    });

    async function open(props){
      const { userEvent, ...rest } = mount(props);
      userEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
      await pause();
      return { userEvent, ...rest };
    }

    function getDialog(){
      return document.querySelector('[data-dialog]');
    }

    function closeDialog(){
      const button = screen.queryByRole('button', { name: 'close' });
      button && button.click();
    }
  });
}
