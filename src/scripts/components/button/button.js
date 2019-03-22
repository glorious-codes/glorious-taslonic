import '@styles/button.styl';
import template from './button.html';

export class Button extends HTMLElement {
  constructor(){
    super();
  }
  connectedCallback(){
    const customContent = this.innerHTML;
    this.innerHTML = template;
    this.querySelector('button').innerHTML = customContent;
  }
}

window.customElements.define('tas-button', Button);
