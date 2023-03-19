import { expectFirstChild, pause } from '@base/services/testing/testing';

export function run(mount, { screen, buildContentMarkup }){
  describe('Field', () => {
    it('should have base css class', () => {
      expectFirstChild(mount()).toHaveClass('t-field');
    });

    it('should contain required css class if required prop has been given as true', () => {
      expectFirstChild(mount({ required: true })).toHaveClass('t-field-required');
    });

    it('should contain block css class if block prop has been given as true', () => {
      expectFirstChild(mount({ block: true })).toHaveClass('t-field-block');
    });

    it('should contain required css class if no required prop has been passed but content is required', async () => {
      const { container } = mount({ label: 'Name', content: buildContentMarkup({ required: true }) });
      await pause();
      expect(container.firstChild).toHaveClass('t-field-required');
    });

    it('should set "for" attribute in accordance with form control "id"', async () => {
      const label = 'Name';
      const name = 'Joe';
      const { userEvent } = mount({ label, content: buildContentMarkup() });
      await pause();
      userEvent.type(screen.getByLabelText(label), name);
      expect(screen.getByDisplayValue(name)).toBeInTheDocument();
    });

    it('should render custom prop', async () => {
      const title = 'Name';
      mount({ title });
      expect(screen.getByTitle(title)).toBeInTheDocument();
    });
  });
}
