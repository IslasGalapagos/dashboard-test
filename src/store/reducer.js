import {combineReducers} from 'redux';
import sources from '../components/Sources/reducer';
import datesAndChart from '../components/DatesAndChart/reducer';

export default combineReducers({
  sources,
  datesAndChart
});
