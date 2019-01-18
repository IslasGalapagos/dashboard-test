import {connect} from 'react-redux';

import Chart from './Chart';
import Dates from './Dates';
import {getChartDataThunk, setDates} from './actions';

class ChartContainer extends PureComponent {
  componentDidUpdate(prevProps) {
    if (prevProps.dates !== this.props.dates) {
      this.props.getData();
    }

    if (prevProps.source !== this.props.source) {
      this.props.getData(this.props.source);
    }
  }

  render() {
    const {chartData, dates, sortingValue, getData, onChangeDate} = this.props;

    return (
      <div className="col -right">
        <Dates dates={dates} onChangeDate={onChangeDate} />
        <Chart
          getData={getData}
          chartData={chartData}
          sortingValue={sortingValue}
        />
      </div>
    );
  }
}

ChartContainer.propTypes = {
  chartData: PropTypes.object.isRequired,
  dates: PropTypes.shape({
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired
  }),
  sortingValue: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  onChangeDate: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  sortingValue: store.sources.sortingValue,
  source: store.sources.source,
  chartData: store.datesAndChart.chartData,
  dates: store.datesAndChart.dates
});

const mapDispatchToProps = dispatch => ({
  getData: source => dispatch(getChartDataThunk(source)),
  onChangeDate: dates => dispatch(setDates({payload: dates}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartContainer);
