import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

import Loading from '../components/Loading';
import Main from '../components/Main';
import MatchList from '../components/MatchList';
import Standings from '../components/Standings';

// competition view
export default (state, actions) => {
  const { competition } = state;

  if (!state.loadingCompetition && !competition['competition_id']) {
    return (
      <Main state={state} actions={actions}>
        <div class="block error404__wrapper">
          <p>Competition not found. <a href="/">Go home</a> or use search above.</p>
        </div>
      </Main>
    );
  }

  const onMatchesMore = (type) => {
    actions.competition.fetchMatches({ type, seasonId: competition.season['season_id'] });
  };

  return (
    <Main state={state} actions={actions}>
      <div class="competition">
        <p class="block nav">
          <Link to="/" go={actions.router.go}>Golazon</Link>
        </p>

        <h1 class="competition__title block wrapped">
          <Loading active={state.loadingCompetition} />
          {competition.title}
        </h1>

        <div class="competition__container">
          {competition.pastMatches && competition.pastMatches.length > 0 &&
            <div class="past-matches block wrapped">
              {competition.pastMatches.length < 50 &&
                <p class="matches nav">
                  <button onclick={() => onMatchesMore('past')}>more</button>
                </p>
              }

              <Loading active={state.loadingFutureMatches} />

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

              {competition.futureMatches.length < 50 &&
                <p class="matches nav">
                  <button onclick={() => onMatchesMore('future')}>more</button>
                </p>
              }

              <Loading active={state.loadingPastMatches} />
            </div>
          }
          {competition.standings &&
            <div class="standings__container block wrapped">
              <Loading active={false} />

              <Standings rounds={competition.standings} />
            </div>
          }
        </div>
      </div>
    </Main>
  );
};
