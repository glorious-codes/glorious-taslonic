import testService from '@scripts/services/test/test';
import { Button } from './index';

describe('Button', () => {
  function mountComponent({ attributes, content } = {}){
    return testService.mount(Button, { attributes, content });
  }

  it('should contain a button', () => {
    const element = mountComponent();
    expect(element.querySelectorAll('button').length).toEqual(1);
  });

  it('should button have appropriate css class', () => {
    const element = mountComponent();
    const button = element.querySelector('button');
    expect(button.classList.contains('tas-button')).toEqual(true);
  });

  it('should optionally display button as block', () => {
    const attributes = { 'data-display': 'block' };
    const element = mountComponent({ attributes });
    const button = element.querySelector('button');
    expect(button.classList.contains('tas-button-display-block')).toEqual(true);
  });

  it('should optionally set a primary button', () => {
    const attributes = { 'data-theme': 'primary' };
    const element = mountComponent({ attributes });
    const button = element.querySelector('button');
    expect(button.classList.contains('tas-button-theme-primary')).toEqual(true);
  });

  it('should optionally set a secondary button', () => {
    const attributes = { 'data-theme': 'secondary' };
    const element = mountComponent({ attributes });
    const button = element.querySelector('button');
    expect(button.classList.contains('tas-button-theme-secondary')).toEqual(true);
  });

  it('should optionally set a danger button', () => {
    const attributes = { 'data-theme': 'danger' };
    const element = mountComponent({ attributes });
    const button = element.querySelector('button');
    expect(button.classList.contains('tas-button-theme-danger')).toEqual(true);
  });

  it('should optionally set a click listener', () => {
    window.alert = jest.fn();
    const element = mountComponent();
    element.onClick(() => window.alert('Rafael'));
    element.querySelector('button').click();
    expect(window.alert).toHaveBeenCalledWith('Rafael');
  });

  it('should remove click listener on disconnected callback', () => {
    window.alert = jest.fn();
    const element = mountComponent();
    element.onClick(() => window.alert('Rafael'));
    element.disconnectedCallback();
    element.querySelector('button').click();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should transclude come content', () => {
    const content = 'Custom Button';
    const element = mountComponent({ content });
    expect(element.querySelector('button').innerHTML).toEqual(content);
  });
});
