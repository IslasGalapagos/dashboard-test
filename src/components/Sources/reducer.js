import {changeSort, setObjectsData, setSource} from './actions';

export const initialState = {
  sortingValue: '',
  objectsData: {
    objects: [],
    divider: 0
  },
  source: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case changeSort.type:
      return {...state, ...{sortingValue: action.payload}};

    case setObjectsData.type:
      return {...state, ...{objectsData: action.payload}};

    case setSource.type:
      return {...state, ...{source: action.payload}};

    default:
      return state;
  }
};
