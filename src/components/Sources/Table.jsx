/** @jsx jsx */
import {jsx} from '@emotion/core';

import {titleStyles, loadingStyles, tableStyles} from './Table.styles';

class Table extends PureComponent {
  constructor(props) {
    super(props);

    this.showAbsoluteOffset = this.showAbsoluteOffset.bind(this);
  }

  componentDidMount() {
    this.props.getObjects();
  }

  showAbsoluteOffset(event) {
    // console.log(event.currentTarget.firstChild.textContent);
  }

  generateCompaignes(average) {
    const {
      objectsData: {objects},
      sortingValue
    } = this.props;

    return objects
      .filter(itemData => itemData.analytics[sortingValue] > 0)
      .sort((x, y) => y.analytics[sortingValue] - x.analytics[sortingValue])
      .slice(0, 10)
      .map(itemData => {
        const {utm_sourcemedium} = itemData;
        const value = +itemData.analytics[sortingValue].toFixed(2);
        const offset = +(value - average).toFixed(2);

        let offsetBarWidth = Math.abs(offset) / 10;
        if (offsetBarWidth < 1) {
          offsetBarWidth = 1;
        } else if (offsetBarWidth > 65) {
          offsetBarWidth = 65;
        }

        return (
          <tr key={utm_sourcemedium} onMouseEnter={this.showAbsoluteOffset}>
            <td>
              <span>{utm_sourcemedium}</span>
            </td>
            <td>{value}</td>
            <td>
              <div
                className={`offset_bar__wrapper${
                  offset > 0 ? ' -pos' : ' -neg'
                }`}
              >
                <div className="offset_num">{`${
                  offset > 0 ? '+ ' : '- '
                }${Math.abs(offset)}`}</div>
                <div
                  className="offset_bar"
                  style={{width: `${offsetBarWidth}px`}}
                />
              </div>
            </td>
          </tr>
        );
      });
  }

  render() {
    const {
      objectsData: {objects, divider}
    } = this.props;

    if (objects.length === 0) {
      return (
        <React.Fragment>
          <h1 css={titleStyles}>По источникам</h1>
          <span css={loadingStyles}>...Загрузка</span>
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
        <h1 css={titleStyles}>По источникам</h1>
        <table css={tableStyles}>
          <tbody>
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
  getObjects: PropTypes.func.isRequired
};

export default Table;
