import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp, fireEvent } from './testing';

describe('Testing Service', () => {
  function mockComponent(){
    return () => (<div className="some-class"></div>);
  }

  it('should get root element prop', () => {
    const ComponentMock = mockComponent();
    const wrapper = mount(<ComponentMock />);
    expect(getRootElProp(wrapper, 'className')).toEqual('some-class');
  });

  it('should fire a bubbling event from a given target', () => {
    const target = document.createElement('button');
    target.setAttribute('type', 'button');
    target.dispatchEvent = jest.fn(evt => {
      expect(evt.bubbles).toEqual(true);
    });
    fireEvent(target, 'click');
  });
});
