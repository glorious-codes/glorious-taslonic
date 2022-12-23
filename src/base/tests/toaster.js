export function run(mount, { screen, buildContentMarkup }){
  describe('Toaster Service', () => {
    afterEach(() => {
      closeToast();
      jest.useRealTimers();
    });

    it('should have base css class', () => {
      pop();
      expect(getToast()).toHaveClass('t-toast');
    });

    it('should not render a title by default', () => {
      pop();
      expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
    });

    it('should optionally set a title', () => {
      const title = 'Taslonic';
      pop({ title });
      expect(screen.queryByRole('heading', { name: title, level: 3 })).toBeInTheDocument();
    });

    it('should optionally set a info theme', () => {
      pop({ theme: 'info' });
      expect(getToast()).toHaveClass('t-toast-info');
    });

    it('should optionally set a warning theme', () => {
      pop({ theme: 'warning' });
      expect(getToast()).toHaveClass('t-toast-warning');
    });

    it('should optionally set a danger theme', () => {
      pop({ theme: 'danger' });
      expect(getToast()).toHaveClass('t-toast-danger');
    });

    it('should optionally set a success theme', () => {
      pop({ theme: 'success' });
      expect(getToast()).toHaveClass('t-toast-success');
    });

    it('should render message as plain text', () => {
      const text = 'Hello';
      pop({ message: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should render message as html', () => {
      const title = 'rich content';
      const paragraph = 'Rich content.';
      pop({ message: buildContentMarkup({ title, paragraph }) });
      expect(screen.getByTitle(title)).toBeInTheDocument();
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    it('should optionally render title as plain text', () => {
      const text = 'Hello';
      pop({ title: text });
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    it('should optionally render title as html', () => {
      const title = 'rich content';
      const paragraph = 'Rich content.';
      pop({ title: buildContentMarkup({ title, paragraph }) });
      expect(screen.getByTitle(title)).toBeInTheDocument();
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    it('should be destroyed on close button click', () => {
      const text = 'Hello';
      const { userEvent } = pop({ message: text });
      userEvent.click(screen.getByRole('button', { name: 'close toast' }));
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    });

    it('should last for five seconds on screen', () => {
      jest.useFakeTimers();
      pop({ message: 'Hello' });
      jest.advanceTimersByTime(4999);
      expect(getToast()).toBeInTheDocument();
      jest.advanceTimersByTime(1);
      expect(getToast()).not.toBeInTheDocument();
    });

    function pop(toastOptions){
      const { userEvent } = mount(toastOptions);
      userEvent.click(screen.getByRole('button', { name: 'Pop toast' }));
      return { userEvent };
    }

    function getToast(){
      return document.querySelector('[data-toast]');
    }

    function closeToast(){
      const toast = getToast();
      const closeButton = toast && toast.querySelector('[aria-label="close toast"]');
      closeButton && closeButton.click();
    }
  });
}
