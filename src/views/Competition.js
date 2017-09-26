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
              <MatchList
                matches={competition.pastMatches}
                actions={actions}
              />
            </div>
          }
          {competition.futureMatches &&
            <div class="past-matches block wrapped">
              <MatchList
                matches={competition.futureMatches}
                actions={actions}
              />
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
