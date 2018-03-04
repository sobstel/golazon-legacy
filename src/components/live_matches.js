import { h, Component } from 'preact';
import matchService from '../services/match';

import Matches from './shared/matches';

export default class extends Component {
  state = {
    groupedMatches: false
  }

  // TODO: loading

  componentDidMount () {
    matchService.liveMatches().then(groupedMatches => this.setState({ groupedMatches }));
  }

  render () {
    if (this.state.groupedMatches === false) {
      return null;
    }

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
