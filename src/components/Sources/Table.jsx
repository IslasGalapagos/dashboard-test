/** @jsx jsx */
import {jsx} from '@emotion/core';

import {tableStyles} from './Table.styles';

class Table extends PureComponent {
  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this.props.getObjects();
  }

  onSelect(event) {
    let {target} = event;

    while (target.tagName !== 'TABLE') {
      if (target.tagName === 'TR') {
        break;
      }

      target = target.parentElement;
    }

    const source =
      target.parentElement.firstChild === target
        ? null
        : target.firstChild.textContent;

    this.props.onSelectSource(source);
  }

  generateCompaignes(average) {
    const {
      objectsData: {objects},
      sortingValue
    } = this.props;

    const createEl = data => {
      const {utm_sourcemedium} = data;
      const value = +data.analytics[sortingValue].toFixed(2);
      const offset = +(value - average).toFixed(2);

      let offsetBarWidth = Math.abs(offset) / 10;
      if (offsetBarWidth < 1) {
        offsetBarWidth = 1;
      } else if (offsetBarWidth > 65) {
        offsetBarWidth = 65;
      }

      const offsetEl =
        offset === 0 ? null : (
          <div
            className={`offset_bar__wrapper${offset > 0 ? ' -pos' : ' -neg'}`}
          >
            <div className="offset_num">{`${offset > 0 ? '+ ' : '- '}${Math.abs(
              offset
            )}`}</div>
            <div
              className="offset_bar"
              style={{width: `${offsetBarWidth}px`}}
            />
          </div>
        );

      return (
        <tr key={utm_sourcemedium}>
          <td>
            <span>{utm_sourcemedium}</span>
          </td>
          <td>{value}</td>
          <td>{offsetEl}</td>
        </tr>
      );
    };

    return objects
      .sort((x, y) => {
        if (x.utm_sourcemedium > y.utm_sourcemedium) {
          return 1;
        } else if (x.utm_sourcemedium < y.utm_sourcemedium) {
          return -1;
        } else {
          return 0;
        }
      })
      .sort((x, y) => y.analytics[sortingValue] - x.analytics[sortingValue])
      .slice(0, 10)
      .map(createEl);
  }

  render() {
    const {
      objectsData: {objects, divider}
    } = this.props;

    if (objects.length === 0) {
      return (
        <React.Fragment>
          <h1 className="section_title">По источникам</h1>
          <span className="loading">...Загрузка</span>
        </React.Fragment>
      );
    }

    const {sortingValue} = this.props;

    const total = +objects
      .reduce((acc, item) => {
        return acc + item.analytics[sortingValue];
      }, 0)
      .toFixed(2);

    const average = +(total / divider).toFixed(2);

    return (
      <React.Fragment>
        <h1 className="section_title">По источникам</h1>
        <table css={tableStyles}>
          <tbody onClick={this.onSelect}>
            <tr>
              <td>Все источники и в среднем</td>
              <td>{total}</td>
              <td>
                <div className="average">{average}</div>
              </td>
            </tr>

            {this.generateCompaignes(average)}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

Table.propTypes = {
  sortingValue: PropTypes.string.isRequired,
  objectsData: PropTypes.shape({
    objects: PropTypes.array.isRequired,
    divider: PropTypes.number.isRequired
  }),
  getObjects: PropTypes.func.isRequired,
  onSelectSource: PropTypes.func.isRequired
};

export default Table;
