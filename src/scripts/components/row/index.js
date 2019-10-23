import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { Row } from './row';

function init(){
  customElementsService.define('tas-row', Row);
}

init();

export { init, Row };
