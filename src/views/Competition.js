import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

import Main from '../components/Main';
import MatchList from '../components/MatchList';
import Standings from '../components/Standings';

// competition view
export default ({ competition }, actions) => {
  if (!competition['competition_id']) {
    // TODO: not found
    return '';
  }

  const onMatchesMore = (type) => {
    actions.competition.fetchMatches({ type, seasonId: competition.season['season_id'] });
  };

  return (
    <Main>
      <div class="competition">
        <p class="block nav">
          <Link to="/" go={actions.router.go}>Golazon</Link>
        </p>

        <h1 class="competition__title block wrapped">
          <loading />
          {competition.title}
        </h1>

        <div class="competition__container">
          {competition.pastMatches &&
            <div class="past-matches block wrapped">
              {competition.pastMatches.length < 50 &&
                <p class="matches nav">
                  <button onclick={() => onMatchesMore('past')}>more</button>
                </p>
              }
              <loading />

              <MatchList
                matches={competition.pastMatches}
                actions={actions}
              />
            </div>
          }
          {competition.futureMatches &&
            <div class="future-matches block wrapped">
              <MatchList
                matches={competition.futureMatches}
                actions={actions}
              />

              {competition.futureMatches.length < 50 &&
                <p class="matches nav">
                  <button onclick={() => onMatchesMore('future')}>more</button>
                </p>
              }
              <loading />
            </div>
          }
          {competition.standings &&
            <Standings rounds={competition.standings} />
          }
        </div>
      </div>
    </Main>
  );
};
