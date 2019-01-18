/** @jsx jsx */
import {jsx} from '@emotion/core';

import {wrapperStyles, titleStyles, selectStyles} from './Sort.styles';

class Sort extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sortingOptions: {
        0: {
          name: 'Время',
          value: 'average_time'
        },
        1: {
          name: 'Отказы',
          value: 'bounce_rate'
        },
        2: {
          name: 'Сессии',
          value: 'sessions'
        }
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.value === '') {
      this.props.onChange(this.state.sortingOptions[0].value);
    }
  }

  onChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    const {sortingOptions} = this.state;
    const {value} = this.props;

    const options = Object.keys(sortingOptions).map(key => {
      const {name, value} = sortingOptions[key];

      return (
        <option key={value} value={value}>
          {name}
        </option>
      );
    });

    return (
      <div css={wrapperStyles}>
        <span css={titleStyles}>Оценить по показателю</span>
        <select css={selectStyles} value={value} onChange={this.onChange}>
          {options}
        </select>
      </div>
    );
  }
}

Sort.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Sort;
