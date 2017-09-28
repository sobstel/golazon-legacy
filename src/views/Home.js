import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

import Main from '../components/Main';
import MatchList from '../components/MatchList';

// home view
export default (state, actions) => {
  const { home } = state;

  return (
    <Main state={state} actions={actions}>
      {home.groupedMatches &&
        <div class="home__wrapper block wrapped">
          {home.groupedMatches.map(item => (
            <div>
              <h2>
                <Link to={`c/${item.competition.id}`} go={actions.router.go}>
                  {item.competition.name } ({item.competition['area_name']})
                  {item.teamtype !== 'default' && item.teamtype}
                </Link>
              </h2>
              <MatchList
                matches={item.matches}
                actions={actions}
              />
            </div>
          ))}
          {home.groupedMatches.length === 0 &&
            <span>No live matches at the moment.</span>
          }
        </div>
      }
    </Main>
  );
};
