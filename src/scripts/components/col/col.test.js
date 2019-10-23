import testService from '@scripts/services/test/test';
import { Col } from './index';

describe('Col', () => {
  function mountComponent({ attributes, content } = {}){
    return testService.mount(Col, { attributes, content });
  }

  it('should have appropriate css class', () => {
    const element = mountComponent();
    expect(element.querySelector('div').classList.contains('tas-col')).toEqual(true);
  });

  it('should optionally set size', () => {
    const attributes = { 'data-size': '10' };
    const element = mountComponent({ attributes });
    expect(element.querySelector('div').classList.contains('tas-col-size-10')).toEqual(true);
  });

  it('should optionally offset col', () => {
    const attributes = { 'data-offset': '4' };
    const element = mountComponent({ attributes });
    expect(element.querySelector('div').classList.contains('tas-col-offset-4')).toEqual(true);
  });

  it('should transclude some content', () => {
    const content = '<p>Hello!</p>';
    const element = mountComponent({ content });
    expect(element.querySelector('p').textContent).toEqual('Hello!');
  });
});
