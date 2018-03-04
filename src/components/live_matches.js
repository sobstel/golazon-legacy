import { h, Component } from 'preact';
import matchesService from '../services/matches';

import Matches from './shared/matches';

export default class LiveMatches extends Component {
  state = {
    groupedMatches: []
  }

  // TODO: loading

  componentDidMount () {
    matchesService.liveMatches().then(groupedMatches => this.setState({ groupedMatches }));
  }

  render () {
    return (
      <div class="home__wrapper block wrapped">
        {this.state.groupedMatches.map(item => (
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

        {this.state.groupedMatches.length === 0 &&
          <span>No live matches at the moment.</span>
        }
      </div>
    );
  }
}
