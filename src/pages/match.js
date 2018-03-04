import { h, Component } from 'preact';
import matchService from '../services/match';

import Score from '../components/shared/score';

import Info from '../components/match/info';
import Goals from '../components/match/goals';
import PenaltyShootout from '../components/match/penalty_shootout';
import Lineups from '../components/match/lineups';
import Cards from '../components/match/cards';

export default class extends Component {
  state = {
    match: false,
    title: false
  }

  componentDidMount () {
    matchService.match(this.props.id).then(match => {
      if (!match) {
        // TODO: handle it as error, not as a title
        this.setState({ title: 'Match not found' });
        document.title = 'Not Found';
        return ;
      }

      let title = `${match['home_name']} v ${match['away_name']}`;
      title += ` - ${match['competition_name']} - ${match['area_name']}`;

      this.setState({ match, title });
      document.title = title;
    });
  }

  render () {
    const { match } = this.state;

    if (!match) {
      return null;
    }

    return (
      <div>
        <p class="block nav">
          <a href="/">Golazon</a>
          {match['match_id'] && [
            <span> » </span>,
            <a href={`/c/${match['competition_id']}`}>
              {match['competition_name']} ({match['area_name']})
            </a>
          ]}
        </p>

        <h1 class="match__title block wrapped">
          {match['match_id'] &&
            <span>
              {match['home_name']} - {match['away_name']} <Score match={match} />
            </span>
          }
        </h1>

        <div class="match__container block wrapped">
          <Info match={match} />
          <Goals match={match} />
          <PenaltyShootout match={match} />
          <Lineups match={match} />
          <Cards match={match} />
        </div>
      </div>
    );
  }
}
