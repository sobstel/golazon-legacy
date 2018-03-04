import { h, Component } from 'preact';
import { formatDate, formatTime } from '../../lib/util';

export default class Info extends Component {
  render () {
    const { match } = this.props;

    return (
      <p>
        {formatDate(match.date, match.time)}, {formatTime(match.date, match.time)}
        <span> · </span>{match.round_name}
      </p>
    );
  }
}
