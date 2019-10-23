import '@styles/row.styl';
import attributeService from '@scripts/services/attribute/attribute';
import slotService from '@scripts/services/slot/slot';
import template from './row.html';

export class Row extends HTMLElement {
  connectedCallback(){
    this.innerHTML = slotService.write(template, this.innerHTML);
    handleAlignCssClass.call(this);
    handleOffsetCssClass.call(this);
  }
}

function handleAlignCssClass(){
  attributeService.handleCssClass(
    getRootElement(this),
    this.getAttribute('data-align'),
    getValidAligns(),
    `${getBaseCSSClass()}-align`
  );
}

function handleOffsetCssClass(){
  attributeService.handleCssClass(
    getRootElement(this),
    this.getAttribute('data-offset'),
    attributeService.buildAcceptableNumberRange(1, 10),
    `${getBaseCSSClass()}-offset`
  );
}

function getRootElement(component){
  return component.querySelector('div');
}

function getValidAligns(){
  return ['center', 'right'];
}

function getBaseCSSClass(){
  return 'tas-row';
}
