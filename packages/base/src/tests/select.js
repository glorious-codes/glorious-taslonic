import { expectFirstChild, pause } from '@base/services/testing/testing';

export function run(mount, { screen, buildOptions, waitFor }){
  describe('Select', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-form-control');
    });

    it('should not be disabled by default', () => {
      mount();
      expect(getSelect()).not.toHaveAttribute('disabled');
    });

    it('should not be required by default', () => {
      mount();
      expect(getSelect()).not.toHaveAttribute('required');
    });

    it('should not show placeholder by default', () => {
      mount();
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });

    it('should optionally set a placeholder', () => {
      const placeholder = 'Select a fruit';
      mount({ placeholder });
      expect(screen.getByText(placeholder)).toBeInTheDocument();
    });

    it('should optionally be set as required', async () => {
      const placeholder = 'Select';
      const content = buildOptions(['orange', 'apple', 'kiwi']);
      const { userEvent } = mount({ placeholder, content, required: true });
      expect(getSelect()).toHaveAttribute('required', '');
    });

    it('should optionally be set as disabled', () => {
      const placeholder = 'Select';
      const content = buildOptions(['orange', 'apple', 'kiwi']);
      const { userEvent } = mount({ placeholder, content, disabled: true });
      userEvent.selectOptions(getSelect(), ['apple']);
      expect(getSelect().value).toEqual('');
    });

    it('should optionally be set as block', () => {
      expectFirstChild(mount({ block: true })).toHaveClass('t-form-control-block');
    });

    it('should optionally set a custom prop', () => {
      const title = 'Select a fruit';
      mount({ title });
      expect(screen.getByTitle(title).tagName).toEqual('SELECT');
    });

    it('should optionally set some initial value', () => {
      const value = 'orange';
      const content = buildOptions(['orange', 'banana', 'kiwi']);
      mount({ value, content });
      expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    it('should optionally set custom validations', async () => {
      const placeholder = 'Select';
      const forbbidenFruit = 'Forbiden fruit';
      const notLongEnough = 'Must be at least five chars long';
      const errorCssClass = 't-form-control-invalid';
      const content = buildOptions(['orange', 'apple', 'kiwi']);
      const validations = [
        { isValid: value => value !== 'apple', errorMessage: forbbidenFruit },
        { isValid: value => value?.length > 5, errorMessage: notLongEnough },
      ];
      const { container, userEvent } = mount({ validations, placeholder, content });
      await pause();
      const formControlEl = container.firstChild;
      expect(formControlEl).not.toHaveClass(errorCssClass);
      expect(screen.queryByText(forbbidenFruit)).not.toBeInTheDocument();
      userEvent.selectOptions(getSelect(), ['apple']);
      waitFor(() => {
        userEvent.tab();
      })
      await pause();
      expect(screen.queryByText(forbbidenFruit)).toBeInTheDocument();
      expect(formControlEl).toHaveClass(errorCssClass);
      waitFor(() => {
        userEvent.selectOptions(getSelect(), ['kiwi']);
      })
      await pause();
      expect(screen.queryByText(forbbidenFruit)).not.toBeInTheDocument();
      expect(screen.queryByText(notLongEnough)).toBeInTheDocument();
      waitFor(() => {
        userEvent.selectOptions(getSelect(), ['orange']);
      })
      await pause();
      expect(screen.queryByText(notLongEnough)).not.toBeInTheDocument();
      expect(formControlEl).not.toHaveClass(errorCssClass);
    });

    function getSelect(){
      return screen.getByRole('combobox');
    }
  });
}
