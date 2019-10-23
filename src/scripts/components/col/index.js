import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { Col } from './col';

function init(){
  customElementsService.define('tas-col', Col);
}

init();

export { init, Col };
