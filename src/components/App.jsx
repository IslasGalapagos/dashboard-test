import {hot} from 'react-hot-loader';
import {Global} from '@emotion/core';

import Sources from './Sources/Container';
import {commonStyles} from './App.styles';

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <Global styles={commonStyles} />
        <Sources />
      </React.StrictMode>
    );
  }
}

export default hot(module)(App);
