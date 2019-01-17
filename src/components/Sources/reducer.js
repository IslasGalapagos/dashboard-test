import {changeSort, setObjectsData} from './actions';

export const initialState = {
  sortingValue: '',
  objectsData: {
    objects: [],
    divider: 0
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case changeSort.type:
      return {...state, ...{sortingValue: action.payload}};

    case setObjectsData.type:
      return {...state, ...{objectsData: action.payload}};

    default:
      return state;
  }
};

export default reducer;
