import request from '../../utils/axios';
import action from 'action-helper';

export const changeSort = action('CHANGE_SORT', 'payload');
export const setObjectsData = action('SET_OBJECTS_DATA', 'payload');

export const getObjectsThunk = () => dispatch =>
  request('/sources')
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
