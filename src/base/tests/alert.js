import { simulateKeydown, pause } from '@base/services/testing/testing';

export function run(mount, { screen, buildContentMarkup }){
  describe('Alert', () => {
    afterEach(() => {
      closeAlert();
    });

    it('should have base css class', async () => {
      await open();
      expect(getAlert()).toHaveClass('t-alert-content');
    });

    it('should blur the trigger element responsible to open the alert on click', async () => {
      const { userEvent } = mount();
      await pause();
      const trigger = screen.getByRole('button', { name: 'Open alert' });
      const blur = jest.spyOn(trigger, 'blur');
      userEvent.click(trigger);
      expect(blur).toHaveBeenCalled();
    });

    it('should render custom content as plain text', async () => {
      const text = 'Alert';
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

    it('should dismiss button text be "Ok" by default', async () => {
      await open();
      expect(screen.getByRole('button', { name: 'Ok' })).toBeInTheDocument();
    });

    it('should optionally set custom dismiss button text', async () => {
      const dismissButtonText = 'Dismiss';
      await open({ dismissButtonText });
      expect(screen.getByText(dismissButtonText)).toBeInTheDocument();
    });

    it('should execute dismiss callback on dismiss button click', async () => {
      const onDismiss = jest.fn();
      await open({ onDismiss });
      screen.getByText('Ok').click();
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should execute dismiss callback on Enter keydown', async () => {
      const enterKeyCode = 13;
      const onDismiss = jest.fn();
      const text = 'Alert';
      await open({ text, onDismiss });
      simulateKeydown(enterKeyCode);
      expect(screen.queryByText(text)).not.toBeInTheDocument();
      expect(onDismiss).toHaveBeenCalled();
    });

    it('should stop listening Enter key after alert dismiss', async () => {
      const enterKeyCode = 13;
      const onDismiss = jest.fn();
      await open({ onDismiss });
      simulateKeydown(enterKeyCode);
      simulateKeydown(enterKeyCode);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    async function open(props){
      const { userEvent } = mount(props);
      userEvent.click(screen.getByRole('button', { name: 'Open alert' }));
      await pause();
    }

    function getAlert(){
      return document.querySelector('[data-alert]');
    }

    function getDialog(){
      return document.querySelector('[data-dialog]');
    }

    function closeAlert(){
      const alert = getAlert();
      alert && alert.querySelector('button').click();
    }
  });
}
