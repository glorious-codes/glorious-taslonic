import React from 'react';
import { mount } from 'enzyme';
import { getRootElProp } from '@react/services/testing/testing';
import buttonService from '@base/services/button/button';
import { Button } from './button';

describe('Button', () => {
  function mountComponent(props = {}, content){
    return mount(
      <Button
        theme={ props.theme }
        blocked={ props.blocked }
        tag={props.tag}
        { ...props }>
        { content }
      </Button>
    );
  }

  it('should have base css class', () => {
    const wrapper = mountComponent();
    expect(getRootElProp(wrapper, 'className')).toEqual('t-button');
  });

  it('should render a button using a button tag name by default', () => {
    const wrapper = mountComponent();
    expect(wrapper.childAt(0).type()).toEqual('button');
  });

  it('should optionally render a button using a anchor tag name', () => {
    const tag = 'a';
    const wrapper = mountComponent({ tag });
    expect(wrapper.childAt(0).type()).toEqual(tag);
  });

  it('should optionally set a primary theme', () => {
    const wrapper = mountComponent({ theme: 'primary' });
    expect(getRootElProp(wrapper, 'className').includes('t-button-primary')).toEqual(true);
  });

  it('should optionally set a secondary theme', () => {
    const wrapper = mountComponent({ theme: 'secondary' });
    expect(getRootElProp(wrapper, 'className').includes('t-button-secondary')).toEqual(true);
  });

  it('should optionally set a lookless theme', () => {
    const wrapper = mountComponent({ theme: 'lookless' });
    expect(getRootElProp(wrapper, 'className').includes('t-button-lookless')).toEqual(true);
  });

  it('should optionally set as blocked', () => {
    const wrapper = mountComponent({ blocked: true });
    expect(getRootElProp(wrapper, 'className').includes('t-button-blocked')).toEqual(true);
  });

  it('should optionally render custom attributes', () => {
    const href = 'https://rafaelcamargo.com';
    const target = '_blank';
    const wrapper = mountComponent({ href , target });
    expect(wrapper.prop('href')).toEqual(href);
    expect(wrapper.prop('target')).toEqual(target);
  });

  it('should render some content', () => {
    const wrapper = mountComponent({}, <span>Click</span>);
    expect(wrapper.find('span').text()).toEqual('Click');
  });

  it('should hide content and show loader on submit start', () => {
    const formModelMock = { onProcessChange: jest.fn(callback => callback({ isSubmitting: true })) };
    buttonService.findParentFormModel = jest.fn((el, onFind) => onFind(formModelMock));
    const wrapperEl = mountComponent({ type: 'submit' }, <strong>Submit</strong>).getDOMNode();
    expect(wrapperEl.querySelectorAll('strong').length).toEqual(0);
    expect(wrapperEl.querySelectorAll('[data-button-loader]').length).toEqual(1);
  });

  it('should show content and hide loader on submit complete', () => {
    const formModelMock = { onProcessChange: jest.fn(callback => callback({ isSubmitting: false })) };
    buttonService.findParentFormModel = jest.fn((el, onFind) => onFind(formModelMock));
    const wrapperEl = mountComponent({ type: 'submit' }, <strong>Submit</strong>).getDOMNode();
    expect(wrapperEl.querySelectorAll('strong').length).toEqual(1);
    expect(wrapperEl.querySelectorAll('[data-button-loader]').length).toEqual(0);
  });
});
