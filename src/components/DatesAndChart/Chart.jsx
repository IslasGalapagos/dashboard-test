import {LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';

import {formatDate} from '../../utils/date';

class Chart extends PureComponent {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    const {chartData, sortingValue} = this.props;

    if (Object.keys(chartData).length === 0) {
      return (
        <React.Fragment>
          <h1 className="section_title">По дням</h1>
          <span className="loading">...Загрузка</span>
        </React.Fragment>
      );
    }

    const formattedData = chartData[sortingValue].map(item => ({
      name: formatDate(new Date(item[0])),
      value: Math.round(item[1])
    }));

    return (
      <React.Fragment>
        <h1 className="section_title">По дням</h1>
        <LineChart
          width={500}
          height={300}
          margin={{top: 1, right: 30, left: -20, bottom: 0}}
          data={formattedData}
        >
          <Line type="linear" dot={false} dataKey="value" stroke="#ef7e17" />
          <CartesianGrid stroke="#DDD" />
          <XAxis
            dataKey="name"
            stroke="#DDD"
            tick={{fontSize: 10, fill: '#BBB'}}
          />
          <YAxis stroke="#DDD" tick={{fontSize: 10, fill: '#BBB'}} />
        </LineChart>
      </React.Fragment>
    );
  }
}

Chart.propTypes = {
  chartData: PropTypes.object.isRequired,
  sortingValue: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired
};

export default Chart;
