import action from 'action-helper';
import request from '../../utils/axios';
import {formatDate} from '../../utils/date';

export const setChartData = action('SET_CHART_DATA', 'payload');
export const setDates = action('SET_DATES', 'payload');

export const getChartDataThunk = source => (dispatch, getState) => {
  const {dates} = getState().datesAndChart;
  const params = {
    date_from: formatDate(dates.from, '-', true),
    date_to: formatDate(dates.to, '-', true)
  };

  let point = '/chart/sources';

  if (typeof source === 'string') {
    point = '/chart/campaigns';
    params.utm_sourcemedium = source;
  }

  return request(point, {data: params})
    .then(response => {
      dispatch(setChartData({payload: response.data.analytics}));
    })
    .catch(e => {
      console.log(e);
    });
};
