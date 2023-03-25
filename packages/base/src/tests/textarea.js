import { expectFirstChild, pause } from '@base/services/testing/testing';

export function run(mount, { screen, waitFor }){
  describe('Textarea', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-form-control');
    });

    it('should not be disabled by default', () => {
      mount();
      expect(getTextarea()).not.toHaveAttribute('disabled');
    });

    it('should not be required by default', () => {
      mount();
      expect(getTextarea()).not.toHaveAttribute('required');
    });

    it('should optionally set a placeholder', () => {
      const placeholder = 'Enter a brief summary';
      mount({ placeholder });
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('should optionally set as required', async () => {
      const { userEvent } = mount({ required: true });
      await pause();
      expect(getTextarea()).toHaveAttribute('required', '');
    });

    it('should optionally set as disabled', async () => {
      const name = 'Rafael';
      const { userEvent } = mount({ disabled: true });
      userEvent.type(getTextarea(), name);
      await pause();
      expect(getTextarea().value).toEqual('');
      expect(screen.queryByDisplayValue(name)).not.toBeInTheDocument();
    });

    it('should optionally set as block', () => {
      expectFirstChild(mount({ block: true })).toHaveClass('t-form-control-block');
    });

    it('should optionally set a custom prop', () => {
      const title = 'Enter your name';
      const col = '3';
      const row = '4';
      mount({ title, col, row });
      const textarea = screen.getByTitle(title);
      expect(textarea).toHaveAttribute('col', col);
      expect(textarea).toHaveAttribute('row', row);
    });

    it('should optionally set some initial value', () => {
      const value = 'Rafael';
      mount({ value });
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('should optionally set custom validations', async () => {
      const shortErrorMessage = 'Too short';
      const invalidLetterErrorMessage = '"A" not allowed';
      const errorCssClass = 't-form-control-invalid';
      const validations = [
        { isValid: value => value?.length > 1, errorMessage: shortErrorMessage },
        { isValid: value => !value?.includes('a'), errorMessage: invalidLetterErrorMessage },
      ];
      const { container, userEvent } = mount({ validations });
      await pause();
      const formControlEl = container.firstChild;
      expect(formControlEl).not.toHaveClass(errorCssClass);
      userEvent.type(getTextarea(), 'F');
      expect(screen.queryByText(shortErrorMessage)).not.toBeInTheDocument();
      waitFor(() => {
        userEvent.tab();
      });
      await pause();
      expect(formControlEl).toHaveClass(errorCssClass);
      expect(screen.getByText(shortErrorMessage)).toBeInTheDocument();
      waitFor(() => {
        userEvent.type(getTextarea(), 'a');
      });
      await pause();
      expect(screen.getByText(invalidLetterErrorMessage)).toBeInTheDocument();
      waitFor(() => {
        userEvent.type(getTextarea(), '{backspace}o');
      });
      await pause();
      expect(screen.queryByText(invalidLetterErrorMessage)).not.toBeInTheDocument();
      expect(formControlEl).not.toHaveClass(errorCssClass);
    });

    function getTextarea(){
      return screen.getByRole('textbox');
    }
  });
}
