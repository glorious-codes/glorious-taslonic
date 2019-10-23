import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { Container } from './container';

function init(){
  customElementsService.define('tas-container', Container);
}

init();

export { init, Container };
