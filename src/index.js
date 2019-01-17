import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducer';
import App from './components/App';
import {initialState as sourcesIS} from './components/Sources/reducer';

const stateFromLS = localStorage.getItem('storeState');
const preloadStore =
  stateFromLS !== null
    ? {sources: {...sourcesIS, ...JSON.parse(stateFromLS)}}
    : undefined;

const store = createStore(reducer, preloadStore, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem(
    'storeState',
    JSON.stringify({
      sortingValue: store.getState().sources.sortingValue
    })
  );
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
