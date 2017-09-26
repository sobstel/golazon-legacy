import { h } from 'hyperapp';
import { formatDate, formatTime } from '../lib/util';

export default ({ match }) => (
  <p>
    { formatDate(match.date, match.time) }, { formatTime(match.date, match.time) }
    <span> · </span>{ match.round_name }
  </p>
);
