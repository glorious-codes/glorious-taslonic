import React from 'react';
import { shallow } from 'enzyme';
import { Toast } from './toast';

describe('Toast', () => {
  function mount(props = {}){
    return shallow(<Toast { ...props } />);
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-toast');
  });

  it('should not render a title by default', () => {
    const wrapper = mount();
    expect(wrapper.find('[data-toast-title]').length).toEqual(0);
  });

  it('should optionally set a title', () => {
    const title = 'Taslonic';
    const wrapper = mount({ title });
    expect(wrapper.find('[data-toast-title]').text()).toEqual(title);
  });

  it('should optionally set a info theme', () => {
    const wrapper = mount({ theme: 'info' });
    expect(wrapper.prop('className').includes('t-toast-info')).toEqual(true);
  });

  it('should optionally set a warning theme', () => {
    const wrapper = mount({ theme: 'warning' });
    expect(wrapper.prop('className').includes('t-toast-warning')).toEqual(true);
  });

  it('should optionally set a danger theme', () => {
    const wrapper = mount({ theme: 'danger' });
    expect(wrapper.prop('className').includes('t-toast-danger')).toEqual(true);
  });

  it('should optionally set a success theme', () => {
    const wrapper = mount({ theme: 'success' });
    expect(wrapper.prop('className').includes('t-toast-success')).toEqual(true);
  });

  it('should render a message', () => {
    const message = <p>Hello</p>;
    const wrapper = mount({ message });
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
