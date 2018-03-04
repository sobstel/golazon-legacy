import { h, Component } from 'preact';
import matchService from '../../services/match';
import loadable from '../util/loadable';

import Score from '../shared/score';
import Info from '../match/info';
import Goals from '../match/goals';
import PenaltyShootout from '../match/penalty_shootout';
import Lineups from '../match/lineups';
import Cards from '../match/cards';

class Match extends Component {
  componentDidMount () {
    const { match } = this.props;

    let title = `${match['home_name']} v ${match['away_name']}`;
    title += ` - ${match['competition_name']} - ${match['area_name']}`;
    document.title = title;
  }

  render () {
    const { match } = this.props;

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

const dataSource = ({ id }) => {
  return matchService.match(id).then(match => ({ match }));
};

export default loadable(dataSource)(Match);
