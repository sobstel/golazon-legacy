import { h } from 'hyperapp';
import { Link } from '@hyperapp/router';

import Main from '../components/Main';
import MatchList from '../components/MatchList';

// home view
export default ({ home }, actions) => {
  // TODO: loading

  if (!home.groupedMatches || home.groupedMatches.length === 0) {
    return (
      <Main>
        <div class="home__wrapper block wrapped">
          <p><em>No live matches at the moment.</em></p>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div class="home__wrapper block wrapped">
        <loading />
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
      </div>
    </Main>
  );
};