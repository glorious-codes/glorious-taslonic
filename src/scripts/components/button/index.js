import customElementsService from '@scripts/services/custom-elements/custom-elements';
import { Button } from './button';

function init(){
  customElementsService.define('tas-button', Button);
}

init();

export { init, Button };
