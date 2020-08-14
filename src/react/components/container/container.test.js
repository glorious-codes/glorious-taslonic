import React from 'react';
import { shallow } from 'enzyme';
import { Container } from './container';

describe('Container', () => {
  function mount(props = {}){
    return shallow(
      <Container size={ props.size }>
        { props.content }
      </Container>
    );
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-container');
  });

  it('should optionally set a small size', () => {
    const wrapper = mount({ size: 'sm' });
    expect(wrapper.prop('className').includes('t-container-sm')).toEqual(true);
  });

  it('should optionally set a large size', () => {
    const wrapper = mount({ size: 'lg' });
    expect(wrapper.prop('className').includes('t-container-lg')).toEqual(true);
  });

  it('should render some content', () => {
    const wrapper = mount({ content: <p>Hello</p> });
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
