import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp } from '@react/services/testing/testing';
import { Tag } from './tag';

describe('Tag', () => {
  function mountComponent(props = {}, content){
    return mount(
      <Tag theme={ props.theme }>
        { content }
      </Tag>
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-tag');
  });

  it('should optionally set a primary theme', () => {
    const wrapper = mountComponent({ theme: 'primary' });
    expect(getRootElProp(wrapper, 'className')).toContain('t-tag-primary');
  });

  it('should optionally set a secondary theme', () => {
    const wrapper = mountComponent({ theme: 'secondary' });
    expect(getRootElProp(wrapper, 'className')).toContain('t-tag-secondary');
  });

  it('should optionally set a warning theme', () => {
    const wrapper = mountComponent({ theme: 'warning' });
    expect(getRootElProp(wrapper, 'className')).toContain('t-tag-warning');
  });

  it('should optionally set a danger theme', () => {
    const wrapper = mountComponent({ theme: 'danger' });
    expect(getRootElProp(wrapper, 'className')).toContain('t-tag-danger');
  });

  it('should optionally set a success theme', () => {
    const wrapper = mountComponent({ theme: 'success' });
    expect(getRootElProp(wrapper, 'className')).toContain('t-tag-success');
  });

  it('should optionally set a info theme', () => {
    const wrapper = mountComponent({ theme: 'info' });
    expect(getRootElProp(wrapper, 'className')).toContain('t-tag-info');
  });

  it('should render some content', () => {
    const wrapper = mountComponent({}, <i>New!</i>);
    expect(wrapper.find('i').text()).toEqual('New!');
  });
});
