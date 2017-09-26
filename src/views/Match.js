import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

import Main from '../components/Main';
import MatchCards from '../components/MatchCards';
import MatchGoals from '../components/MatchGoals';
import MatchInfo from '../components/MatchInfo';
import MatchLineups from '../components/MatchLineups';
import MatchPenaltyShootout from '../components/MatchPenaltyShootout';
import MatchScore from '../components/MatchScore';

// match view
export default ({ match }, actions) => {
  if (!match['match_id']) {
    // TODO: not found
    return '';
  }

  return (
    <Main>
      <p class="block nav">
        <Link to="/" go={actions.router.go}>Golazon</Link>
        <span> » </span>
        <Link to={`/c/${match['competition_id']}`} go={actions.router.go}>
          {match['competition_name']} ({match['area_name']})
        </Link>
      </p>

      <h1 class="match__title block wrapped">
        <loading />
        <span>
          {match['home_name']} - {match['away_name']} <MatchScore match={match} />
        </span>
      </h1>

      <div class="match__container block wrapped">
        <MatchInfo match={match} />
        <MatchGoals match={match} />
        <MatchPenaltyShootout match={match} />
        <MatchLineups match={match} />
        <MatchCards match={match} />
      </div>
    </Main>
  );
};
