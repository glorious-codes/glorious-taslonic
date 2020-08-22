import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './button';

describe('Button', () => {
  function mount(props = {}){
    return shallow(
      <Button
        theme={ props.theme }
        blocked={ props.blocked }
        tag={props.tag}
        { ...props }>
        { props.content }
      </Button>
    );
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-button');
  });

  it('should render a button using a button tag name by default', () => {
    const wrapper = mount();
    expect(wrapper.name().toLowerCase()).toEqual('button');
  });

  it('should optionally render a button using a anchor tag name', () => {
    const wrapper = mount({ tag: 'a' });
    expect(wrapper.name().toLowerCase()).toEqual('a');
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

  it('should optionally render custom attributes', () => {
    const href = 'https://rafaelcamargo.com';
    const target = '_blank';
    const wrapper = mount({ href , target });
    expect(wrapper.prop('href')).toEqual(href);
    expect(wrapper.prop('target')).toEqual(target);
  });

  it('should render some content', () => {
    const wrapper = mount({ content: <span>Click</span> });
    expect(wrapper.find('span').text()).toEqual('Click');
  });
});
