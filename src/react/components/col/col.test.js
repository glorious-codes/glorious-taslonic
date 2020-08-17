import React from 'react';
import { shallow } from 'enzyme';
import { Col } from './col';

describe('Column', () => {
  function mount(props = {}){
    const {
      xs,
      sm,
      md,
      lg,
      offsetXs,
      offsetSm,
      offsetMd,
      offsetLg,
      alignXs,
      alignSm,
      alignMd,
      alignLg
    } = props;
    return shallow(
      <Col
        xs={ xs }
        sm={ sm }
        md={ md }
        lg={ lg }
        offsetXs={ offsetXs }
        offsetSm={ offsetSm }
        offsetMd={ offsetMd }
        offsetLg={ offsetLg }
        alignXs={ alignXs }
        alignSm={ alignSm }
        alignMd={ alignMd }
        alignLg={ alignLg }>
        { props.content }
      </Col>
    );
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-col');
  });

  it('should optionally size column for extra-small screens', () => {
    const wrapper = mount({ xs: '6' });
    expect(wrapper.prop('className').includes('t-col-xs-6')).toEqual(true);
  });

  it('should optionally size column for small screens', () => {
    const wrapper = mount({ sm: '6' });
    expect(wrapper.prop('className').includes('t-col-sm-6')).toEqual(true);
  });

  it('should optionally size column for medium screens', () => {
    const wrapper = mount({ md: '6' });
    expect(wrapper.prop('className').includes('t-col-md-6')).toEqual(true);
  });

  it('should optionally size column for large screens', () => {
    const wrapper = mount({ lg: '6' });
    expect(wrapper.prop('className').includes('t-col-lg-6')).toEqual(true);
  });

  it('should optionally offset column in extra-small screens', () => {
    const wrapper = mount({ offsetXs: '2' });
    expect(wrapper.prop('className').includes('t-col-offset-xs-2')).toEqual(true);
  });

  it('should optionally offset column in small screens', () => {
    const wrapper = mount({ offsetSm: '2' });
    expect(wrapper.prop('className').includes('t-col-offset-sm-2')).toEqual(true);
  });

  it('should optionally offset column in medium screens', () => {
    const wrapper = mount({ offsetMd: '2' });
    expect(wrapper.prop('className').includes('t-col-offset-md-2')).toEqual(true);
  });

  it('should optionally offset column in large screens', () => {
    const wrapper = mount({ offsetLg: '2' });
    expect(wrapper.prop('className').includes('t-col-offset-lg-2')).toEqual(true);
  });

  it('should optionally align column text content in extra-small screens', () => {
    const wrapper = mount({ alignXs: 'center' });
    expect(wrapper.prop('className').includes('t-col-align-xs-center')).toEqual(true);
  });

  it('should optionally align column text content in small screens', () => {
    const wrapper = mount({ alignSm: 'center' });
    expect(wrapper.prop('className').includes('t-col-align-sm-center')).toEqual(true);
  });

  it('should optionally align column text content in medium screens', () => {
    const wrapper = mount({ alignMd: 'center' });
    expect(wrapper.prop('className').includes('t-col-align-md-center')).toEqual(true);
  });

  it('should optionally align column text content in large screens', () => {
    const wrapper = mount({ alignLg: 'center' });
    expect(wrapper.prop('className').includes('t-col-align-lg-center')).toEqual(true);
  });
});
