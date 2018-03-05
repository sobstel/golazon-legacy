import { h, Component } from 'preact';
import matchService from '../services/match';
import loadable from './util/loadable';

import Matches from './shared/matches';

class LiveMatches extends Component {
  render () {
    const { groupedMatches } = this.props;

    return (
      <div class="home__wrapper block wrapped">
        {groupedMatches.map(item => (
          <div>
            <h2>
              <a href={`/c/${item.competition.id}`}>
                {item.competition.name } ({item.competition['area_name']})
                {item.teamtype !== 'default' && item.teamtype}
              </a>
            </h2>
            <Matches matches={item.matches} />
          </div>
        ))}

        {groupedMatches.length === 0 &&
          <span>No live matches at the moment.</span>
        }
      </div>
    );
  }
}

const dataSource = () => {
  return matchService.liveMatches().then(groupedMatches => ({ groupedMatches }));
};

export default loadable(dataSource)(LiveMatches);
