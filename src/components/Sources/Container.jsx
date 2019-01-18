import {connect} from 'react-redux';

import Sort from './Sort';
import Table from './Table';
import {changeSort, getObjectsThunk, setSource} from './actions';
import {th} from 'date-fns/esm/locale';

class Sources extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.dates !== this.props.dates) {
      this.props.getObjects();
    }
  }

  render() {
    const {
      sortingValue,
      objectsData,
      changeSort,
      getObjects,
      setSource
    } = this.props;

    return (
      <div className="col -left">
        <Sort value={sortingValue} onChange={changeSort} />
        <Table
          sortingValue={sortingValue}
          getObjects={getObjects}
          objectsData={objectsData}
          onSelectSource={setSource}
        />
      </div>
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
  getObjects: PropTypes.func.isRequired,
  setSource: PropTypes.func.isRequired,
  dates: PropTypes.shape({
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired
  })
};

const mapStateToProps = store => ({
  sortingValue: store.sources.sortingValue,
  objectsData: store.sources.objectsData,
  dates: store.datesAndChart.dates
});

const mapDispatchToProps = dispatch => ({
  changeSort: value => dispatch(changeSort({payload: value})),
  getObjects: () => dispatch(getObjectsThunk()),
  setSource: source => dispatch(setSource({payload: source}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sources);
