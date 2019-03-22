import { Button } from './button';

describe('Button', () => {
  function mountComponent(customContent = ''){
    const element = new Button();
    element.innerHTML = customContent;
    element.connectedCallback();
    return element;
  }

  it('should contain a button', () => {
    const element = mountComponent();
    expect(element.querySelector('button')).toBeDefined();
  });

  it('should button have appropriate css class', () => {
    const element = mountComponent();
    const button = element.querySelector('button');
    expect(button.classList.contains('tas-button')).toEqual(true);
  });

  it('should transclude button text', () => {
    const customContent = 'Custom Button';
    const element = mountComponent(customContent);
    expect(element.querySelector('button').innerHTML).toEqual(customContent);
  });
});
