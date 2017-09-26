import { h } from 'hyperapp';
import { formatDate } from '../lib/util';

import MatchScore from './MatchScore';

// match list
export default ({ matches }) => {
  const onClick = (e) => {
    console.log(e);
    // TODO: riot.route(`/m/${e.item.match_id}`);
  };

  if (!matches || matches.length === 0) {
    return null;
  }

  return (
    <div class="matches__wrapper">
      <table class="matches__container">
        <tbody>
          {matches.map(match => (
            <tr onclick={onClick}>
              {match.min && match.period !== 'HT' && <td class="min">{match.min}&apos;</td>}
              {match.period === 'HT' && <td class="period">{match.period}</td>}
              {!match.min && match.period !== 'HT' && <td class="date">{formatDate(match.date, match.time)}</td>}
              <td class="host">{match['home_name']}</td>
              <td class="status"><MatchScore match={match} /></td>
              <td class="away">{match['away_name']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
