import '@styles/col.styl';
import attributeService from '@scripts/services/attribute/attribute';
import slotService from '@scripts/services/slot/slot';
import template from './col.html';

export class Col extends HTMLElement {
  connectedCallback(){
    this.innerHTML = slotService.write(template, this.innerHTML);
    handleSizeCssClass.call(this);
    handleOffsetCssClass.call(this);
  }
}

function handleSizeCssClass(){
  attributeService.handleCssClass(
    getRootElement(this),
    this.getAttribute('data-size'),
    attributeService.buildAcceptableNumberRange(1, 12),
    `${getBaseCSSClass()}-size`
  );
}

function handleOffsetCssClass(){
  attributeService.handleCssClass(
    getRootElement(this),
    this.getAttribute('data-offset'),
    attributeService.buildAcceptableNumberRange(1, 11),
    `${getBaseCSSClass()}-offset`
  );
}

function getRootElement(component){
  return component.querySelector('div');
}

function getBaseCSSClass(){
  return 'tas-col';
}
