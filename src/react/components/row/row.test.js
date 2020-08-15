import React from 'react';
import { shallow } from 'enzyme';
import { Row } from './row';

describe('Container', () => {
  function mount(props = {}){
    const { align, offset, verticalAlign } = props;
    return shallow(
      <Row
        align={ align }
        offset={ offset }
        verticalAlign={ verticalAlign }>
        { props.content }
      </Row>
    );
  }

  it('should have base css class', () => {
    const wrapper = mount();
    expect(wrapper.prop('className')).toEqual('t-row');
  });

  it('should optionally align contents at center', () => {
    const wrapper = mount({ align: 'center' });
    expect(wrapper.prop('className').includes('t-row-center')).toEqual(true);
  });

  it('should optionally align contents at right', () => {
    const wrapper = mount({ align: 'right' });
    expect(wrapper.prop('className').includes('t-row-right')).toEqual(true);
  });

  it('should optionally vertical align contents at middle', () => {
    const wrapper = mount({ verticalAlign: 'middle' });
    expect(wrapper.prop('className').includes('t-row-middle')).toEqual(true);
  });

  it('should optionally vertical align contents at bottom', () => {
    const wrapper = mount({ verticalAlign: 'bottom' });
    expect(wrapper.prop('className').includes('t-row-bottom')).toEqual(true);
  });

  it('should optionally offset row', () => {
    const wrapper = mount({ offset: '2' });
    expect(wrapper.prop('className').includes('t-row-offset-2')).toEqual(true);
  });

  it('should render some content', () => {
    const wrapper = mount({ content: <p>Hello</p> });
    expect(wrapper.find('p').text()).toEqual('Hello');
  });
});
