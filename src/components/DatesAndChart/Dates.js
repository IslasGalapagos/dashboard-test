import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
/** @jsx jsx */
import {jsx} from '@emotion/core';

import {styles} from './Dates.styles';

registerLocale('ru', ru);
setDefaultLocale('ru');

class Dates extends PureComponent {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(key) {
    const {dates, onChangeDate} = this.props;

    return date => {
      const newDates = {...dates};
      newDates[key] = date;

      onChangeDate(newDates);
    };
  }

  render() {
    const {dates} = this.props;

    return (
      <div css={styles}>
        <span className="title">за период</span>
        <DatePicker
          selected={dates.from}
          onChange={this.onChange('from')}
          dateFormat="yyyy-MM-dd"
        />
        <DatePicker
          selected={dates.to}
          onChange={this.onChange('to')}
          dateFormat="yyyy-MM-dd"
        />
      </div>
    );
  }
}

Dates.propTypes = {
  dates: PropTypes.shape({
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired
  }),
  onChangeDate: PropTypes.func.isRequired
};

export default Dates;
