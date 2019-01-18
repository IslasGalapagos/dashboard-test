import {getPreviousWeek} from '../../utils/date';
import {setChartData, setDates} from './actions';

const previousWeek = getPreviousWeek();

const initialState = {
  chartData: {},
  dates: {
    from: previousWeek[0],
    to: previousWeek[1]
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setChartData.type:
      return {...state, ...{chartData: action.payload}};

    case setDates.type:
      return {...state, ...{dates: action.payload}};

    default:
      return state;
  }
};
