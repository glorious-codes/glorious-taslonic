import Vue from '@vue';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Vue.config.productionTip = false;
Enzyme.configure({ adapter: new Adapter() });
