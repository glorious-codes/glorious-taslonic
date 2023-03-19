import { simulateKeydown, pause } from '@base/services/testing/testing';

export function run(mount, { screen, buildContentMarkup }){
  describe('Confirm', () => {
    afterEach(() => {
      closeConfirm();
    });

    it('should have base css class', async () => {
      await open();
      expect(getConfirm()).toHaveClass('t-confirm-content');
    });

    it('should blur the trigger element responsible to open confirm on click', async () => {
      const { userEvent } = mount();
      await pause();
      const trigger = screen.getByRole('button', { name: 'Open confirm' });
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

    it('should optionally render a title', async () => {
      const title = 'Important';
      await open({ title });
      expect(screen.getByRole('heading', { name: title, level: 2 })).toBeInTheDocument();
    });

    it('should optionally set custom width', async () => {
      const width = '500px';
      await open({ width });
      expect(getDialog()).toHaveAttribute('style', `max-width: ${width};`);
    });

    it('should execute cancel callback on cancel button click', async () => {
      const onCancel = jest.fn();
      const text = 'Hello';
      const { userEvent } = await open({ onCancel, content: text });
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      await pause();
      expect(onCancel).toHaveBeenCalled();
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });

    it('should execute cancel callback on Esc keydown', async () => {
      const escKeyCode = 27;
      const onCancel = jest.fn();
      await open({ onCancel });
      simulateKeydown(escKeyCode);
      expect(onCancel).toHaveBeenCalled();
    });

    it('should optionally set custom cancel button text', async () => {
      const cancelButtonText = 'Abort';
      const onCancel = jest.fn();
      const { userEvent } = await open({ onCancel, cancelButtonText });
      userEvent.click(screen.getByRole('button', { name: cancelButtonText }));
      expect(onCancel).toHaveBeenCalled();
    });

    it('should execute confirm callback on confirm button click', async () => {
      const onConfirm = jest.fn();
      const text = 'Hello';
      const { userEvent } = await open({ onConfirm, content: text });
      userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
      await pause();
      expect(onConfirm).toHaveBeenCalled();
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });

    it('should execute confirm callback on Enter keydown', async () => {
      const enterKeyCode = 13;
      const onConfirm = jest.fn();
      await open({ onConfirm });
      simulateKeydown(enterKeyCode);
      expect(onConfirm).toHaveBeenCalled();
    });

    it('should not execute confirm callback on Enter keydown if cancel button is focused', async () => {
      const enterKeyCode = 13;
      const onConfirm = jest.fn();
      await open({ onConfirm });
      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      cancelButton.focus();
      simulateKeydown(enterKeyCode);
      expect(onConfirm).not.toHaveBeenCalled();
    });

    it('should optionally set custom confirm button text', async () => {
      const confirmButtonText = 'Go!';
      const onConfirm = jest.fn();
      const { userEvent } = await open({ onConfirm, confirmButtonText });
      userEvent.click(screen.getByRole('button', { name: confirmButtonText }));
      expect(onConfirm).toHaveBeenCalled();
    });

    async function open(props){
      const { userEvent, ...rest } = mount(props);
      userEvent.click(screen.getByRole('button', { name: 'Open confirm' }));
      await pause();
      return { userEvent, ...rest };
    }

    function getConfirm(){
      return document.querySelector('[data-confirm]');
    }

    function getDialog(){
      return document.querySelector('[data-dialog]');
    }

    function closeConfirm(){
      const button = getCancelButton();
      button && button.click();
    }

    function getCancelButton(){
      const confirm = getConfirm();
      return confirm && confirm.querySelectorAll('button')[0];
    }
  });
}
