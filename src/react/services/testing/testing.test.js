import React from 'react';
import { mount } from 'enzyme';
import testingService from './testing';

describe('Testing Service', () => {
  function mockComponent(){
    return () => (<div className="some-class"></div>);
  }

  it('should get root element prop', () => {
    const ComponentMock = mockComponent();
    const wrapper = mount(<ComponentMock />);
    expect(testingService.getRootElProp(wrapper, 'className')).toEqual('some-class');
  });
});
