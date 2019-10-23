import '@styles/button.styl';
import attributeService from '@scripts/services/attribute/attribute';
import slotService from '@scripts/services/slot/slot';
import template from './button.html';

export class Button extends HTMLElement {
  connectedCallback(){
    this.innerHTML = slotService.write(template, this.innerHTML);
    handleThemeCssClass.call(this);
    handleDisplayCssClass.call(this);
  }
  disconnectedCallback(){
    queryButton(this).removeEventListener('click', this.clickFn);
  }
  onClick(clickFn){
    this.setClickFn(clickFn);
    queryButton(this).addEventListener('click', this.clickFn);
  }
  setClickFn(clickFn){
    this.clickFn = clickFn;
  }
}

function handleThemeCssClass(){
  attributeService.handleCssClass(
    getRootElement(this),
    this.getAttribute('data-theme'),
    getValidThemes(),
    'tas-button-theme'
  );
}

function handleDisplayCssClass(){
  attributeService.handleCssClass(
    getRootElement(this),
    this.getAttribute('data-display'),
    getValidDisplays(),
    'tas-button-display'
  );
}

function getRootElement(component){
  return component.querySelector('button');
}

function getValidThemes(){
  return ['primary', 'secondary', 'danger'];
}

function getValidDisplays(){
  return ['block'];
}

function queryButton(element){
  return element.querySelector('button');
}
