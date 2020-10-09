import { mount } from '@vue/test-utils';
import { closeButton } from './close-button';

describe('Close Button', () => {
  function mountComponent({ listeners = {} } = {}){
    return mount(closeButton, { listeners });
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(wrapper.classes()).toContain('t-close-button');
  });

  it('should contain a lookless theme button', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').classes()).toContain('t-button-lookless');
  });

  it('should contain a icon as button label', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('button').text()).toEqual('×');
  });

  it('should optionally set listeners', () => {
    const onChange = jest.fn();
    const wrapper = mountComponent({ listeners: { change: onChange } });
    wrapper.find('[data-close-button]').trigger('change');
    expect(onChange).toHaveBeenCalled();
  });
});
