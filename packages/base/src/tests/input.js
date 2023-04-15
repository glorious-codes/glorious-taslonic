import { expectFirstGrandChild, setRangeInputValue, pause } from '@base/services/testing/testing';

export function run(mount, { screen, fireEvent, waitFor }){
  describe('Input', () => {
    it('should have base css class', () => {
      expectFirstGrandChild(mount()).toHaveClass('t-form-control');
    });

    it('should not be disabled by default', () => {
      mount();
      expect(getInput()).not.toHaveAttribute('disabled');
    });

    it('should not be required by default', () => {
      mount();
      expect(getInput()).not.toHaveAttribute('required');
    });

    it('should type be text by default', () => {
      mount();
      expect(getInput()).toHaveAttribute('type', 'text');
    });

    it('should optionally set a custom type', () => {
      const type = 'email';
      mount({ type });
      expect(getInput()).toHaveAttribute('type', type);
    });

    it('should optionally set a placeholder', () => {
      const placeholder = 'Enter your name';
      mount({ placeholder });
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('should optionally set as required', async () => {
      const { userEvent } = mount({ required: true });
      await pause();
      expect(getInput()).toHaveAttribute('required', '');
    });

    it('should optionally update required attribute', async () => {
      const { userEvent } = mount({ required: true });
      await pause();
      userEvent.type(getInput(), 'o{backspace}');
      waitFor(() => {
        userEvent.tab();
      });
      await pause();
      expect(getInput()).toHaveAttribute('required', '');
      expect(screen.queryByText('Required')).toBeInTheDocument();
      userEvent.click(screen.getByText('toggle required'));
      await pause();
      expect(getInput()).not.toHaveAttribute('required');
      expect(screen.queryByText('Required')).not.toBeInTheDocument();
    });

    it('should optionally set as disabled', async () => {
      const name = 'Rafael';
      const { userEvent } = mount({ disabled: true });
      userEvent.type(getInput(), name);
      await pause();
      expect(getInput().value).toEqual('');
      expect(screen.queryByDisplayValue(name)).not.toBeInTheDocument();
    });

    it('should optionally update disabled attribute', async () => {
      const { userEvent } = mount({ disabled: true });
      const value = 'r';
      await pause();
      userEvent.type(getInput(), value);
      await pause();
      expect(screen.queryByDisplayValue(value)).not.toBeInTheDocument();
      userEvent.click(screen.getByText('toggle disabled'));
      await pause();
      userEvent.type(getInput(), value);
      expect(screen.queryByDisplayValue(value)).toBeInTheDocument();
    });

    it('should optionally set as block', () => {
      expectFirstGrandChild(mount({ block: true })).toHaveClass('t-form-control-block');
    });

    it('should optionally set a custom prop', () => {
      const title = 'Enter your name';
      mount({ title });
      expect(screen.getByTitle(title).tagName).toEqual('INPUT');
    });

    it('should optionally set some initial value', () => {
      const value = 'Rafael';
      mount({ value });
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('should optionally update value dynamically', async () => {
      const value = 'Rafael';
      const { userEvent } = mount({ value });
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
      userEvent.click(screen.getByText('update value'));
      await pause();
      expect(screen.getByDisplayValue('Fernando')).toBeInTheDocument();
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
      const formControlEl = container.firstChild.firstChild;
      expect(formControlEl).not.toHaveClass(errorCssClass);
      userEvent.type(getInput(), 'F');
      expect(screen.queryByText(shortErrorMessage)).not.toBeInTheDocument();
      waitFor(() => {
        userEvent.tab();
      });
      await pause();
      expect(formControlEl).toHaveClass(errorCssClass);
      expect(screen.getByText(shortErrorMessage)).toBeInTheDocument();
      waitFor(() => {
        userEvent.type(getInput(), 'a');
      });
      await pause();
      expect(screen.getByText(invalidLetterErrorMessage)).toBeInTheDocument();
      waitFor(() => {
        userEvent.type(getInput(), '{backspace}o');
      });
      await pause();
      expect(screen.queryByText(invalidLetterErrorMessage)).not.toBeInTheDocument();
      expect(formControlEl).not.toHaveClass(errorCssClass);
    });

    it('should optionally update custom validations', async () => {
      const shortErrorMessage = 'Too short';
      const validations = [
        { isValid: value => value?.length > 1, errorMessage: shortErrorMessage }
      ];
      const { userEvent } = mount({ validations });
      await pause();
      userEvent.type(getInput(), 'F');
      waitFor(() => {
        userEvent.tab();
      });
      await pause();
      expect(screen.queryByText(shortErrorMessage)).toBeInTheDocument();
      userEvent.click(screen.getByText('remove custom validations'));
      await pause();
      expect(screen.queryByText(shortErrorMessage)).not.toBeInTheDocument();
    });

    it('should optionally validate a selected file', async () => {
      const label = 'File'
      const shortFilenameErrorMessage = 'Filename must be at least 5 chars long';
      const validations = [{
        isValid: (val, evt) => evt.target.files[0].name.split('.')[0].length >= 5,
        errorMessage: shortFilenameErrorMessage
      }];
      const { userEvent } = mount({ 'aria-label': label, type: 'file', validations });
      const input = screen.getByLabelText(label);
      userEvent.upload(input, mockFile());
      await pause();
      waitFor(() => {
        userEvent.tab();
      });
      await pause();
      expect(screen.queryByText(shortFilenameErrorMessage)).toBeInTheDocument();
    });

    it('should optionally validate a range', async () => {
      const lowRangeErrorMessage = 'Must be greater than 50';
      const validations = [{
        isValid: val => parseInt(val) > 50,
        errorMessage: lowRangeErrorMessage
      }];
      const { userEvent, container } = mount({ type: 'range', value: '51', validations });
      await pause();
      const input = screen.getByRole('slider');
      await setRangeInputValue(waitFor, input, '50');
      expect(screen.queryByText(lowRangeErrorMessage)).toBeInTheDocument();
      await setRangeInputValue(waitFor, input, '51');
      expect(screen.queryByText(lowRangeErrorMessage)).not.toBeInTheDocument();
    });

    function getInput(){
      return screen.getByRole('textbox');
    }

    function mockFile(){
      return new File(['almost no content'], 'b.txt', {type: 'text/txt'})
    }
  });
}
