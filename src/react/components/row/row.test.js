import React from 'react';
import { shallow } from 'enzyme';
import { Row } from './row';

describe('Container', () => {
  function mount(props = {}){
    return shallow(
      <Row
        align={ props.align }
        alignXs={ props.alignXs }
        alignSm={ props.alignSm }
        alignMd={ props.alignMd }
        alignLg={ props.alignLg }
        offset={ props.offset }
        offsetXs={ props.offsetXs }
        offsetSm={ props.offsetSm }
        offsetMd={ props.offsetMd }
        offsetLg={ props.offsetLg }
        verticalAlign={ props.verticalAlign }
        verticalAlignXs={ props.verticalAlignXs }
        verticalAlignSm={ props.verticalAlignSm }
        verticalAlignMd={ props.verticalAlignMd }
        verticalAlignLg={ props.verticalAlignLg }
      >
        { props.content }
      </Row>
    );
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-row');
  });

  it('should optionally align contents at left', () => {
    const wrapper = mount({ align: 'left' });
    expect(wrapper.prop('className').includes('t-row-left')).toEqual(true);
  });

  it('should optionally align contents at center on extra small screens', () => {
    const wrapper = mount({ alignXs: 'center' });
    expect(wrapper.prop('className').includes('t-row-xs-center')).toEqual(true);
  });

  it('should optionally align contents at right on large screens', () => {
    const wrapper = mount({ alignLg: 'right' });
    expect(wrapper.prop('className').includes('t-row-lg-right')).toEqual(true);
  });

  it('should optionally vertical align contents at top', () => {
    const wrapper = mount({ verticalAlign: 'top' });
    expect(wrapper.prop('className').includes('t-row-top')).toEqual(true);
  });

  it('should optionally vertical align contents at bottom on medium screens', () => {
    const wrapper = mount({ verticalAlignMd: 'bottom' });
    expect(wrapper.prop('className').includes('t-row-md-bottom')).toEqual(true);
  });

  it('should optionally vertical align contents at middle on small screens', () => {
    const wrapper = mount({ verticalAlignSm: 'bottom' });
    expect(wrapper.prop('className').includes('t-row-sm-bottom')).toEqual(true);
  });

  it('should optionally offset row', () => {
    const wrapper = mount({ offset: '2' });
    expect(wrapper.prop('className').includes('t-row-offset-2')).toEqual(true);
  });

  it('should optionally offset row on extra small screens', () => {
    const wrapper = mount({ offsetXs: '2' });
    expect(wrapper.prop('className').includes('t-row-offset-xs-2')).toEqual(true);
  });

  it('should optionally offset row on large screens', () => {
    const wrapper = mount({ offsetLg: '0' });
    expect(wrapper.prop('className').includes('t-row-offset-lg-0')).toEqual(true);
  });

  it('should render some content', () => {
    const wrapper = mount({ content: <p>Hello</p> });
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
