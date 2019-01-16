import {hot} from 'react-hot-loader';
import {compose} from 'redux';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <h1>Hello</h1>
      </React.StrictMode>
    );
  }
}

const mapStateToProps = store => ({
  store
});

export default compose(
  connect(mapStateToProps),
  hot(module)
)(App);
