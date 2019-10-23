import '@styles/container.styl';
import slotService from '@scripts/services/slot/slot';
import template from './container.html';

export class Container extends HTMLElement {
  connectedCallback(){
    this.innerHTML = slotService.write(template, this.innerHTML);
  }
}
