import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

import Loading from '../components/Loading';
import Main from '../components/Main';
import MatchList from '../components/MatchList';

// home view
export default (state, actions) => {
  const { home } = state;

  if (!state.loadingHome && (!home.groupedMatches || home.groupedMatches.length === 0)) {
    return (
      <Main state={state} actions={actions}>
        <div class="home__wrapper block wrapped">
          <p><em>No live matches at the moment.</em></p>
        </div>
      </Main>
    );
  }

  return (
    <Main state={state} actions={actions}>
      <div class="home__wrapper block wrapped">
        <Loading active={state.loadingHome} />

        {home.groupedMatches && home.groupedMatches.map(item => (
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
      </div>
    </Main>
  );
};
