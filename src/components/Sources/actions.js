import action from 'action-helper';
import request from '../../utils/axios';
import {formatDate} from '../../utils/date';

export const changeSort = action('CHANGE_SORT', 'payload');
export const setObjectsData = action('SET_OBJECTS_DATA', 'payload');
export const setSource = action('SET_SOURCE', 'payload');

export const getObjectsThunk = () => (dispatch, getState) => {
  const {dates} = getState().datesAndChart;
  const params = {
    date_from: formatDate(dates.from, '-', true),
    date_to: formatDate(dates.to, '-', true)
  };

  return request('/sources', {data: params})
    .then(response => {
      const {objects} = response.data;
      const divider = objects.length;
      const filteredObjects = objects.filter(
        item => item.utm_sourcemedium !== ''
      );

      dispatch(
        setObjectsData({
          payload: {
            objects: filteredObjects,
            divider
          }
        })
      );
    })
    .catch(e => {
      console.log(e);
    });
};
