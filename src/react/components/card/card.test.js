import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp } from '@react/services/testing/testing';
import { Card } from './card';

describe('Card', () => {
  function mountComponent(props = {}, content){
    return mount(
      <Card
        title={ props.title }
        titleTagName={ props.titleTagName }>
        { content }
      </Card>
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-card');
  });

  it('should not contain a title by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('h3').length).toEqual(0);
  });

  it('should optionally render a title', () => {
    const title = 'Users';
    const wrapper = mountComponent({ title });
    expect(wrapper.find('h3').text()).toEqual(title);
  });

  it('should optionally render a title with custom tag name', () => {
    const title = 'Settings';
    const titleTagName = 'h1';
    const wrapper = mountComponent({ titleTagName, title });
    expect(wrapper.find(titleTagName).text()).toEqual(title);
  });

  it('should render some content', () => {
    const content = <p>Hello!</p>;
    const wrapper = mountComponent({}, content);
    expect(wrapper.find('p').text()).toEqual('Hello!');
  });
});
