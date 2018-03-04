import { h, Component } from 'preact';
import { route } from 'preact-router';
import { formatDate } from '../../lib/util';

import Score from './score';

export default class extends Component {
  render () {
    const { matches } = this.props;

    if (!matches || matches.length === 0) {
      return null;
    }

    return (
      <div class="matches__wrapper">
        <table class="matches__container">
          <tbody>
            {matches.map(match => (<MatchRow match={match} />))}
          </tbody>
        </table>
      </div>
    );
  }
}

class MatchRow extends Component {
  render ({ match }) {
    return (
      <tr onclick={this.onClick}>
        {match.min && match.period !== 'HT' &&
          <td class="min">
            {match.min}&apos;
          </td>
        }
        {match.period === 'HT' &&
          <td class="period">
            {match.period}
          </td>
        }
        {!match.min && match.period !== 'HT' &&
          <td class="date">
            {formatDate(match.date, match.time)}
          </td>
        }
        <td class="host">
          {match['home_name']}
        </td>
        <td class="status">
          <Score match={match} />
        </td>
        <td class="away">
          {match['away_name']}
        </td>
      </tr>
    );
  }

  onClick = () => {
    route(`/m/${this.props.match['match_id']}`);
  }
}
