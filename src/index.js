import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer, {initialState} from './store/reducer';
import App from './components/App';

const stateFromLS = localStorage.getItem('storeState');
const preloadStore =
  stateFromLS !== null ? JSON.parse(stateFromLS) : initialState;

const store = createStore(reducer, preloadStore, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem('storeState', JSON.stringify(store.getState()));
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
