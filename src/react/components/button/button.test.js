import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './button';

describe('Button', () => {
  function mount(props = {}){
    return shallow(
      <Button theme={ props.theme } blocked={ props.blocked } { ...props }>
        { props.content }
      </Button>
    );
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-button');
  });

  it('should optionally set a primary theme', () => {
    const wrapper = mount({ theme: 'primary' });
    expect(wrapper.prop('className').includes('t-button-primary')).toEqual(true);
  });

  it('should optionally set a secondary theme', () => {
    const wrapper = mount({ theme: 'secondary' });
    expect(wrapper.prop('className').includes('t-button-secondary')).toEqual(true);
  });

  it('should optionally set as blocked', () => {
    const wrapper = mount({ blocked: true });
    expect(wrapper.prop('className').includes('t-button-blocked')).toEqual(true);
  });

  it('should render some content', () => {
    const wrapper = mount({ content: <span>Click</span> });
    expect(wrapper.find('span').text()).toEqual('Click');
  });
});
