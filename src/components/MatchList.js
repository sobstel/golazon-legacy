import { h } from 'hyperapp';
import { formatDate } from '../lib/util';

import MatchScore from './MatchScore';

export default ({ actions, matches }) => {
  const goToMatch = (matchId) => {
    actions.router.go(`/m/${matchId}`);
  };

  if (!matches || matches.length === 0) {
    return '';
  }

  return (
    <div class="matches__wrapper">
      <table class="matches__container">
        <tbody>
          {matches.map(match => (
            <tr onclick={() => goToMatch(match['match_id'])}>
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
