import {connect} from 'react-redux';

import Sort from './Sort';
import Table from './Table';
import {changeSort, getObjectsThunk} from './actions';

class Sources extends PureComponent {
  render() {
    console.log(this.props);
    const {sortingValue, objectsData, changeSort, getObjects} = this.props;

    return (
      <React.Fragment>
        <Sort value={sortingValue} onChange={changeSort} />
        <Table
          sortingValue={sortingValue}
          getObjects={getObjects}
          objectsData={objectsData}
        />
      </React.Fragment>
    );
  }
}

Sources.propTypes = {
  sortingValue: PropTypes.string.isRequired,
  objectsData: PropTypes.shape({
    objects: PropTypes.array.isRequired,
    divider: PropTypes.number.isRequired
  }),
  changeSort: PropTypes.func.isRequired,
  getObjects: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  sortingValue: store.sources.sortingValue,
  objectsData: store.sources.objectsData
});

const mapDispatchToProps = dispatch => ({
  changeSort: value => dispatch(changeSort({payload: value})),
  getObjects: () => dispatch(getObjectsThunk())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources);
