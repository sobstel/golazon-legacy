import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

import Main from '../components/Main';
import MatchList from '../components/MatchList';
import Standings from '../components/Standings';

// competition view
export default (state, actions) => {
  const { competition } = state;

  const onMatchesMore = (type) => {
    actions.competition.fetchMatches({ type, seasonId: competition.season['season_id'] });
  };

  const hasMore = (length) => {
    return (length < 50 && length % 10 === 0);
  };

  return (
    <Main state={state} actions={actions}>
      {competition['competition_id'] &&
        <div class="competition">
          <p class="block nav">
            <Link to="/" go={actions.router.go}>Golazon</Link>
          </p>

          <h1 class="competition__title block wrapped">
            {competition.title}
          </h1>

          <div class="competition__container">
            {competition.pastMatches && competition.pastMatches.length > 0 &&
              <div class="past-matches block wrapped">
                {hasMore(competition.pastMatches.length) &&
                  <p class="matches nav">
                    <button onclick={() => onMatchesMore('past')}>more</button>
                  </p>
                }

                <MatchList
                  matches={competition.pastMatches}
                  actions={actions}
                />
              </div>
            }
            {competition.futureMatches && competition.futureMatches.length > 0 &&
              <div class="future-matches block wrapped">
                <MatchList
                  matches={competition.futureMatches}
                  actions={actions}
                />

                {hasMore(competition.futureMatches.length) &&
                  <p class="matches nav">
                    <button onclick={() => onMatchesMore('future')}>more</button>
                  </p>
                }
              </div>
            }
            {competition.standings && competition.standings.length > 0 &&
              <div class="standings__container block wrapped">
                <Standings rounds={competition.standings} />
              </div>
            }
          </div>
        </div>
      }
    </Main>
  );
};
