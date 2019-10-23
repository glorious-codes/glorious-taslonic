import testService from '@scripts/services/test/test';
import { Row } from './index';

describe('Row', () => {
  function mountComponent({ attributes, content } = {}){
    return testService.mount(Row, { attributes, content });
  }

  it('should have appropriate css class', () => {
    const element = mountComponent();
    expect(element.querySelector('div').classList.contains('tas-row')).toEqual(true);
  });

  it('should optionally align text content to the center', () => {
    const attributes = { 'data-align': 'center' };
    const element = mountComponent({ attributes });
    expect(element.querySelector('div').classList.contains('tas-row-align-center')).toEqual(true);
  });

  it('should optionally align text content to the right', () => {
    const attributes = { 'data-align': 'right' };
    const element = mountComponent({ attributes });
    expect(element.querySelector('div').classList.contains('tas-row-align-right')).toEqual(true);
  });

  it('should optionally offset row', () => {
    const attributes = { 'data-offset': '4' };
    const element = mountComponent({ attributes });
    expect(element.querySelector('div').classList.contains('tas-row-offset-4')).toEqual(true);
  });

  it('should transclude some content', () => {
    const content = '<p>Hello!</p>';
    const element = mountComponent({ content });
    expect(element.querySelector('p').textContent).toEqual('Hello!');
  });
});
