import testService from '@scripts/services/test/test';
import { Container } from './index';

describe('Container', () => {
  function mountComponent({ content } = {}){
    return testService.mount(Container, { content });
  }

  it('should have appropriate css class', () => {
    const element = mountComponent();
    expect(element.querySelector('div').classList.contains('tas-container')).toEqual(true);
  });

  it('should transclude some content', () => {
    const content = '<p>Hello!</p>';
    const element = mountComponent({ content });
    expect(element.querySelector('p').textContent).toEqual('Hello!');
  });
});
